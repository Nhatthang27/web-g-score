// API Response types (snake_case - matching backend response)
export interface StudentScoreApiDto {
  registration_number: string;
  foreign_language_code: string | null;
  scores: Record<string, number | null>;
}

export interface TopStudentApiDto {
  rank: number;
  registration_number: string;
  math_score: number;
  physics_score: number;
  chemistry_score: number;
  total_score: number;
}

export interface SubjectStatisticsApiDto {
  subject: string;
  excellent_count: number;
  good_count: number;
  average_count: number;
  below_average_count: number;
  total_count: number;
}

// Frontend types (camelCase - for use in components)
export interface StudentScoreDto {
  registrationNumber: string;
  foreignLanguageCode: string | null;
  scores: Record<string, number | null>;
}

export interface TopStudentDto {
  rank: number;
  registrationNumber: string;
  mathScore: number;
  physicsScore: number;
  chemistryScore: number;
  totalScore: number;
}

export interface SubjectStatisticsDto {
  subject: string;
  excellentCount: number;
  goodCount: number;
  averageCount: number;
  belowAverageCount: number;
  totalCount: number;
}

// Transform functions
export function transformStudentScore(api: StudentScoreApiDto): StudentScoreDto {
  return {
    registrationNumber: api.registration_number,
    foreignLanguageCode: api.foreign_language_code,
    scores: api.scores,
  };
}

export function transformTopStudent(api: TopStudentApiDto): TopStudentDto {
  return {
    rank: api.rank,
    registrationNumber: api.registration_number,
    mathScore: api.math_score,
    physicsScore: api.physics_score,
    chemistryScore: api.chemistry_score,
    totalScore: api.total_score,
  };
}

export function transformSubjectStatistics(api: SubjectStatisticsApiDto): SubjectStatisticsDto {
  return {
    subject: api.subject,
    excellentCount: api.excellent_count,
    goodCount: api.good_count,
    averageCount: api.average_count,
    belowAverageCount: api.below_average_count,
    totalCount: api.total_count,
  };
}
