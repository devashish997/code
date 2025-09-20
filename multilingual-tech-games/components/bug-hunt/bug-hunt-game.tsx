"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { bugHuntChallenges } from "@/lib/bug-hunt-data"
import { ArrowLeft, CheckCircle, XCircle, Clock, Trophy } from "lucide-react"

interface BugHuntGameProps {
  onBack: () => void
  onComplete: (score: number, timeElapsed: number) => void
}

export function BugHuntGame({ onBack, onComplete }: BugHuntGameProps) {
  const { language, t } = useLanguage()
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [gameStartTime] = useState(Date.now())
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [shuffledChallenges] = useState(() => [...bugHuntChallenges].sort(() => Math.random() - 0.5).slice(0, 5))
  const [pandaPosition, setPandaPosition] = useState(5) // Position from bottom (5% = bottom, 85% = top)
  const [pandaAnimation, setPandaAnimation] = useState<"climbing" | "falling">("climbing")
  const [showScoreAnimation, setShowScoreAnimation] = useState(false)
  const [questionTimer, setQuestionTimer] = useState(15)

  const currentChallenge = shuffledChallenges[currentChallengeIndex]
  const progress = ((currentChallengeIndex + 1) / shuffledChallenges.length) * 100

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - gameStartTime) / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [gameStartTime])

  // Question timer countdown effect
  useEffect(() => {
    if (questionTimer > 0 && !showResult) {
      const timer = setTimeout(() => setQuestionTimer(questionTimer - 1), 1000)
      return () => clearTimeout(timer)
    } else if (questionTimer === 0 && !showResult) {
      setPandaAnimation("falling")
      setPandaPosition(5) // Fall all the way to bottom
      setShowResult(true)
      setTimeout(() => {
        if (currentChallengeIndex < shuffledChallenges.length - 1) {
          nextChallenge()
        } else {
          onComplete(score, timeElapsed)
        }
      }, 2000)
    }
  }, [questionTimer, showResult])

  useEffect(() => {
    if (pandaAnimation === "climbing" && !showResult) {
      const climbTimer = setInterval(() => {
        setPandaPosition((prev) => {
          const timeProgress = (15 - questionTimer) / 15
          const targetPosition = 5 + timeProgress * 80 // From 5% to 85%
          return Math.min(targetPosition, 85)
        })
      }, 100) // Update every 100ms for smoother climbing
      return () => clearInterval(climbTimer)
    }
  }, [pandaAnimation, showResult, questionTimer])

  useEffect(() => {
    setPandaPosition(5) // Start from bottom
    setQuestionTimer(15)
    setPandaAnimation("climbing")
  }, [currentChallengeIndex])

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return

    setSelectedAnswer(answerIndex)
    setShowResult(true)

    const isCorrect = answerIndex === 0 // First option is always correct for bug hunt

    if (isCorrect) {
      setScore(score + currentChallenge.points)
      setShowScoreAnimation(true)
      setPandaPosition(85) // Reach the top
      setTimeout(() => setShowScoreAnimation(false), 2000)
    } else {
      setPandaAnimation("falling")
      setPandaPosition(5) // Fall all the way to bottom
      setTimeout(() => {
        setPandaAnimation("climbing")
      }, 2000)
    }

    setTimeout(() => {
      if (currentChallengeIndex < shuffledChallenges.length - 1) {
        nextChallenge()
      } else {
        onComplete(score + (isCorrect ? currentChallenge.points : 0), timeElapsed)
      }
    }, 3000)
  }

  const nextChallenge = () => {
    setCurrentChallengeIndex(currentChallengeIndex + 1)
    setSelectedAnswer(null)
    setShowResult(false)
    setPandaAnimation("climbing")
    setPandaPosition(5) // Start from bottom again
  }

  return (
    <div className="max-w-7xl mx-auto p-4 relative">
      {showScoreAnimation && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-full text-2xl font-bold shadow-2xl">
            🎉 CORRECT! 🎉
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={onBack} className="gap-2 bg-transparent hover:bg-primary/10">
          <ArrowLeft className="h-4 w-4" />
          {t.back}
        </Button>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <Trophy className="h-4 w-4" />
            {score}
          </Badge>
          <Badge variant="default" className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <Clock className="h-4 w-4" />
            {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, "0")}
          </Badge>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span className="font-bold text-lg">
            🐼 PANDA CLIMB {currentChallengeIndex + 1} of {shuffledChallenges.length}
          </span>
          <span className="font-semibold">{Math.round(progress)}% Complete</span>
        </div>
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 h-[600px]">
        {/* Left side - Questions */}
        <div className="space-y-4">
          <Card className="border-2 border-primary/20 shadow-xl bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="mb-2 bg-white">
                  {currentChallenge.difficulty.charAt(0).toUpperCase() + currentChallenge.difficulty.slice(1)}
                </Badge>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    Bug Hunt
                  </Badge>
                  <Badge
                    variant={questionTimer <= 3 ? "destructive" : "default"}
                    className={`gap-2 ${questionTimer <= 3 ? "animate-pulse" : ""}`}
                  >
                    <Clock className="h-4 w-4" />
                    {questionTimer}s
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-xl text-balance bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {currentChallenge.title[language]}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-6 font-medium">{currentChallenge.description[language]}</p>

              <div className="space-y-3">
                {/* Generate multiple choice options based on the bugs */}
                {[
                  `Line ${currentChallenge.bugs[0]?.line}: ${currentChallenge.bugs[0]?.description[language]}`,
                  `Line ${Math.max(1, (currentChallenge.bugs[0]?.line || 1) - 2)}: No syntax error found`,
                  `Line ${Math.max(1, (currentChallenge.bugs[0]?.line || 1) + 1)}: Missing semicolon`,
                  `Line ${Math.max(1, (currentChallenge.bugs[0]?.line || 1) + 3)}: Undefined variable`,
                ].map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-4 text-left border-2 rounded-xl transition-all duration-300 font-medium ${getOptionClassName(index)}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && index === 0 && <CheckCircle className="h-6 w-6 text-green-600 animate-spin" />}
                      {showResult && selectedAnswer === index && index !== 0 && (
                        <XCircle className="h-6 w-6 text-red-600 animate-pulse" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {showResult && (
                <div className="mt-6 p-6 rounded-xl text-center">
                  {selectedAnswer === 0 ? (
                    <div className="text-green-600">
                      <div className="relative">
                        <CheckCircle className="h-16 w-16 mx-auto mb-4 animate-bounce" />
                        <div className="absolute inset-0 h-16 w-16 mx-auto bg-green-400 rounded-full opacity-20 animate-ping" />
                      </div>
                      <p className="font-bold text-2xl mb-2">🎉 Correct Answer! 🎉</p>
                      <p className="text-lg">+{currentChallenge.points} points</p>
                    </div>
                  ) : (
                    <div className="text-red-600">
                      <XCircle className="h-16 w-16 mx-auto mb-4 animate-pulse" />
                      <p className="font-bold text-2xl">❌ WRONG! ❌</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right side - Animated Panda Climbing Bamboo */}
        <div className="relative bg-gradient-to-b from-green-100 to-green-200 rounded-xl border-4 border-green-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-200 to-green-300">
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-20 bg-gradient-to-b from-green-600 to-green-800 rounded-full">
              {/* Bamboo segments */}
              {[...Array(10)].map((_, i) => (
                <div key={i} className="absolute w-full h-2 bg-green-700" style={{ top: `${i * 10}%` }} />
              ))}
            </div>
          </div>

          <div
            className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
              pandaAnimation === "climbing"
                ? "animate-pulse" // Climbing animation
                : "animate-bounce" // Enhanced falling animation with longer duration
            }`}
            style={{
              bottom: `${pandaPosition}%`,
              transform: "translateX(-50%)",
            }}
          >
            <div className={`text-6xl ${pandaAnimation === "falling" ? "animate-spin" : ""}`}>🐼</div>
          </div>

          {/* Game status text */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
            <div className="bg-white/90 px-4 py-2 rounded-full text-sm font-bold">
              {pandaAnimation === "climbing"
                ? "🐼 Panda is slowly climbing the bamboo!"
                : "💥 Oh no! Panda fell to the bottom!"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  function getOptionClassName(optionIndex: number) {
    if (!showResult) {
      return selectedAnswer === optionIndex
        ? "border-primary bg-primary/20 scale-105 shadow-lg transform transition-all duration-200"
        : "hover:border-primary/50 hover:bg-primary/10 hover:scale-102 transform transition-all duration-200"
    }

    if (optionIndex === 0) {
      return "border-green-500 bg-gradient-to-r from-green-100 to-green-200 text-green-800 animate-pulse"
    }

    if (selectedAnswer === optionIndex && optionIndex !== 0) {
      return "border-red-500 bg-gradient-to-r from-red-100 to-red-200 text-red-800 animate-bounce"
    }

    return "opacity-50"
  }
}
