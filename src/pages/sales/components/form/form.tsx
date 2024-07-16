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
import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { ListProducts, SaleShow, SaleStore, SaleUpdate } from '@/interfaces'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCallback, useEffect } from 'react'
import { SalesFormContent } from '@/pages/sales/components/form/form-content.tsx'
import { useListProducts } from '@/hooks'
import { ShoppingBag } from 'lucide-react'

export type SalesFormProps = {
  id?: number
  setIdEdit: (id: number | undefined) => void
  setIdShow: (id: number | undefined) => void
  setSale: (sale: SaleShow.Result | undefined) => void
  open: boolean
  setOpen: (open: boolean) => void
  refetch: () => void
  mutateAsync: UseMutateAsyncFunction<SaleStore.Result, unknown, SaleStore.Params, unknown>
  showAsync: UseMutateAsyncFunction<SaleShow.Result, unknown, SaleShow.Params, unknown>
  updateAsync: UseMutateAsyncFunction<SaleUpdate.Result, unknown, SaleUpdate.Params, unknown>
}

const formValidationSchema = z.object({
  customer: z.string({ required_error: 'Nome é obrigatório' }).trim().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido').trim().min(1, 'E-mail é obrigatório'),
  zip_code: z
    .string()
    .regex(/^\d{5}-?\d{3}$/, { message: "O CEP deve ter 8 dígitos numéricos, com ou sem traço." })
    .transform((value) => value.replace('-', '')),
  address: z.string({ required_error: 'Endereço é obrigatório' }).trim().min(1, 'Endereço é obrigatório'),
  address_number: z.coerce.number({ required_error: 'Número é obrigatório' }).int().positive('Número é obrigatório'),
  description: z.string().optional()
})

export type FormDataSchema = z.infer<typeof formValidationSchema>

export const SalesForm = ({ id, open, setOpen, setIdEdit, setIdShow, setSale, showAsync, mutateAsync, updateAsync, refetch }: SalesFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    setValue,
    clearErrors,
    control,
    reset,
    ...props
  } = useForm<FormDataSchema>({
    mode: 'all',
    resolver: zodResolver(formValidationSchema)
  })

  const { toast } = useToast()
  const { data: listProducts } = useListProducts()
  const completeFormProps: any = { register, handleSubmit, watch, setError, clearErrors, control, ...props }

  function closeModal(modalStatus: boolean): void {
    setOpen(modalStatus)
    setIdEdit(undefined)
    reset()
  }

  async function onSubmit(event: FormDataSchema) {
    try {
      if (!id) {
        await mutateAsync({
          customer: event.customer,
          email: event.email,
          zip_code: event.zip_code,
          address: event.address,
          address_number: event.address_number,
          description: event.description
        })
      }

      if (id) {
        await updateAsync({
          id,
          customer: event.customer,
          email: event.email,
          zip_code: event.zip_code,
          address: event.address,
          address_number: event.address_number,
          description: event.description
        })

        setSale(undefined)
        setIdShow(undefined)

        setTimeout(function(){
          setIdShow(id)
        }, 350);
      }

      reset()
      closeModal(false)

      toast({
        variant: 'default',
        title: 'Sucesso!',
        description: 'Venda cadastrada com sucesso!'
      })

      refetch()
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado!',
        description: 'Não foi possível cadastrar sua venda!',
        action: <ToastAction altText="Fechar">Fechar</ToastAction>
      })
    }
  }

  const showSale = useCallback(async () => {
    try {
      const product = await showAsync({ id: id as number })
      setValue('customer', product.customer)
      setValue('email', product.email)
      setValue('zip_code', product.zip_code)
      setValue('address', product.address)
      setValue('address_number', product.address_number)
      setValue('description', product.description)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado!',
        description: 'Não foi possível buscar a venda',
        action: <ToastAction altText="Fechar">Fechar</ToastAction>
      })
    }
  }, [id, showAsync, setValue, toast])

  useEffect(() => {
    reset()
    if (id) {
      showSale()
    } else {
      setIdEdit(undefined)
    }
  }, [id, reset, showSale, setIdEdit])

  return (
    <div className="flex flex-row place-content-center">
      <Dialog open={open} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader className="gap-2">
            <DialogTitle className="flex flex-row items-center">
              <ShoppingBag className="h-6 mr-2" />
              {!id ? 'Nova' : 'Editar'} venda
            </DialogTitle>
            <DialogDescription>
              🚀 Adicione as informações do cliente para iniciar a venda.
            </DialogDescription>
          </DialogHeader>
          <Form {...completeFormProps}>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <SalesFormContent
                register={register}
                errors={errors}
                control={control}
                listProducts={listProducts as ListProducts.Result}
              />

              <DialogFooter className="mt-4">
                <DialogTrigger asChild>
                  <Button variant="secondary" type="button" onClick={() => setOpen(false)}>
                    Cancelar
                  </Button>
                </DialogTrigger>
                <Button type="submit">
                  {id ? 'Salvar' : 'Cadastrar'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
