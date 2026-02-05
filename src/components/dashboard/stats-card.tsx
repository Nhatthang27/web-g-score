import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'

export function StatsCard({
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
