import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { PlusCircle, Tag } from 'lucide-react'
import { TableComponent } from '@/pages/types/components/table/table.tsx'
import { Button } from '@/components/shadcn/ui/button.tsx'
import { useListTypes, useTypeStore, useTypeShow, useTypeUpdate, useTypeDestroy } from '@/hooks'
import { ListTypes } from '@/interfaces'
import { useState } from 'react'
import { useToast } from '@/components/shadcn/ui'
import { TypesForm } from '@/pages/types/components/form'

export const TypesPage = () => {
  const { data: list, refetch } = useListTypes()
  const { mutateAsync } = useTypeStore()
  const { mutateAsync: showAsync } = useTypeShow()
  const { mutateAsync: updateAsync } = useTypeUpdate()
  const { mutateAsync: destroyAsync } = useTypeDestroy()

  const [open, setOpen] = useState(false)
  const [idEdit, setIdEdit] = useState<number | undefined>(undefined)
  const { toast } = useToast()

  async function onEdit(id: number): Promise<void> {
    setIdEdit(id)
    setOpen(true)
  }

  async function onDestroy(id: number): Promise<void> {
    await destroyAsync({ id })
    await refetch()

    toast({
      variant: 'default',
      title: 'Sucesso!',
      description: 'Categoria removida com sucesso'
    })
  }

  return (
    <div>
      <Card>
        <CardHeader className="px-7">
          <CardTitle className="flex justify-between">
            <span className="flex flex-row gap-1">
              <Tag className="h-6" />
              Categorias
            </span>

            <Button className="w-[130px] h-9" onClick={() => setOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Categoria
            </Button>
          </CardTitle>
          <CardDescription>
            ⚙ Facilite a busca e organização de seus produtos.
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
            <TableComponent list={list as ListTypes.Result} onEdit={onEdit} onDestroy={onDestroy} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
