"use client"

import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Bug, Binary, Trophy, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { t } = useLanguage()

  const games = [
    {
      id: "code-quiz",
      title: t.codeQuizBattle,
      description: t.codeQuizDesc,
      icon: Code,
      color: "bg-primary",
      href: "/quiz",
      features: [
        { icon: Clock, text: "Timed Questions" },
        { icon: Trophy, text: "Leaderboard" },
        { icon: Users, text: "Multiplayer" },
      ],
    },
    {
      id: "bug-hunt",
      title: t.bugHunt,
      description: t.bugHuntDesc,
      icon: Bug,
      color: "bg-accent",
      href: "/bug-hunt",
      features: [
        { icon: Code, text: "Real Code" },
        { icon: Trophy, text: "Score Points" },
        { icon: Clock, text: "Quick Rounds" },
      ],
    },
    {
      id: "binary-challenges",
      title: t.binaryChallenges,
      description: t.binaryDesc,
      icon: Binary,
      color: "bg-secondary",
      href: "/binary",
      features: [
        { icon: Binary, text: "Number Systems" },
        { icon: Trophy, text: "Progressive Levels" },
        { icon: Clock, text: "Speed Challenges" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-secondary">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
              <Code className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-card-foreground">TechCode Arena</h1>
              <p className="text-sm text-muted-foreground">Programming Games</p>
            </div>
          </div>
          <LanguageSelector />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-card-foreground mb-4 text-balance">{t.welcome}</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-card-foreground mb-6 text-center">{t.selectGame}</h2>
        </div>

        {/* Game Selection Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {games.map((game) => {
            const IconComponent = game.icon
            return (
              <Card
                key={game.id}
                className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 ${game.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">{game.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{game.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {game.features.map((feature, index) => {
                      const FeatureIcon = feature.icon
                      return (
                        <div key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <FeatureIcon className="h-4 w-4 text-primary" />
                          <span>{feature.text}</span>
                        </div>
                      )
                    })}
                  </div>
                  <Link href={game.href}>
                    <Button className="w-full" size="lg">
                      {t.play}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
