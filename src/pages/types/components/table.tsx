import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/ui/table.tsx'
import { ListTypes } from '@/interfaces'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/shadcn/ui'
import { MoreHorizontal, Pen } from 'lucide-react'

type TableComponentProps = {
  list: ListTypes.Result
  onEdit: (id: number) => void
}
export const TableComponent = ({ list, onEdit }: TableComponentProps) => {

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead>Atualizado em</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list && list.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
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
                      <DropdownMenuItem onClick={() => onEdit(item.id)}>
                        <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator/>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
