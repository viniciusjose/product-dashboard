import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle, DialogTrigger,
  Form, ToastAction, useToast
} from '@/components/shadcn/ui'
import { Box, ShoppingCart } from 'lucide-react'
import { ListProducts } from '@/interfaces'
import { AddProductsFormContent } from '@/pages/sales/components/order/components/form/form-content.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSaleAddProduct } from '@/hooks'

type AddProductFormProps = {
  id?: number
  open: boolean
  setOpen: (open: boolean) => void
  listProducts: ListProducts.Result | undefined
  updateOrderCard: (id: number) => void
}

const formValidationSchema = z.object({
  product_id: z.coerce.number().int().positive('Produto é obrigatório'),
  quantity: z.coerce.number({ message: 'Quantidade deve ser um numérico'}).int().positive('Quantidade é obrigatória')
})

export type FormDataSchema = z.infer<typeof formValidationSchema>

export const AddProductForm = ({ id, open, setOpen, updateOrderCard, listProducts }: AddProductFormProps) => {
  const { mutateAsync } = useSaleAddProduct()
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    control,
    reset,
    ...props
  } = useForm<FormDataSchema>({
    mode: 'all',
    resolver: zodResolver(formValidationSchema)
  })

  const completeFormProps: any = { register, handleSubmit, watch, setError, clearErrors, control, ...props }

  async function onSubmit(event: FormDataSchema) {
    if (!id) return toast({
      variant: 'destructive',
      title: 'Ops! Algo deu errado!',
      description: 'Não foi possível encontrar sua venda!',
      action: <ToastAction altText="Fechar">Fechar</ToastAction>
    })

    try {
      await mutateAsync({ id, ...event })

      toast({
        variant: 'default',
        title: 'Produto adicionado!',
        description: 'Produto adicionado com sucesso!',
        action: <ToastAction altText="Fechar">Fechar</ToastAction>
      })

      await closeModal()
      updateOrderCard(id)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado!',
        description: 'Não foi possível adicionar o produto!',
        action: <ToastAction altText="Fechar">Fechar</ToastAction>
      })
    }
  }

  async function closeModal() {
    setOpen(false)
    reset()
  }

  return (
    <div className="flex flex-row place-content-center">
      <Dialog open={open} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle className="flex flex-row items-center">
              <Box className="h-6 mr-2" />
              Adicionar produto
            </DialogTitle>
            <DialogDescription>
              Adicione o produto em sua cesta de compra.
            </DialogDescription>
          </DialogHeader>
          <Form {...completeFormProps}>
            <form onSubmit={handleSubmit(onSubmit)} className="my-2">
              <AddProductsFormContent
                register={register}
                errors={errors}
                control={control}
                listProducts={listProducts as ListProducts.Result}
              />

              <DialogFooter className="mt-5">
                <DialogTrigger asChild>
                  <Button variant="secondary" type="button" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                </DialogTrigger>
                <Button type="submit">
                  <ShoppingCart className="h-4" />
                  Adicionar no carrinho
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
