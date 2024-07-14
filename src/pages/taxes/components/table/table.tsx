import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/ui/table.tsx'
import { ListTaxes } from '@/interfaces'
import { MoreHorizontal } from 'lucide-react'
import { RowEditAction } from '@/pages/types/components/table/row-edit-action'
import { RowDestroyAction } from '@/pages/types/components/table/row-delete-action.tsx'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/shadcn/ui'
import { EmptyRow } from '@/components/table'

type TableComponentProps = {
  list: ListTaxes.Result
  onEdit: (id: number) => void
  onDestroy: (id: number) => void
}
export const TableComponent = ({ list, onEdit, onDestroy }: TableComponentProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">
              ID
            </TableHead>
            <TableHead>Nome</TableHead>
            <TableHead className="text-center">Porcentagem</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead>Atualizado em</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list?.length ? list.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-center">{item.percentage * 100} %</TableCell>
                <TableCell>{new Intl.DateTimeFormat('pt-BR', {dateStyle: "short", timeStyle: "short"}).format(new Date(item.created_at))}</TableCell>
                <TableCell>{item.updated_at && new Intl.DateTimeFormat('pt-BR', {dateStyle: "short", timeStyle: "short"}).format(new Date(item.updated_at))}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" className="flex size-8 p-0 data-[state=open]:bg-muted">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Ações</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <RowEditAction onEdit={onEdit} id={item.id}/>
                      <DropdownMenuSeparator/>
                      <RowDestroyAction onDestroy={onDestroy} id={item.id} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
          )): <>
            <EmptyRow colSpan={6} />
          </>}
        </TableBody>
      </Table>
    </div>
  )
}
