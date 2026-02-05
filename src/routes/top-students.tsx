import { createFileRoute } from '@tanstack/react-router'
import { TopStudentsPage } from '@/pages'

export const Route = createFileRoute('/top-students')({
  component: TopStudentsPage,
})
