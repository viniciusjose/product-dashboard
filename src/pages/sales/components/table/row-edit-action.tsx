import { DropdownMenuItem } from '@/components/shadcn/ui'
import { Pen } from 'lucide-react'

type RowEditActionProps = {
  id: number
  onEdit: (id: number) => void
}

export const RowEditAction = ({ id, onEdit }: RowEditActionProps) => {
  return (
    <DropdownMenuItem onClick={() => onEdit(id)}>
        <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
        Editar
    </DropdownMenuItem>
  )
}
