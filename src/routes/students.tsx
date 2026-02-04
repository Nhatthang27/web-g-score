import { createFileRoute } from '@tanstack/react-router'
import { StudentsPage } from '@/components/pages'

export const Route = createFileRoute('/students')({
  component: StudentsPage,
})
