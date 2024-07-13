import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { PlusCircle, Table2 } from 'lucide-react'
import { TableComponent } from '@/pages/types/components/table'
import { Button } from '@/components/shadcn/ui/button.tsx'
import { useListTypes, useTypeShow, useTypeStore, useTypeUpdate } from '@/hooks'
import { ListTypes } from '@/interfaces'
import { useState } from 'react'
import { TypesForm } from '@/pages/types/components/form'

export const TypesPage = () => {
  const { data: list, refetch } = useListTypes()
  const { mutateAsync } = useTypeStore()
  const { mutateAsync: showAsync } = useTypeShow()
  const { mutateAsync: updateAsync } = useTypeUpdate()

  const [open, setOpen] = useState(false)
  const [idEdit, setIdEdit] = useState<number | undefined>(undefined)

  async function onEdit(id: number): Promise<void> {
    setIdEdit(id)
    setOpen(true)
  }

  return (
    <div>
      <Card>
        <CardHeader className="px-7">
          <CardTitle className="flex justify-between">
            <span className="flex flex-row gap-1">
              <Table2 className="h-6"/>
              Categorias
            </span>

            <Button className="w-[130px] h-9" onClick={() => setOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2"/>
              Categoria
            </Button>
          </CardTitle>
          <CardDescription>
            Facilite a busca e organização de seus produtos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <TypesForm
              mutateAsync={mutateAsync}
              showAsync={showAsync}
              updateAsync={updateAsync}
              setIdEdit={setIdEdit}
              id={idEdit}
              open={open}
              setOpen={setOpen}
              refetch={refetch}
            />
            <TableComponent list={list as ListTypes.Result} onEdit={onEdit}/>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
