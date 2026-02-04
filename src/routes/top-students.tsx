import { createFileRoute } from '@tanstack/react-router'
import { TopStudentsPage } from '@/components/pages'

export const Route = createFileRoute('/top-students')({
  component: TopStudentsPage,
})
