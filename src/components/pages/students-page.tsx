import { useState } from 'react'
import { IconSearch, IconUser, IconLanguage } from '@tabler/icons-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useStudent } from '@/hooks/use-students'
import { PageLayout } from '@/components/layout/page-layout'

const SUBJECT_LABELS: Record<string, string> = {
  Math: 'Mathematics',
  Physics: 'Physics',
  Chemistry: 'Chemistry',
  Biology: 'Biology',
  Literature: 'Literature',
  History: 'History',
  Geography: 'Geography',
  CivicEducation: 'Civic Education',
  ForeignLanguage: 'Foreign Language',
}

const LANGUAGE_CODES: Record<string, string> = {
  N1: 'English',
  N2: 'Russian',
  N3: 'French',
  N4: 'Chinese',
  N5: 'German',
  N6: 'Japanese',
  N7: 'Korean',
}

function getScoreColor(score: number | null): string {
  if (score === null) return 'bg-muted text-muted-foreground'
  if (score >= 8) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  if (score >= 6.5) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  if (score >= 5) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}

export function StudentsPage() {
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading, isError, error } = useStudent(searchQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (registrationNumber.trim()) {
      setSearchQuery(registrationNumber.trim())
    }
  }

  const student = data?.data

  return (
    <PageLayout>
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Student Score Lookup</h1>
        <p className="text-muted-foreground">
          Search for a student's exam scores by their registration number
        </p>
      </div>

      {/* Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconSearch className="size-5" />
            Search Student
          </CardTitle>
          <CardDescription>
            Enter the 8-digit registration number to view scores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-3">
            <Input
              type="text"
              placeholder="e.g., 01000001"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              className="max-w-xs"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Error State */}
      {isError && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">
              {(error as any)?.response?.data?.error?.message || 'Student not found'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {student && <StudentScoreCard student={student} />}
    </PageLayout>
  )
}

function StudentScoreCard({
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
              {LANGUAGE_CODES[student.foreignLanguageCode] || student.foreignLanguageCode}
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
                {SUBJECT_LABELS[subject] || subject}
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
