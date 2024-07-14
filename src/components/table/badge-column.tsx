import { Badge } from '@/components/shadcn/ui'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shadcn/ui/tooltip.tsx'

type BadgeColumnProps<T extends Record<string, string>> = {
  badges: T[]
  label: string
  key: string | number
}

export function BadgeColumn<T extends Record<string, string>>({ badges, label, key }: BadgeColumnProps<T>) {
  const [ badge, ...restBadges ] = badges

  return (
    <>
      {badge && <Badge variant="outline">{badge[label]}</Badge>}
      {restBadges.length > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge variant="outline" className={'ml-2'}>+{restBadges.length}</Badge>
            </TooltipTrigger>
            <TooltipContent>
              {restBadges.map((badge) => (
                <p key={badge[key]}>{badge[label]}</p>
              ))}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  )
}
