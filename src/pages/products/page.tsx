import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Boxes, PlusCircle } from 'lucide-react'
import { TableComponent } from '@/pages/products/components/table/table.tsx'
import { Button } from '@/components/shadcn/ui/button.tsx'
import { useListProducts, useProductStore, useProductShow, useProductUpdate, useProductDestroy } from '@/hooks'
import { ListProducts } from '@/interfaces'
import { useState } from 'react'
import { useToast } from '@/components/shadcn/ui'
import { ProductsForm } from '@/pages/products/components/form'

export const ProductsPage = () => {
  const { data: list, refetch } = useListProducts()
  const { mutateAsync } = useProductStore()
  const { mutateAsync: showAsync } = useProductShow()
  const { mutateAsync: updateAsync } = useProductUpdate()
  const { mutateAsync: destroyAsync } = useProductDestroy()

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
              <Boxes className="h-6" />
              Produtos
            </span>

            <Button className="w-[130px] h-9" onClick={() => setOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Produto
            </Button>
          </CardTitle>
          <CardDescription>
            ⚙ Gerencie seus produtos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <ProductsForm
              mutateAsync={mutateAsync}
              showAsync={showAsync}
              updateAsync={updateAsync}
              setIdEdit={setIdEdit}
              id={idEdit}
              open={open}
              setOpen={setOpen}
              refetch={refetch}
            />
            <TableComponent list={list as ListProducts.Result} onEdit={onEdit} onDestroy={onDestroy} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
