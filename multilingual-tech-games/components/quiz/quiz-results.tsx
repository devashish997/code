"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { Trophy, Clock, Target, RotateCcw, ArrowLeft } from "lucide-react"

interface QuizResultsProps {
  score: number
  timeElapsed: number
  totalQuestions: number
  onPlayAgain: () => void
  onBack: () => void
}

export function QuizResults({ score, timeElapsed, totalQuestions, onPlayAgain, onBack }: QuizResultsProps) {
  const { t } = useLanguage()

  const percentage = Math.round((score / (totalQuestions * 10)) * 100)
  const minutes = Math.floor(timeElapsed / 60)
  const seconds = timeElapsed % 60

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Excellent! You're a coding master!", color: "text-green-600" }
    if (percentage >= 70) return { message: "Great job! Keep up the good work!", color: "text-blue-600" }
    if (percentage >= 50) return { message: "Good effort! Practice makes perfect!", color: "text-orange-600" }
    return { message: "Keep learning! You'll improve with practice!", color: "text-red-600" }
  }

  const performance = getPerformanceMessage()

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <div className="h-20 w-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl mb-2">Quiz Complete!</CardTitle>
          <p className={`text-lg font-semibold ${performance.color}`}>{performance.message}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Display */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">{t.score}</span>
              </div>
              <div className="text-2xl font-bold text-primary">{score}</div>
              <div className="text-sm text-muted-foreground">{percentage}%</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">{t.timer}</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {minutes}:{seconds.toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-muted-foreground">Total Time</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Accuracy</span>
              </div>
              <div className="text-2xl font-bold text-primary">{percentage}%</div>
              <div className="text-sm text-muted-foreground">Correct Answers</div>
            </div>
          </div>

          {/* Performance Badge */}
          <div className="flex justify-center">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {percentage >= 90
                ? "🏆 Master"
                : percentage >= 70
                  ? "🥇 Expert"
                  : percentage >= 50
                    ? "🥈 Good"
                    : "🥉 Beginner"}
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={onBack} className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              {t.back}
            </Button>
            <Button onClick={onPlayAgain} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Play Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
