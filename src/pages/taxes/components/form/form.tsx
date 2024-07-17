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
import { TaxShow, TaxStore, TaxUpdate } from '@/interfaces'
import { useCallback, useEffect } from 'react'
import { TaxesFormContent } from '@/pages/taxes/components/form/form-content.tsx'

export type TaxesFormProps = {
  id?: number
  setIdEdit: (id: number | undefined) => void
  open: boolean
  setOpen: (open: boolean) => void
  refetch: () => void
  mutateAsync: UseMutateAsyncFunction<TaxStore.Result, unknown, TaxStore.Params, unknown>
  showAsync: UseMutateAsyncFunction<TaxShow.Result, unknown, TaxShow.Params, unknown>
  updateAsync: UseMutateAsyncFunction<TaxUpdate.Result, unknown, TaxUpdate.Params, unknown>
}

const formValidationSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório' }).trim().min(1, 'Nome é obrigatório'),
  percentage: z.string()
    .trim()
    .min(1, { message: 'Preço deve ser no mínimo 1' })
    .transform((value) => value.replace(',', '.'))
})

export type FormDataSchema = z.infer<typeof formValidationSchema>

export const TaxesForm = ({
  id,
  setIdEdit,
  open,
  setOpen,
  refetch,
  mutateAsync,
  showAsync,
  updateAsync
}: TaxesFormProps) => {
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
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      name: '',
      percentage: ''
    }
  })

  const completeFormProps: any = { register, handleSubmit, watch, setError, clearErrors, control, ...props }

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
          percentage: event.percentage as unknown as number
        })
      }

      if (id) {
        await updateAsync({
          id,
          name: event.name,
          percentage: event.percentage as unknown as number
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

  const showTax = useCallback(async () => {
    try {
      const tax = await showAsync({ id: id as number })
      setValue('name', tax.name)
      setValue('percentage', (tax.percentage * 100).toString())
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
      showTax()
    } else {
      setIdEdit(undefined)
    }
  }, [id, reset, showTax, setIdEdit])

  return (
    <div className="flex flex-row place-content-center">
      <Dialog open={open} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader className="gap-2">
            <DialogTitle>Cadastro de imposto</DialogTitle>
            <DialogDescription>
              💸 Cadastre seus impostos e personalize suas categorias de produto.
            </DialogDescription>
          </DialogHeader>
          <Form {...completeFormProps}>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <TaxesFormContent
                register={register}
                control={control}
                errors={errors}
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
