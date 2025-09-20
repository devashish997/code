"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import { mockLeaderboard } from "@/lib/quiz-data"
import { Trophy, Clock, Calendar } from "lucide-react"

export function QuizLeaderboard() {
  const { t } = useLanguage()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          {t.leaderboard}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockLeaderboard.map((entry, index) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                index === 0
                  ? "bg-yellow-50 border-yellow-200"
                  : index === 1
                    ? "bg-gray-50 border-gray-200"
                    : index === 2
                      ? "bg-orange-50 border-orange-200"
                      : "bg-card border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    index === 0
                      ? "bg-yellow-500 text-white"
                      : index === 1
                        ? "bg-gray-500 text-white"
                        : index === 2
                          ? "bg-orange-500 text-white"
                          : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <div>
                  <div className="font-semibold">{entry.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    {entry.date}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <Badge variant="secondary" className="mb-1">
                  {entry.score} pts
                </Badge>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {Math.floor(entry.timeCompleted / 60)}:{(entry.timeCompleted % 60).toString().padStart(2, "0")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
