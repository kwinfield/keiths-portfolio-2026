// components/ui/tag.tsx
export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs">
      {children}
    </span>
  )
}
