"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { quizQuestions } from "@/lib/quiz-data"
import { Clock, Trophy, ArrowLeft, CheckCircle, XCircle, Zap, Flame } from "lucide-react"

interface QuizGameProps {
  onBack: () => void
  onComplete: (score: number, timeElapsed: number) => void
}

export function QuizGame({ onBack, onComplete }: QuizGameProps) {
  const { language, t } = useLanguage()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [gameStartTime] = useState(Date.now())
  const [showResult, setShowResult] = useState(false)
  const [isAnswered, setIsAnswered] = useState(false)
  const [shuffledQuestions] = useState(() => [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 5))
  const [streak, setStreak] = useState(0)
  const [showScoreAnimation, setShowScoreAnimation] = useState(false)
  const [comboMultiplier, setComboMultiplier] = useState(1)
  const [ratPosition, setRatPosition] = useState(0)
  const [ratAnimation, setRatAnimation] = useState<"waiting" | "jumping" | "falling">("waiting")
  const [potholes] = useState([20, 40, 60, 80]) // Pothole positions

  const currentQuestion = shuffledQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100

  useEffect(() => {
    if (timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeUp()
    }
  }, [timeLeft, isAnswered])

  useEffect(() => {
    // Rat only moves when jumping or falling, not continuously running
  }, [ratAnimation])

  const handleTimeUp = useCallback(() => {
    setIsAnswered(true)
    setShowResult(true)
    setRatAnimation("falling")
    const nearestPothole = potholes.reduce((prev, curr) =>
      Math.abs(curr - ratPosition) < Math.abs(prev - ratPosition) ? curr : prev,
    )
    setRatPosition(nearestPothole)
    setTimeout(() => {
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        nextQuestion()
      } else {
        endGame()
      }
    }, 2000)
  }, [currentQuestionIndex, shuffledQuestions.length, ratPosition, potholes])

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return

    setSelectedAnswer(answerIndex)
    setIsAnswered(true)
    setShowResult(true)

    if (answerIndex === currentQuestion.correctAnswer) {
      const timeBonus = Math.floor(timeLeft / 3)
      const streakBonus = streak * 2
      const totalPoints = (10 + timeBonus + streakBonus) * comboMultiplier
      setScore(score + totalPoints)
      setStreak(streak + 1)
      setShowScoreAnimation(true)
      if (streak >= 2) {
        setComboMultiplier(Math.min(comboMultiplier + 0.5, 3))
      }

      setRatAnimation("jumping")
      setTimeout(() => {
        setRatAnimation("waiting")
        setShowScoreAnimation(false)
      }, 1000)
    } else {
      setStreak(0)
      setComboMultiplier(1)
      setRatAnimation("falling")
      const nearestPothole = potholes.reduce((prev, curr) =>
        Math.abs(curr - ratPosition) < Math.abs(prev - ratPosition) ? curr : prev,
      )
      setRatPosition(nearestPothole)
    }

    setTimeout(() => {
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        nextQuestion()
      } else {
        endGame()
      }
    }, 2000)
  }

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setSelectedAnswer(null)
    setTimeLeft(10)
    setShowResult(false)
    setIsAnswered(false)
    setRatPosition(0)
    setRatAnimation("waiting")
  }

  const endGame = () => {
    const timeElapsed = Math.floor((Date.now() - gameStartTime) / 1000)
    onComplete(score, timeElapsed)
  }

  const getOptionClassName = (optionIndex: number) => {
    if (!showResult) {
      return selectedAnswer === optionIndex
        ? "border-primary bg-primary/20 scale-105 shadow-lg transform transition-all duration-200"
        : "hover:border-primary/50 hover:bg-primary/10 hover:scale-102 transform transition-all duration-200"
    }

    if (optionIndex === currentQuestion.correctAnswer) {
      return "border-green-500 bg-gradient-to-r from-green-100 to-green-200 text-green-800 animate-pulse"
    }

    if (selectedAnswer === optionIndex && optionIndex !== currentQuestion.correctAnswer) {
      return "border-red-500 bg-gradient-to-r from-red-100 to-red-200 text-red-800 animate-bounce"
    }

    return "opacity-50"
  }

  return (
    <div className="max-w-7xl mx-auto p-4 relative">
      {showScoreAnimation && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full text-2xl font-bold shadow-2xl">
            🐀 RAT JUMPED! +{(10 + Math.floor(timeLeft / 3) + streak * 2) * comboMultiplier}
            {streak > 0 && <span className="text-sm ml-2">🔥 {streak} STREAK!</span>}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={onBack} className="gap-2 bg-transparent hover:bg-primary/10">
          <ArrowLeft className="h-4 w-4" />
          {t.back}
        </Button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <Trophy className="h-4 w-4" />
              {score}
            </Badge>
            {streak > 0 && (
              <Badge
                variant="default"
                className="gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse"
              >
                <Flame className="h-4 w-4" />
                {streak}x
              </Badge>
            )}
            {comboMultiplier > 1 && (
              <Badge variant="default" className="gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                <Zap className="h-4 w-4" />
                {comboMultiplier}x
              </Badge>
            )}
          </div>
          <Badge
            variant={timeLeft <= 10 ? "destructive" : "default"}
            className={`gap-2 ${timeLeft <= 10 ? "animate-pulse" : ""}`}
          >
            <Clock className="h-4 w-4" />
            {timeLeft}s
          </Badge>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span className="font-semibold">
            🐀 RAT RACE {currentQuestionIndex + 1} of {shuffledQuestions.length}
          </span>
          <span className="font-semibold">{Math.round(progress)}% Complete</span>
        </div>
        <div className="relative">
          <Progress value={progress} className="h-3 bg-gradient-to-r from-gray-200 to-gray-300" />
          <div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 h-[600px]">
        {/* Left side - Questions */}
        <div>
          <Card className="border-2 border-primary/20 shadow-xl bg-gradient-to-br from-white to-gray-50 h-full">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="mb-2 bg-white">
                  {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                </Badge>
                <Badge variant="secondary" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                  {currentQuestion.category}
                </Badge>
              </div>
              <CardTitle className="text-xl text-balance bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {currentQuestion.question[language]}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4">
                {currentQuestion.options[language].map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswered}
                    className={`p-4 text-left border-2 rounded-xl transition-all duration-300 font-medium ${getOptionClassName(index)}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && index === currentQuestion.correctAnswer && (
                        <CheckCircle className="h-6 w-6 text-green-600 animate-spin" />
                      )}
                      {showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                        <XCircle className="h-6 w-6 text-red-600 animate-pulse" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {showResult && (
                <div className="mt-6 p-6 rounded-xl text-center">
                  {selectedAnswer === currentQuestion.correctAnswer ? (
                    <div className="text-green-600">
                      <div className="relative">
                        <CheckCircle className="h-16 w-16 mx-auto mb-4 animate-bounce" />
                        <div className="absolute inset-0 h-16 w-16 mx-auto bg-green-400 rounded-full opacity-20 animate-ping" />
                      </div>
                      <p className="font-bold text-2xl mb-2">🎉 CORRECT! RAT JUMPED! 🎉</p>
                      <p className="text-lg">
                        +{(10 + Math.floor(timeLeft / 3) + streak * 2) * comboMultiplier} points
                      </p>
                      {streak > 1 && (
                        <p className="text-sm font-semibold text-orange-600">🔥 ON FIRE! {streak} in a row!</p>
                      )}
                    </div>
                  ) : timeLeft === 0 ? (
                    <div className="text-orange-600">
                      <Clock className="h-16 w-16 mx-auto mb-4 animate-pulse" />
                      <p className="font-bold text-2xl">⏰ TIME'S UP! RAT FELL! ⏰</p>
                    </div>
                  ) : (
                    <div className="text-red-600">
                      <XCircle className="h-16 w-16 mx-auto mb-4 animate-pulse" />
                      <p className="font-bold text-2xl">❌ WRONG! RAT FELL! ❌</p>
                      <p className="text-sm">Streak reset! Keep trying!</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right side - Animated Rat Running */}
        <div className="relative bg-gradient-to-b from-blue-100 to-green-200 rounded-xl border-4 border-blue-300 overflow-hidden">
          <div className="absolute inset-0">
            {/* Track */}
            <div className="absolute bottom-20 left-0 right-0 h-16 bg-gradient-to-r from-gray-400 to-gray-600 border-t-4 border-gray-800">
              {/* Track lines */}
              {[...Array(10)].map((_, i) => (
                <div key={i} className="absolute top-1/2 h-1 w-8 bg-white" style={{ left: `${i * 10}%` }} />
              ))}
            </div>

            {potholes.map((position, i) => (
              <div
                key={i}
                className="absolute bottom-20 w-12 h-16 bg-black rounded-b-full border-2 border-gray-800"
                style={{ left: `${position}%` }}
              >
                <div className="absolute inset-2 bg-gray-900 rounded-b-full" />
              </div>
            ))}
          </div>

          <div
            className={`absolute bottom-24 transition-all duration-500 ${
              ratAnimation === "waiting"
                ? "animate-bounce" // Rat jumps in place while waiting
                : ratAnimation === "jumping"
                  ? "bottom-32 scale-125 animate-bounce" // Rat jumps higher in place for correct answer
                  : "bottom-16 rotate-45 opacity-50" // Rat falls into pothole when wrong/timeout
            }`}
            style={{ left: `${ratPosition}%` }}
          >
            <div
              className={`text-6xl transform scale-x-[-1]`} // Always face right, no opacity changes
            >
              🐀
            </div>
          </div>

          {/* Game status text */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center">
            <div className="bg-white/90 px-4 py-2 rounded-full text-sm font-bold">
              {ratAnimation === "waiting"
                ? "🐀 Rat is jumping and waiting for your answer!"
                : ratAnimation === "jumping"
                  ? "🐀 Rat jumped in celebration!" // Updated message for correct answer
                  : "🐀 Oh no! Rat fell into the pothole!"}
            </div>
          </div>

          {/* Finish line */}
          <div className="absolute right-4 bottom-20 top-20 w-4 bg-gradient-to-b from-red-500 via-white to-red-500 border-2 border-black">
            <div className="text-xs font-bold text-center mt-2 rotate-90">FINISH</div>
          </div>
        </div>
      </div>
    </div>
  )
}
