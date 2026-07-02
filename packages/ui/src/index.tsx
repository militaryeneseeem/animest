import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Badge({ children, className }: Readonly<{ children: React.ReactNode; className?: string }>) {
  return <span className={cn('inline-flex rounded-full border border-white/10 px-3 py-1 text-xs font-semibold', className)}>{children}</span>;
}
