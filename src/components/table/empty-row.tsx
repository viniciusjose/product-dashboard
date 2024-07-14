import { TableCell, TableRow } from '@/components/shadcn/ui/table.tsx'
import { Table2Icon } from 'lucide-react'

type EmptyRowProps = {
  colSpan: number
  text?: string
}
export const EmptyRow = ({ colSpan, text = 'Nenhum registro encontrado' }:  EmptyRowProps) => {
   return (
     <TableRow>
       <TableCell colSpan={colSpan} className="text-center">
         <div className="flex flex-row gap-1 justify-center text-muted-foreground">
           <Table2Icon className="pb-1" />
           {text}
         </div>

       </TableCell>
     </TableRow>
   )
}
