import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shadcn/ui/tooltip.tsx'
import { LucideIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib'

type MenuItemProps = {
  href: string
  Icon: LucideIcon
  label: string
  className?: string
}
export const MenuItem = ({ href, Icon, label, className }: MenuItemProps) => {
  const { pathname } = useLocation()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={href}
            className={
              cn(
                'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground/70 transition-colors hover:text-foreground md:h-8 md:w-8',
                {
                  'bg-accent text-primary': pathname === href
                },
                className
              )
            }
          >
            <Icon className="h-5 w-5"/>
            <span className="sr-only">{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
