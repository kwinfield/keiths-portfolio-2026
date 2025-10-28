import { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const button = cva(
  'inline-flex items-center justify-center rounded-2xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-brand/40 disabled:opacity-50',
  {
    variants: {
      variant: {
        solid: 'bg-brand text-brand-fg border-transparent hover:shadow-soft',
        outline: 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800',
        ghost: 'border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800'
      },
      size: {
        sm: 'px-3 py-1.5',
        md: 'px-4 py-2',
        lg: 'px-5 py-3'
      }
    },
    defaultVariants: { variant: 'solid', size: 'md' }
  }
)

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>
export default function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={clsx(button({ variant, size }), className)} {...props} />
}
