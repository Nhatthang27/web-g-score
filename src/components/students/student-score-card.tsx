import { IconUser, IconLanguage } from '@tabler/icons-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getSubjectLabel, getLanguageLabel } from '@/lib/subjects'

function getScoreColor(score: number | null): string {
  if (score === null) return 'bg-muted text-muted-foreground'
  if (score >= 8) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  if (score >= 6.5) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  if (score >= 5) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}

export function StudentScoreCard({
  student,
}: {
  student: {
    registrationNumber: string
    foreignLanguageCode: string | null
    scores: Record<string, number | null>
  }
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <IconUser className="size-5" />
              Student Information
            </CardTitle>
            <CardDescription className="mt-1">
              Registration Number: {student.registrationNumber}
            </CardDescription>
          </div>
          {student.foreignLanguageCode && (
            <Badge variant="outline" className="flex items-center gap-1">
              <IconLanguage className="size-3" />
              {getLanguageLabel(student.foreignLanguageCode)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(student.scores).map(([subject, score]) => (
            <div
              key={subject}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <span className="text-sm font-medium">
                {getSubjectLabel(subject)}
              </span>
              <Badge className={getScoreColor(score)}>
                {score !== null ? score.toFixed(2) : 'N/A'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
