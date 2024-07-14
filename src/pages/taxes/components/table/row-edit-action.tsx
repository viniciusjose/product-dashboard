import { Pen } from 'lucide-react'
import { DropdownMenuItem } from '@/components/shadcn/ui'

type RowEditActionProps = {
  onEdit: (id: number) => void
  id: number
}
export const RowEditAction = ({ onEdit, id }: RowEditActionProps) => {
  return (
    <DropdownMenuItem onClick={() => onEdit(id)}>
      <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
      Editar
    </DropdownMenuItem>
  )
}
