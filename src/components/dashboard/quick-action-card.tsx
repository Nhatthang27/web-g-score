import { Link } from '@tanstack/react-router'
import { IconArrowRight } from '@tabler/icons-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function QuickActionCard({
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
