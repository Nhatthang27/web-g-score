import { cn } from '@/lib/utils'

interface SplashProps {
  readonly className?: string
}

export function Splash({ className }: SplashProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-primary via-primary/90 to-primary/70',
        className
      )}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-xl">
          <svg
            className="h-12 w-12 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* App name */}
        <h1 className="text-3xl font-bold text-white">Backtrack</h1>

        {/* Loading dots */}
        <div className="flex gap-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]" />
          <div className="h-2 w-2 animate-bounce rounded-full bg-white" />
        </div>
      </div>
    </div>
  )
}
