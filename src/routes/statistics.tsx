import { createFileRoute } from '@tanstack/react-router'
import { StatisticsPage } from '@/pages'

export const Route = createFileRoute('/statistics')({
  component: StatisticsPage,
})
