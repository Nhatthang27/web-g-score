import { createFileRoute } from '@tanstack/react-router'
import { StudentsPage } from '@/pages'

export const Route = createFileRoute('/students')({
  component: StudentsPage,
})
