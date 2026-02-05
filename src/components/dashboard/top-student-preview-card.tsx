const rankColors = {
  1: 'bg-yellow-500 text-white',
  2: 'bg-gray-400 text-white',
  3: 'bg-amber-700 text-white',
}

export function TopStudentPreviewCard({
  student,
  rank,
}: {
  student: { registrationNumber: string; mathScore: number; physicsScore: number; chemistryScore: number; totalScore: number }
  rank: number
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-lg border p-4 ${
        rank === 1 ? 'border-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20' : ''
      }`}
    >
      <div className={`flex size-10 items-center justify-center rounded-full font-bold ${rankColors[rank as keyof typeof rankColors]}`}>
        {rank}
      </div>
      <div className="flex-1">
        <div className="font-mono text-sm">{student.registrationNumber}</div>
        <div className="text-muted-foreground text-xs">
          M: {student.mathScore} | P: {student.physicsScore} | C: {student.chemistryScore}
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold tabular-nums">{student.totalScore.toFixed(2)}</div>
        <div className="text-muted-foreground text-xs">Total</div>
      </div>
    </div>
  )
}
