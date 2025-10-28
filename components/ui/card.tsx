export function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border bg-white dark:bg-zinc-900 shadow-soft">{children}</div>
}
export function CardBody({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return <div className={`p-5 ${className}`}>{children}</div>
}
export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold">{children}</h3>
}
export function CardMeta({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{children}</p>
}
