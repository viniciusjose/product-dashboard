import { PlusCircle, ShoppingCart } from 'lucide-react'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle, useToast
} from '@/components/shadcn/ui'
import { SalesTable } from '@/pages/sales/components/table/table.tsx'
import { useListSales, useSaleDestroy, useSaleShow, useSaleStore, useSaleUpdate } from '@/hooks'
import { ListSales, SaleShow } from '@/interfaces'
import { useState } from 'react'
import { OrderComponent } from '@/pages/sales/components/order'
import { SalesForm } from '@/pages/sales/components/form'

export const SalesPage = () => {
  const { data: listSales, refetch } = useListSales()
  const { mutateAsync } = useSaleStore()
  const { mutateAsync: destroyAsync } = useSaleDestroy()
  const { mutateAsync: updateAsync } = useSaleUpdate()
  const { mutateAsync: saleShowAsync, isPending: pendingSaleShow } = useSaleShow()
  const { toast } = useToast()

  const [sale, setSale] = useState<SaleShow.Result | undefined>(undefined)
  const [id, setId] = useState<number | undefined>(undefined)
  const [idEdit, setIdEdit] = useState<number | undefined>(undefined)
  const [open, setOpen] = useState(false)

  async function onDestroy(id: number): Promise<void> {
    await destroyAsync({ id })
    await refetch()

    toast({
      variant: 'default',
      title: 'Sucesso!',
      description: 'Categoria removida com sucesso'
    })
  }

  async function onEdit(id: number): Promise<void> {
    setIdEdit(id)
    setOpen(true)
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-2">
        <Card className="sm:col-span-2">
          <CardHeader className="px-7">
            <CardTitle className="flex justify-between">
              <span className="flex flex-row gap-2">
                <ShoppingCart className="h-6" />
                Vendas
              </span>
            </CardTitle>
            <CardDescription>
              Listagem de vendas
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button variant="outline" onClick={() => setOpen(true)}>
              <PlusCircle className="h-4 mr-1" />
              Venda
            </Button>
            <SalesForm
              setIdEdit={setIdEdit}
              setIdShow={setId}
              setSale={setSale}
              id={idEdit}
              open={open}
              setOpen={setOpen}
              refetch={refetch}
              mutateAsync={mutateAsync}
              showAsync={saleShowAsync}
              updateAsync={updateAsync}
            />
            <SalesTable
              list={listSales as ListSales.Result}
              setId={setId}
              onDestroy={onDestroy}
              onEdit={onEdit}
            />
          </CardContent>
        </Card>
      </div>
      <div>
        <OrderComponent id={id} setId={setId} saleShowAsync={saleShowAsync} isPending={pendingSaleShow} sale={sale} setSale={setSale}/>
      </div>
    </div>

  )
}
