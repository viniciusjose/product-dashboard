import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { HandCoins, PlusCircle } from 'lucide-react'
import { TableComponent } from '@/pages/taxes/components/table/table.tsx'
import { Button } from '@/components/shadcn/ui/button.tsx'
import { useListTaxes, useTaxStore, useTaxShow, useTaxUpdate, useTaxDestroy } from '@/hooks'
import { ListTaxes } from '@/interfaces'
import { useState } from 'react'
import { useToast } from '@/components/shadcn/ui'
import { TaxesForm } from '@/pages/taxes/components/form'

export const TaxesPage = () => {
  const { data: list, refetch } = useListTaxes()
  const { mutateAsync } = useTaxStore()
  const { mutateAsync: showAsync } = useTaxShow()
  const { mutateAsync: updateAsync } = useTaxUpdate()
  const { mutateAsync: destroyAsync } = useTaxDestroy()

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
              <HandCoins className="h-6" />
              Impostos
            </span>

            <Button className="w-[130px] h-9" onClick={() => setOpen(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Imposto
            </Button>
          </CardTitle>
          <CardDescription>
            ⚙ Aqui você pode gerenciar os impostos que serão aplicados aos produtos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <TaxesForm
              mutateAsync={mutateAsync}
              showAsync={showAsync}
              updateAsync={updateAsync}
              setIdEdit={setIdEdit}
              id={idEdit}
              open={open}
              setOpen={setOpen}
              refetch={refetch}
            />
            <TableComponent list={list as ListTaxes.Result} onEdit={onEdit} onDestroy={onDestroy} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
