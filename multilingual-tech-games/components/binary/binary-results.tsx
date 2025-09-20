"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { Binary, Clock, Target, RotateCcw, ArrowLeft, Trophy } from "lucide-react"

interface BinaryResultsProps {
  score: number
  timeElapsed: number
  totalChallenges: number
  onPlayAgain: () => void
  onBack: () => void
}

export function BinaryResults({ score, timeElapsed, totalChallenges, onPlayAgain, onBack }: BinaryResultsProps) {
  const { t } = useLanguage()

  const minutes = Math.floor(timeElapsed / 60)
  const seconds = timeElapsed % 60
  const averageTimePerChallenge = Math.round(timeElapsed / totalChallenges)
  const maxPossibleScore = totalChallenges * 20 // Assuming average 20 points per challenge
  const percentage = Math.round((score / maxPossibleScore) * 100)

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Outstanding! You're a binary master!", color: "text-green-600" }
    if (percentage >= 70) return { message: "Excellent work! Your binary skills are strong!", color: "text-blue-600" }
    if (percentage >= 50) return { message: "Good job! Keep practicing binary conversions!", color: "text-orange-600" }
    return { message: "Keep learning! Binary takes practice to master!", color: "text-red-600" }
  }

  const performance = getPerformanceMessage()

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto mb-4">
            <div className="h-20 w-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Binary className="h-10 w-10 text-secondary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl mb-2">Binary Challenge Complete!</CardTitle>
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
              <div className="text-sm text-muted-foreground">{percentage}% Perfect</div>
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
                <span className="text-sm font-medium text-muted-foreground">Speed</span>
              </div>
              <div className="text-2xl font-bold text-primary">{averageTimePerChallenge}s</div>
              <div className="text-sm text-muted-foreground">Per Challenge</div>
            </div>
          </div>

          {/* Performance Badge */}
          <div className="flex justify-center">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {percentage >= 90
                ? "🏆 Binary Master"
                : percentage >= 70
                  ? "💻 Binary Expert"
                  : percentage >= 50
                    ? "🎯 Binary Student"
                    : "🔰 Binary Beginner"}
            </Badge>
          </div>

          {/* Binary Facts */}
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Did you know?</h3>
            <p className="text-sm text-muted-foreground">
              Binary is the foundation of all computer systems. Every piece of data in a computer is ultimately stored
              as 1s and 0s!
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="font-semibold">Challenges</div>
              <div className="text-muted-foreground">{totalChallenges} completed</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="font-semibold">Average Score</div>
              <div className="text-muted-foreground">{Math.round(score / totalChallenges)} per challenge</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={onBack} className="gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              {t.back}
            </Button>
            <Button onClick={onPlayAgain} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Challenge Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
