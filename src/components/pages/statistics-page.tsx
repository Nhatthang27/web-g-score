import { IconChartBar, IconUsers } from '@tabler/icons-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
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
import { useScoreDistribution } from '@/hooks/use-students'
import { PageLayout } from '@/components/layout/page-layout'

const COLORS = {
  excellent: '#22c55e',
  good: '#3b82f6',
  average: '#eab308',
  belowAverage: '#ef4444',
}

const SUBJECT_LABELS: Record<string, string> = {
  Math: 'Math',
  Physics: 'Physics',
  Chemistry: 'Chemistry',
  Biology: 'Biology',
  Literature: 'Literature',
  History: 'History',
  Geography: 'Geography',
  CivicEducation: 'Civic Ed.',
  ForeignLanguage: 'Foreign Lang.',
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num)
}

export function StatisticsPage() {
  const { data, isLoading, isError } = useScoreDistribution()

  const statistics = data?.data || []

  const totals = statistics.reduce(
    (acc, stat) => ({
      excellent: acc.excellent + stat.excellentCount,
      good: acc.good + stat.goodCount,
      average: acc.average + stat.averageCount,
      belowAverage: acc.belowAverage + stat.belowAverageCount,
      total: acc.total + stat.totalCount,
    }),
    { excellent: 0, good: 0, average: 0, belowAverage: 0, total: 0 }
  )

  const chartData = statistics.map((stat) => ({
    subject: SUBJECT_LABELS[stat.subject] || stat.subject,
    'Excellent (>=8)': stat.excellentCount,
    'Good (6.5-7.9)': stat.goodCount,
    'Average (5-6.4)': stat.averageCount,
    'Below Avg (<5)': stat.belowAverageCount,
  }))

  const pieData = [
    { name: 'Excellent', value: totals.excellent, color: COLORS.excellent },
    { name: 'Good', value: totals.good, color: COLORS.good },
    { name: 'Average', value: totals.average, color: COLORS.average },
    { name: 'Below Average', value: totals.belowAverage, color: COLORS.belowAverage },
  ]

  return (
    <PageLayout>
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Score Distribution Statistics</h1>
        <p className="text-muted-foreground">
          Comprehensive analysis of exam scores across all subjects
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-muted-foreground">Loading statistics...</div>
        </div>
      ) : isError ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-destructive">Failed to load statistics</div>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard
              label="Excellent (8+)"
              count={totals.excellent}
              total={totals.total}
              colorClass="text-green-600"
              badgeClass="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
            />
            <SummaryCard
              label="Good (6.5-7.9)"
              count={totals.good}
              total={totals.total}
              colorClass="text-blue-600"
              badgeClass="border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
            />
            <SummaryCard
              label="Average (5-6.4)"
              count={totals.average}
              total={totals.total}
              colorClass="text-yellow-600"
              badgeClass="border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300"
            />
            <SummaryCard
              label="Below Average (<5)"
              count={totals.belowAverage}
              total={totals.total}
              colorClass="text-red-600"
              badgeClass="border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
            />
          </div>

          {/* Charts Row */}
          <div className="grid gap-6 lg:grid-cols-3">
            <DistributionBarChart data={chartData} />
            <DistributionPieChart data={pieData} />
          </div>

          {/* Detailed Table */}
          <StatisticsTable statistics={statistics} />
        </>
      )}
    </PageLayout>
  )
}

function SummaryCard({
  label,
  count,
  total,
  colorClass,
  badgeClass,
}: {
  label: string
  count: number
  total: number
  colorClass: string
  badgeClass: string
}) {
  const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : '0'

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>
        <CardTitle className={`text-2xl tabular-nums ${colorClass}`}>
          {formatNumber(count)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant="outline" className={badgeClass}>
          {percentage}% of total
        </Badge>
      </CardContent>
    </Card>
  )
}

function DistributionBarChart({ data }: { data: any[] }) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconChartBar className="size-5" />
          Score Distribution by Subject
        </CardTitle>
        <CardDescription>Number of students in each score range per subject</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="subject" tick={{ fontSize: 12 }} className="text-muted-foreground" />
              <YAxis tick={{ fontSize: 12 }} className="text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="Excellent (>=8)" stackId="a" fill={COLORS.excellent} />
              <Bar dataKey="Good (6.5-7.9)" stackId="a" fill={COLORS.good} />
              <Bar dataKey="Average (5-6.4)" stackId="a" fill={COLORS.average} />
              <Bar dataKey="Below Avg (<5)" stackId="a" fill={COLORS.belowAverage} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

function DistributionPieChart({ data }: { data: { name: string; value: number; color: string }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconUsers className="size-5" />
          Overall Distribution
        </CardTitle>
        <CardDescription>Aggregate score distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => formatNumber(value)}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

function StatisticsTable({
  statistics,
}: {
  statistics: {
    subject: string
    excellentCount: number
    goodCount: number
    averageCount: number
    belowAverageCount: number
    totalCount: number
  }[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Statistics by Subject</CardTitle>
        <CardDescription>Complete breakdown of score distribution for each subject</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead className="text-right">
                <span className="text-green-600">Excellent</span>
              </TableHead>
              <TableHead className="text-right">
                <span className="text-blue-600">Good</span>
              </TableHead>
              <TableHead className="text-right">
                <span className="text-yellow-600">Average</span>
              </TableHead>
              <TableHead className="text-right">
                <span className="text-red-600">Below Avg</span>
              </TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statistics.map((stat) => (
              <TableRow key={stat.subject}>
                <TableCell className="font-medium">
                  {SUBJECT_LABELS[stat.subject] || stat.subject}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatNumber(stat.excellentCount)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatNumber(stat.goodCount)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatNumber(stat.averageCount)}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatNumber(stat.belowAverageCount)}
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums">
                  {formatNumber(stat.totalCount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
