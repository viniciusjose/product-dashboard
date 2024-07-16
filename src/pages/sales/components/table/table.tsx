import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/ui/table.tsx'
import { ListSales } from '@/interfaces'
import { MoreHorizontal } from 'lucide-react'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/shadcn/ui'
import { EmptyRow } from '@/components/table'
import { RowShowAction } from '@/pages/sales/components/table/row-show-action.tsx'
import { RowEditAction } from '@/pages/sales/components/table/row-edit-action.tsx'
import { RowDestroyAction } from '@/pages/sales/components/table/row-delete-action.tsx'

type TableComponentProps = {
  list: ListSales.Result
  onDestroy: (id: number) => void
  onEdit: (id: number) => void
  setId: (id: number | undefined) => void
}

export const SalesTable = ({ list, setId, onEdit, onDestroy }: TableComponentProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">
              #
            </TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-end">Impostos</TableHead>
            <TableHead className="text-end">Valor Total</TableHead>
            <TableHead className="text-center">Opções</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list?.length ? list.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-center">{item.id}</TableCell>
              <TableCell>{item.customer}</TableCell>
              <TableCell>{new Intl.DateTimeFormat('pt-BR', {dateStyle: "short", timeStyle: "short"}).format(new Date(item.created_at))}</TableCell>
              <TableCell className="text-end">{new Intl.NumberFormat('pt-BR', { style: "currency",  currency: "BRL", maximumFractionDigits: 2 }).format(item.taxes_amount)}</TableCell>
              <TableCell className="text-end">{new Intl.NumberFormat('pt-BR', { style: "currency",  currency: "BRL", maximumFractionDigits: 2 }).format(item.total_amount)}</TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" className="flex size-8 p-0 data-[state=open]:bg-muted">
                      <MoreHorizontal className="size-4" />
                      <span className="sr-only">Opções</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <RowShowAction setId={setId} id={item.id}/>
                    <RowEditAction id={item.id} onEdit={onEdit}/>
                    <DropdownMenuSeparator/>
                    <RowDestroyAction onDestroy={onDestroy} id={item.id} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )): <>
            <EmptyRow colSpan={7} />
          </>}
        </TableBody>
      </Table>
    </div>
  )
}
