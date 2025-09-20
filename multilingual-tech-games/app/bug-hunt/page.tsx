"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"
import { BugHuntGame } from "@/components/bug-hunt/bug-hunt-game"
import { BugHuntResults } from "@/components/bug-hunt/bug-hunt-results"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bug, Play, Target, Clock, Code, ArrowLeft } from "lucide-react"
import Link from "next/link"

type GameState = "menu" | "playing" | "results"

export default function BugHuntPage() {
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
              <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center">
                <Bug className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-card-foreground">{t.bugHunt}</h1>
                <p className="text-sm text-muted-foreground">Active Hunt</p>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </header>
        <main className="container mx-auto py-8">
          <BugHuntGame onBack={handleBackToMenu} onComplete={handleGameComplete} />
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
              <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-card-foreground">Hunt Results</h1>
                <p className="text-sm text-muted-foreground">Your Performance</p>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </header>
        <main className="container mx-auto py-8">
          <BugHuntResults
            score={finalScore}
            timeElapsed={finalTime}
            totalChallenges={3}
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
            <div className="h-10 w-10 bg-accent rounded-lg flex items-center justify-center">
              <Bug className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-card-foreground">{t.bugHunt}</h1>
              <p className="text-sm text-muted-foreground">Debug Challenge</p>
            </div>
          </div>
          <LanguageSelector />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-16 w-16 bg-accent rounded-full flex items-center justify-center">
                  <Bug className="h-8 w-8 text-accent-foreground" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{t.bugHunt}</CardTitle>
                  <CardDescription className="text-lg">{t.bugHuntDesc}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Target className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">Click to Find</div>
                    <div className="text-sm text-muted-foreground">Interactive Debugging</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Code className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">Real Code</div>
                    <div className="text-sm text-muted-foreground">Multiple Languages</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">Timed Challenge</div>
                    <div className="text-sm text-muted-foreground">Speed Matters</div>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">How to Play:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Click on lines of code that contain bugs</li>
                  <li>• Find syntax errors, logic bugs, and runtime issues</li>
                  <li>• Use hints if you get stuck</li>
                  <li>• Earn points for each bug you find</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleStartGame} size="lg" className="gap-2">
                  <Play className="h-5 w-5" />
                  {t.start} Hunt
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
      </main>
    </div>
  )
}
