import { IconTrophy, IconMedal } from '@tabler/icons-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useTopStudents } from '@/hooks/use-students'
import { PageLayout } from '@/components/layout/page-layout'
import { TopStudentsSkeleton } from '@/components/top-students'
import type { TopStudentDto } from '@/types/student.types'

export function TopStudentsPage() {
  const { data, isLoading, isError } = useTopStudents()

  const students = data?.data || []

  return (
    <PageLayout>
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Top Group A Students</h1>
        <p className="text-muted-foreground">
          Leaderboard of students with highest Group A scores (Math + Physics + Chemistry)
        </p>
      </div>

      {isLoading ? (
        <TopStudentsSkeleton />
      ) : (
        <>
          {/* Top 3 Cards */}
          {students.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-3">
              {students.slice(0, 3).map((student, index) => (
                <TopStudentCard key={student.registrationNumber} student={student} isFirst={index === 0} />
              ))}
            </div>
          )}

          {/* Leaderboard Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconTrophy className="size-5" />
                Complete Leaderboard
              </CardTitle>
              <CardDescription>All top-performing students in Group A subjects</CardDescription>
            </CardHeader>
            <CardContent>
              {isError ? (
                <div className="flex h-32 items-center justify-center">
                  <div className="text-destructive">Failed to load data</div>
                </div>
              ) : students.length === 0 ? (
                <div className="flex h-32 items-center justify-center">
                  <div className="text-muted-foreground">No data available</div>
                </div>
              ) : (
                <LeaderboardTable students={students} />
              )}
            </CardContent>
          </Card>
        </>
      )}
    </PageLayout>
  )
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <Badge className="bg-yellow-500 text-white hover:bg-yellow-500">
        <IconTrophy className="mr-1 size-3" />
        1st
      </Badge>
    )
  }
  if (rank === 2) {
    return (
      <Badge className="bg-gray-400 text-white hover:bg-gray-400">
        <IconMedal className="mr-1 size-3" />
        2nd
      </Badge>
    )
  }
  if (rank === 3) {
    return (
      <Badge className="bg-amber-700 text-white hover:bg-amber-700">
        <IconMedal className="mr-1 size-3" />
        3rd
      </Badge>
    )
  }
  return <span className="text-muted-foreground font-medium">#{rank}</span>
}

function TopStudentCard({ student, isFirst }: { student: TopStudentDto; isFirst: boolean }) {
  return (
    <Card
      className={
        isFirst
          ? 'border-yellow-500 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-950/20 dark:to-card'
          : ''
      }
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <RankBadge rank={student.rank} />
          <span className="text-muted-foreground text-xs">{student.registrationNumber}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tabular-nums">{student.totalScore.toFixed(2)}</div>
        <p className="text-muted-foreground mt-1 text-sm">Total Score</p>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          <ScoreBox label="Math" value={student.mathScore} />
          <ScoreBox label="Physics" value={student.physicsScore} />
          <ScoreBox label="Chemistry" value={student.chemistryScore} />
        </div>
      </CardContent>
    </Card>
  )
}

function ScoreBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md bg-muted p-2">
      <div className="font-semibold">{value}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  )
}

function LeaderboardTable({ students }: { students: TopStudentDto[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-20">Rank</TableHead>
          <TableHead>Registration No.</TableHead>
          <TableHead className="text-right">Math</TableHead>
          <TableHead className="text-right">Physics</TableHead>
          <TableHead className="text-right">Chemistry</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.registrationNumber}>
            <TableCell>
              <RankBadge rank={student.rank} />
            </TableCell>
            <TableCell className="font-mono">{student.registrationNumber}</TableCell>
            <TableCell className="text-right tabular-nums">{student.mathScore.toFixed(2)}</TableCell>
            <TableCell className="text-right tabular-nums">{student.physicsScore.toFixed(2)}</TableCell>
            <TableCell className="text-right tabular-nums">{student.chemistryScore.toFixed(2)}</TableCell>
            <TableCell className="text-right font-semibold tabular-nums">{student.totalScore.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
