"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"
import { BinaryGame } from "@/components/binary/binary-game"
import { BinaryResults } from "@/components/binary/binary-results"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Binary, Play, Target, Clock, Calculator, ArrowLeft } from "lucide-react"
import Link from "next/link"

type GameState = "menu" | "playing" | "results"

export default function BinaryPage() {
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
              <div className="h-10 w-10 bg-secondary rounded-lg flex items-center justify-center">
                <Binary className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-card-foreground">{t.binaryChallenges}</h1>
                <p className="text-sm text-muted-foreground">Active Challenge</p>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </header>
        <main className="container mx-auto py-8">
          <BinaryGame onBack={handleBackToMenu} onComplete={handleGameComplete} />
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
              <div className="h-10 w-10 bg-secondary rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-card-foreground">Challenge Results</h1>
                <p className="text-sm text-muted-foreground">Your Performance</p>
              </div>
            </div>
            <LanguageSelector />
          </div>
        </header>
        <main className="container mx-auto py-8">
          <BinaryResults
            score={finalScore}
            timeElapsed={finalTime}
            totalChallenges={5}
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
            <div className="h-10 w-10 bg-secondary rounded-lg flex items-center justify-center">
              <Binary className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-card-foreground">{t.binaryChallenges}</h1>
              <p className="text-sm text-muted-foreground">Number System Mastery</p>
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
                <div className="h-16 w-16 bg-secondary rounded-full flex items-center justify-center">
                  <Binary className="h-8 w-8 text-secondary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{t.binaryChallenges}</CardTitle>
                  <CardDescription className="text-lg">{t.binaryDesc}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Calculator className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">Conversions</div>
                    <div className="text-sm text-muted-foreground">Binary ↔ Decimal</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Target className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">Logic Operations</div>
                    <div className="text-sm text-muted-foreground">AND, OR, XOR</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">Progressive</div>
                    <div className="text-sm text-muted-foreground">Easy to Hard</div>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">Challenge Types:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <strong>Decimal to Binary:</strong> Convert numbers like 13 → 1101
                  </li>
                  <li>
                    • <strong>Binary to Decimal:</strong> Convert binary like 1010 → 10
                  </li>
                  <li>
                    • <strong>Binary Arithmetic:</strong> Add binary numbers
                  </li>
                  <li>
                    • <strong>Logic Operations:</strong> Perform AND, OR operations
                  </li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleStartGame} size="lg" className="gap-2">
                  <Play className="h-5 w-5" />
                  {t.start} Challenge
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
