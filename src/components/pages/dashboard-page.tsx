import { Link } from '@tanstack/react-router'
import {
  IconArrowRight,
  IconChartBar,
  IconTrophy,
  IconUserSearch,
  IconUsers,
} from '@tabler/icons-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTopStudents, useScoreDistribution } from '@/hooks/use-students'
import { PageLayout } from '@/components/layout/page-layout'

export function DashboardPage() {
  const { data: topStudentsData } = useTopStudents()
  const { data: statisticsData } = useScoreDistribution()

  const topStudents = topStudentsData?.data || []
  const statistics = statisticsData?.data || []

  const totalStudents = statistics.reduce((sum, stat) => sum + stat.totalCount, 0)
  const excellentStudents = statistics.reduce((sum, stat) => sum + stat.excellentCount, 0)
  const topScore = topStudents[0]?.totalScore || 0

  return (
    <PageLayout>
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to G-Score - Student Exam Score Management System
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Records"
          value={totalStudents > 0 ? new Intl.NumberFormat().format(totalStudents) : '-'}
          description="Subject score entries"
          icon={<IconUsers className="text-muted-foreground size-4" />}
        />
        <StatsCard
          title="Excellent Scores"
          value={excellentStudents > 0 ? new Intl.NumberFormat().format(excellentStudents) : '-'}
          description="Students scoring 8+"
          icon={<IconChartBar className="text-muted-foreground size-4" />}
          valueClassName="text-green-600"
        />
        <StatsCard
          title="Top Group A Score"
          value={topScore > 0 ? topScore.toFixed(2) : '-'}
          description="Math + Physics + Chemistry"
          icon={<IconTrophy className="text-muted-foreground size-4" />}
          valueClassName="text-yellow-600"
        />
        <StatsCard
          title="Subjects Tracked"
          value={statistics.length || '-'}
          description="Exam subjects"
          icon={<IconChartBar className="text-muted-foreground size-4" />}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <QuickActionCard
          title="Student Lookup"
          description="Search for a student's exam scores using their registration number"
          icon={<IconUserSearch className="size-5" />}
          iconClassName="bg-primary/10 text-primary"
          linkTo="/students"
          linkLabel="Search Students"
        />
        <QuickActionCard
          title="Top Students"
          description="View leaderboard of top-performing students in Group A subjects"
          icon={<IconTrophy className="size-5" />}
          iconClassName="bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400"
          linkTo="/top-students"
          linkLabel="View Leaderboard"
        />
        <QuickActionCard
          title="Statistics"
          description="Explore score distribution and analytics across all subjects"
          icon={<IconChartBar className="size-5" />}
          iconClassName="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
          linkTo="/statistics"
          linkLabel="View Statistics"
        />
      </div>

      {/* Top 3 Preview */}
      {topStudents.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top 3 Group A Students</CardTitle>
              <CardDescription>Highest combined scores in Math, Physics, Chemistry</CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/top-students" className="flex items-center gap-1">
                View All
                <IconArrowRight className="size-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              {topStudents.slice(0, 3).map((student, index) => (
                <TopStudentPreviewCard key={student.registrationNumber} student={student} rank={index + 1} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </PageLayout>
  )
}

function StatsCard({
  title,
  value,
  description,
  icon,
  valueClassName = '',
}: {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  valueClassName?: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardDescription>{title}</CardDescription>
        {icon}
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold tabular-nums ${valueClassName}`}>{value}</div>
        <p className="text-muted-foreground text-xs">{description}</p>
      </CardContent>
    </Card>
  )
}

function QuickActionCard({
  title,
  description,
  icon,
  iconClassName,
  linkTo,
  linkLabel,
}: {
  title: string
  description: string
  icon: React.ReactNode
  iconClassName: string
  linkTo: string
  linkLabel: string
}) {
  return (
    <Card className="group hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className={`mb-2 flex size-10 items-center justify-center rounded-lg ${iconClassName}`}>
          {icon}
        </div>
        <CardTitle className="flex items-center justify-between">
          {title}
          <IconArrowRight className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild variant="outline" className="w-full">
          <Link to={linkTo}>{linkLabel}</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function TopStudentPreviewCard({
  student,
  rank,
}: {
  student: { registrationNumber: string; mathScore: number; physicsScore: number; chemistryScore: number; totalScore: number }
  rank: number
}) {
  const rankColors = {
    1: 'bg-yellow-500 text-white',
    2: 'bg-gray-400 text-white',
    3: 'bg-amber-700 text-white',
  }

  return (
    <div
      className={`flex items-center gap-4 rounded-lg border p-4 ${
        rank === 1 ? 'border-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20' : ''
      }`}
    >
      <div className={`flex size-10 items-center justify-center rounded-full font-bold ${rankColors[rank as keyof typeof rankColors]}`}>
        {rank}
      </div>
      <div className="flex-1">
        <div className="font-mono text-sm">{student.registrationNumber}</div>
        <div className="text-muted-foreground text-xs">
          M: {student.mathScore} | P: {student.physicsScore} | C: {student.chemistryScore}
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold tabular-nums">{student.totalScore.toFixed(2)}</div>
        <div className="text-muted-foreground text-xs">Total</div>
      </div>
    </div>
  )
}
