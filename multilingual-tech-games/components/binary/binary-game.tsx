"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft, Clock, Trophy, Zap, Target } from "lucide-react"

interface BinaryGameProps {
  onBack: () => void
  onComplete: (score: number, timeElapsed: number) => void
}

interface FallingAsteroid {
  id: number
  binary: string
  decimal: number
  x: number
  y: number
  speed: number
}

export function BinaryGame({ onBack, onComplete }: BinaryGameProps) {
  const { language, t } = useLanguage()
  const [score, setScore] = useState(0)
  const [gameStartTime] = useState(Date.now())
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [showScoreAnimation, setShowScoreAnimation] = useState(false)
  const [streak, setStreak] = useState(0)
  const [perfectAnswers, setPerfectAnswers] = useState(0)
  const [gameActive, setGameActive] = useState(true)
  const [asteroidsDestroyed, setAsteroidsDestroyed] = useState(0)

  const [asteroids, setAsteroids] = useState<FallingAsteroid[]>([])
  const [nextAsteroidId, setNextAsteroidId] = useState(1)
  const [playerInput, setPlayerInput] = useState("")
  const [gameTime, setGameTime] = useState(60) // 60 second game

  // Timer effects
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - gameStartTime) / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [gameStartTime])

  useEffect(() => {
    if (gameTime > 0 && gameActive) {
      const timer = setTimeout(() => setGameTime(gameTime - 1), 1000)
      return () => clearTimeout(timer)
    } else if (gameTime === 0) {
      setGameActive(false)
      onComplete(score, timeElapsed)
    }
  }, [gameTime, gameActive])

  useEffect(() => {
    if (!gameActive) return

    const spawnAsteroid = () => {
      const binaryLength = Math.floor(Math.random() * 4) + 3 // 3-6 bits
      const decimal = Math.floor(Math.random() * Math.pow(2, binaryLength))
      const binary = decimal.toString(2)

      const newAsteroid: FallingAsteroid = {
        id: nextAsteroidId,
        binary,
        decimal,
        x: Math.random() * 80 + 10, // 10-90% from left
        y: -10,
        speed: Math.random() * 0.5 + 0.3, // Much slower speed: 0.3-0.8 instead of 1-3
      }

      setAsteroids((prev) => [...prev, newAsteroid])
      setNextAsteroidId((prev) => prev + 1)
    }

    const spawnInterval = setInterval(spawnAsteroid, 4000) // Spawn every 4 seconds instead of 2
    return () => clearInterval(spawnInterval)
  }, [nextAsteroidId, gameActive])

  useEffect(() => {
    if (!gameActive) return

    const moveAsteroids = () => {
      setAsteroids(
        (prev) =>
          prev
            .map((asteroid) => ({ ...asteroid, y: asteroid.y + asteroid.speed }))
            .filter((asteroid) => asteroid.y < 110), // Remove asteroids that fall off screen
      )
    }

    const moveInterval = setInterval(moveAsteroids, 100) // Slower update interval
    return () => clearInterval(moveInterval)
  }, [gameActive])

  const handleShoot = () => {
    if (!playerInput.trim() || !gameActive) return

    const targetDecimal = Number.parseInt(playerInput.trim())
    const hitAsteroid = asteroids.find((asteroid) => asteroid.decimal === targetDecimal)

    if (hitAsteroid) {
      // Hit! Remove asteroid and add score
      setAsteroids((prev) => prev.filter((a) => a.id !== hitAsteroid.id))
      const points = 10 + streak * 2
      setScore(score + points)
      setStreak(streak + 1)
      setAsteroidsDestroyed(asteroidsDestroyed + 1)
      setPerfectAnswers(perfectAnswers + 1)
      setShowScoreAnimation(true)

      setTimeout(() => setShowScoreAnimation(false), 1000)
    } else {
      // Miss! Reset streak
      setStreak(0)
    }

    setPlayerInput("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleShoot()
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 relative overflow-hidden bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {showScoreAnimation && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full text-2xl font-bold shadow-2xl">
            🚀 ASTEROID DESTROYED! +{10 + streak * 2}
            {streak > 1 && <div className="text-sm">🔥 {streak} STREAK!</div>}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <Button
          variant="outline"
          onClick={onBack}
          className="gap-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.back}
        </Button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              <Trophy className="h-4 w-4" />
              {score}
            </Badge>
            {streak > 0 && (
              <Badge
                variant="default"
                className="gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse"
              >
                <Zap className="h-4 w-4" />
                {streak} STREAK
              </Badge>
            )}
            <Badge variant="default" className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Target className="h-4 w-4" />
              {asteroidsDestroyed} DESTROYED
            </Badge>
          </div>
          <Badge
            variant={gameTime <= 10 ? "destructive" : "default"}
            className={`gap-2 ${gameTime <= 10 ? "animate-pulse" : ""}`}
          >
            <Clock className="h-4 w-4" />
            {gameTime}s
          </Badge>
        </div>
      </div>

      <div className="relative h-[600px] bg-gradient-to-b from-purple-900 to-black rounded-xl border-4 border-cyan-400 overflow-hidden">
        {/* Falling asteroids */}
        {asteroids.map((asteroid) => (
          <div
            key={asteroid.id}
            className="absolute text-4xl animate-spin transition-all duration-100"
            style={{
              left: `${asteroid.x}%`,
              top: `${asteroid.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative">
              <div className="text-orange-500">☄️</div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-cyan-400 px-2 py-1 rounded text-sm font-mono">
                {asteroid.binary}
              </div>
            </div>
          </div>
        ))}

        {/* Player spaceship */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-6xl">🚀</div>

        {/* Game instructions */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center">
          <div className="bg-black/80 text-cyan-400 px-4 py-2 rounded-lg">
            <div className="font-bold text-lg mb-2">🚀 BINARY ASTEROID DEFENSE 🚀</div>
            <div className="text-sm">Convert binary to decimal and shoot!</div>
          </div>
        </div>
      </div>

      <Card className="mt-6 border-2 border-cyan-400 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <CardHeader>
          <CardTitle className="text-center text-cyan-400">🎯 TARGETING SYSTEM</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 max-w-md mx-auto">
            <input
              type="number"
              value={playerInput}
              onChange={(e) => setPlayerInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter decimal..."
              className="flex-1 text-center text-2xl font-mono border-2 border-cyan-400 bg-black text-cyan-400 rounded-lg p-3 focus:border-cyan-300 focus:outline-none"
              disabled={!gameActive}
            />
            <Button
              onClick={handleShoot}
              disabled={!gameActive || !playerInput.trim()}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold px-8 py-3 text-xl"
            >
              🚀 FIRE!
            </Button>
          </div>
          <div className="text-center mt-4 text-cyan-400">
            <div className="text-sm">Look for binary numbers on asteroids, convert to decimal, then shoot!</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
