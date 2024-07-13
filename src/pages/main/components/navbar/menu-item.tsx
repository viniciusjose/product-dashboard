import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shadcn/ui/tooltip.tsx'
import { clsx } from 'clsx'
import { LucideIcon } from 'lucide-react'

type MenuItemProps = {
  href: string
  Icon: LucideIcon
  label: string
  className?: string
}
export const MenuItem = ({ href, Icon, label, className }: MenuItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={href}
            className={
              clsx(
                'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                className
              )
            }
          >
            <Icon className="h-5 w-5"/>
            <span className="sr-only">{label}</span>
          </a>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
