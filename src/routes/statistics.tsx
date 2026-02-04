import { createFileRoute } from '@tanstack/react-router'
import { StatisticsPage } from '@/components/pages'

export const Route = createFileRoute('/statistics')({
  component: StatisticsPage,
})
