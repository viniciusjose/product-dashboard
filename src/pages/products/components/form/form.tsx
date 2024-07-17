import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/shadcn/ui/dialog.tsx'
import { Form } from '@/components/shadcn/ui/form.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/shadcn/ui/button.tsx'
import { ToastAction } from '@/components/shadcn/ui/toast.tsx'
import { useToast } from '@/components/shadcn/ui'
import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { ListTypes, ProductShow, ProductStore, ProductUpdate } from '@/interfaces'
import { useCallback, useEffect } from 'react'
import { ProductFormContent } from '@/pages/products/components/form/form-content.tsx'
import { useListTypes } from '@/hooks'

export type ProductsFormProps = {
  id?: number
  setIdEdit: (id: number | undefined) => void
  open: boolean
  setOpen: (open: boolean) => void
  refetch: () => void
  mutateAsync: UseMutateAsyncFunction<ProductStore.Result, unknown, ProductStore.Params, unknown>
  showAsync: UseMutateAsyncFunction<ProductShow.Result, unknown, ProductShow.Params, unknown>
  updateAsync: UseMutateAsyncFunction<ProductUpdate.Result, unknown, ProductUpdate.Params, unknown>
}

const formValidationSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório' }).trim().min(1, 'Nome é obrigatório'),
  types: z.array(z.object({ id: z.coerce.number() })).min(1, 'Selecione ao menos um imposto'),
  price: z.string()
    .trim()
    .min(1, { message: 'Preço deve ser no mínimo 1' })
})

export type FormDataSchema = z.infer<typeof formValidationSchema>

export const ProductsForm = ({
  id,
  setIdEdit,
  open,
  setOpen,
  refetch,
  mutateAsync,
  showAsync,
  updateAsync
}: ProductsFormProps) => {
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
    mode: 'onSubmit',
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      types: [],
      price: ''
    }
  })

  const completeFormProps: any = { register, handleSubmit, watch, setError, clearErrors, control, ...props }
  const { data: listTypes } = useListTypes()
  const { toast } = useToast()

  function closeModal(modalStatus: boolean): void {
    setOpen(modalStatus)
    setIdEdit(undefined)
    reset()
  }

  async function onSubmit(event: FormDataSchema) {
    try {
      if (!id) {
        await mutateAsync({
          name: event.name,
          price: parseFloat(event.price.replace(',', '.')),
          types: event.types
        })
      }

      if (id) {
        await updateAsync({
          id,
          name: event.name,
          price: parseFloat(event.price.replace(',', '.')),
          types: event.types
        })
      }

      reset()
      closeModal(false)

      toast({
        variant: 'default',
        title: 'Sucesso!',
        description: 'Imposto salvo com sucesso'
      })

      refetch()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado!',
        description: 'Não foi possível salvar o imposto',
        action: <ToastAction altText="Fechar">Fechar</ToastAction>
      })
    }
  }

  const showProduct = useCallback(async () => {
    try {
      const product = await showAsync({ id: id as number })
      setValue('name', product.name)
      setValue('price', new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(product.price).replace('.', ''))
      setValue('types', product.types.map((type) => ({ id: type.id })))
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado!',
        description: 'Não foi possível buscar o imposto',
        action: <ToastAction altText="Fechar">Fechar</ToastAction>
      })
    }
  }, [id, showAsync, setValue, toast])

  useEffect(() => {
    reset()
    if (id) {
      showProduct()
    } else {
      setIdEdit(undefined)
    }
  }, [id, reset, showProduct, setIdEdit])

  return (
    <div className="flex flex-row place-content-center">
      <Dialog open={open} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader className="gap-2">
            <DialogTitle>Cadastro de produtos</DialogTitle>
            <DialogDescription>
              🚀 Cadastre sua tabela de  produtos e organize suas vendas.
            </DialogDescription>
          </DialogHeader>
          <Form {...completeFormProps}>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <ProductFormContent
                register={register}
                errors={errors}
                control={control}
                listTypes={listTypes as ListTypes.Result}
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
