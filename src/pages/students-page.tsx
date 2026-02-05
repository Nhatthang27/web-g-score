import { useState } from 'react'
import { IconSearch } from '@tabler/icons-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useStudent } from '@/hooks/use-students'
import { PageLayout } from '@/components/layout/page-layout'
import { StudentScoreCard, StudentScoreCardSkeleton } from '@/components/students'

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

      {/* Loading State */}
      {isLoading && <StudentScoreCardSkeleton />}

      {/* Results */}
      {student && !isLoading && <StudentScoreCard student={student} />}
    </PageLayout>
  )
}
