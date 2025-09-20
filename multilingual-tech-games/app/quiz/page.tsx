"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"
import { QuizGame } from "@/components/quiz/quiz-game"
import { QuizResults } from "@/components/quiz/quiz-results"
import { QuizLeaderboard } from "@/components/quiz/quiz-leaderboard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Play, Trophy, Clock, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

type GameState = "menu" | "playing" | "results"

export default function QuizPage() {
  const { t } = useLanguage()
  const [gameState, setGameState] = useState<GameState>("menu")
  const [finalScore, setFinalScore] = useState(0)
  const [finalTime, setFinalTime] = useState(0)

  const handleStartGame = () => {
    setGameState("playing")
  }

  const handleGameComplete = (score: number, timeElapsed: number) => {
    setFinalScore(score)
    setFinalTime(timeElapsed)
    setGameState("results")
  }

  const handlePlayAgain = () => {
    setGameState("playing")
  }

  const handleBackToMenu = () => {
    setGameState("menu")
  }

  if (gameState === "playing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary">
        <header className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <Code className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-card-foreground">{t.codeQuizBattle}</h1>
                <p className="text-sm text-muted-foreground">Live Quiz</p>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </header>
        <main className="container mx-auto py-8">
          <QuizGame onBack={handleBackToMenu} onComplete={handleGameComplete} />
        </main>
      </div>
    )
  }

  if (gameState === "results") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary">
        <header className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <Trophy className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-card-foreground">Quiz Results</h1>
                <p className="text-sm text-muted-foreground">Your Performance</p>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </header>
        <main className="container mx-auto py-8">
          <QuizResults
            score={finalScore}
            timeElapsed={finalTime}
            totalQuestions={5}
            onPlayAgain={handlePlayAgain}
            onBack={handleBackToMenu}
          />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
              <Code className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-card-foreground">{t.codeQuizBattle}</h1>
              <p className="text-sm text-muted-foreground">Programming Quiz</p>
            </div>
          </div>
          <LanguageSelector />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Game Info */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center">
                      <Code className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{t.codeQuizBattle}</CardTitle>
                      <CardDescription className="text-lg">{t.codeQuizDesc}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Clock className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-semibold">30s per question</div>
                        <div className="text-sm text-muted-foreground">Timed Challenge</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Trophy className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-semibold">Score Points</div>
                        <div className="text-sm text-muted-foreground">Time Bonus</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-semibold">Leaderboard</div>
                        <div className="text-sm text-muted-foreground">Compete</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleStartGame} size="lg" className="gap-2">
                      <Play className="h-5 w-5" />
                      {t.start} Quiz
                    </Button>
                    <Link href="/">
                      <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                        <ArrowLeft className="h-5 w-5" />
                        {t.back}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Leaderboard */}
            <div>
              <QuizLeaderboard />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
