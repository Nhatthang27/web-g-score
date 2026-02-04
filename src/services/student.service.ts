import { publicClient } from '@/lib/api-client';
import type { ApiResponse } from '@/types/api-response.type';
import type {
  StudentScoreApiDto,
  TopStudentApiDto,
  SubjectStatisticsApiDto,
  StudentScoreDto,
  TopStudentDto,
  SubjectStatisticsDto,
} from '@/types/student.types';
import {
  transformStudentScore,
  transformTopStudent,
  transformSubjectStatistics,
} from '@/types/student.types';

export const studentService = {
  getStudentByRegistrationNumber: async (
    registrationNumber: string
  ): Promise<ApiResponse<StudentScoreDto>> => {
    const response = await publicClient.get<ApiResponse<StudentScoreApiDto>>(
      `/api/students/${registrationNumber}`
    );

    return {
      success: response.data.success,
      data: response.data.data ? transformStudentScore(response.data.data) : undefined as any,
      error: response.data.error,
    };
  },

  getTopGroupAStudents: async (): Promise<ApiResponse<TopStudentDto[]>> => {
    const response = await publicClient.get<ApiResponse<TopStudentApiDto[]>>(
      '/api/students/top-group-a'
    );

    return {
      success: response.data.success,
      data: response.data.data?.map(transformTopStudent) || [],
      error: response.data.error,
    };
  },

  getScoreDistribution: async (): Promise<ApiResponse<SubjectStatisticsDto[]>> => {
    const response = await publicClient.get<ApiResponse<SubjectStatisticsApiDto[]>>(
      '/api/statistics/score-distribution'
    );

    return {
      success: response.data.success,
      data: response.data.data?.map(transformSubjectStatistics) || [],
      error: response.data.error,
    };
  },
};
