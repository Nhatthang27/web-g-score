import { useQuery } from '@tanstack/react-query'
import { studentService } from '@/services/student.service'

export const studentKeys = {
  all: ['students'] as const,
  student: (registrationNumber: string) => [...studentKeys.all, 'detail', registrationNumber] as const,
  topStudents: () => [...studentKeys.all, 'top-group-a'] as const,
  statistics: () => ['statistics', 'score-distribution'] as const,
}

export function useStudent(registrationNumber: string) {
  return useQuery({
    queryKey: studentKeys.student(registrationNumber),
    queryFn: () => studentService.getStudentByRegistrationNumber(registrationNumber),
    enabled: !!registrationNumber,
  })
}

export function useTopStudents() {
  return useQuery({
    queryKey: studentKeys.topStudents(),
    queryFn: () => studentService.getTopGroupAStudents(),
  })
}

export function useScoreDistribution() {
  return useQuery({
    queryKey: studentKeys.statistics(),
    queryFn: () => studentService.getScoreDistribution(),
  })
}
