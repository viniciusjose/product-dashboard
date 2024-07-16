import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator, ToastAction, useToast
} from '@/components/shadcn/ui'
import { EyeOff, PlusCircle, ShoppingBag } from 'lucide-react'
import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { SaleShow } from '@/interfaces'
import { useCallback, useEffect } from 'react'
import { SkeletonComponent } from '@/pages/sales/components/order/components'

type OrderComponentProps = {
  id: number | undefined
  setId: (id: number |  undefined) => void
  saleShowAsync: UseMutateAsyncFunction<SaleShow.Result, unknown, SaleShow.Params, unknown>
  setSale: (sale: SaleShow.Result |  undefined) => void
  sale: SaleShow.Result |  undefined
  isPending: boolean
}
export const OrderComponent = ({ setId, id, saleShowAsync, isPending, setSale, sale }: OrderComponentProps) => {
  const { toast } = useToast()

  const saleShow = useCallback(async () => {
    try {
      const sale = await saleShowAsync({ id: id as number })
      setSale(sale)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado!',
        description: 'Não foi possível buscar a venda',
        action: <ToastAction altText="Fechar">Fechar</ToastAction>
      })
    }
  }, [id, saleShowAsync, toast])

  useEffect(() => {
    if (id) {
      saleShow()
    }
  }, [id, saleShow])

  const hideSale = () => {
    setSale(undefined)
    setId(undefined)
  }
  return (
    <>
      {!isPending && sale ? (
        <Card>
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                <ShoppingBag className="h-5" />
                Order #{sale.id}
              </CardTitle>
              <CardDescription>
                {
                  new Intl.DateTimeFormat('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  }).format(new Date(sale.created_at))
                }
              </CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  Produto
                </span>
              </Button>
              <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => hideSale()}>
                <EyeOff className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            {sale.description && (
              <>
                <div className="grid gap-3">
                  <div className="font-semibold">Descrição do pedido</div>
                  <div className="text-justify">{sale.description}</div>
                </div>

                <Separator className="my-2" />
              </>
            )}


            <div className="grid gap-3">
              <div className="font-semibold">Detalhes do pedido</div>
              <ul className="grid gap-3">
                {sale.items && sale.items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        {item.name} x <span>{item.quantity}</span>
                      </span>
                    <span>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          maximumFractionDigits: 2
                        }).format(item.amount)}
                      </span>
                  </li>
                ))}
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        maximumFractionDigits: 2
                      }).format(sale.amount)}
                    </span>
                </li>

                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Impostos</span>
                  <span>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        maximumFractionDigits: 2
                      }).format(sale.taxes_amount ?? 0)}
                    </span>
                </li>
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <span>
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          maximumFractionDigits: 2
                        }).format(sale.totalAmount)}
                    </span>
                </li>
              </ul>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Dados do cliente</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Cliente</dt>
                  <dd>{sale.customer}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>
                    <a href="mailto:">{sale.email}</a>
                  </dd>
                </div>
              </dl>
            </div>
            <Separator className="my-4" />
            <div>
              <div className="grid gap-3">
                <div className="font-semibold">Informações de entrega</div>
                <address className="grid gap-0.5 not-italic text-muted-foreground">
                  <span>{sale.address} {sale.address_number}, {sale.zip_code}</span>
                </address>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Atualizado em {sale.updated_at &&
              new Intl.DateTimeFormat('pt-BR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                minute: 'numeric',
                hour: 'numeric'
              }).format(new Date(sale.updated_at))
            }
            </div>
          </CardFooter>
        </Card>
      ) : <SkeletonComponent />}
    </>
  )

}
