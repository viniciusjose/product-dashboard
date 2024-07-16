import { DropdownMenuItem } from '@/components/shadcn/ui'
import { Eye } from 'lucide-react'

type RowShowActionProps = {
  id: number
  setId: (id: number | undefined) => void
}

export const RowShowAction = ({ id, setId }: RowShowActionProps) => {
  return (
    <DropdownMenuItem onClick={() => setId(id)}>
        <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
        Visualizar
    </DropdownMenuItem>
  )
}
