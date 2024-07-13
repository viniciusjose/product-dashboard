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
import { TypesFormContent } from '@/pages/types/components/form/form-content.tsx'
import { UseMutateAsyncFunction } from '@tanstack/react-query'
import { TypeShow, TypeStore, TypeUpdate } from '@/interfaces'
import { useCallback, useEffect } from 'react'

export type TypesFormProps = {
  id?: number
  setIdEdit: (id: number | undefined) => void
  open: boolean
  setOpen: (open: boolean) => void
  refetch: () => void
  mutateAsync: UseMutateAsyncFunction<TypeStore.Result, unknown, TypeStore.Params, unknown>
  showAsync: UseMutateAsyncFunction<TypeShow.Result, unknown, TypeShow.Params, unknown>
  updateAsync: UseMutateAsyncFunction<TypeUpdate.Result, unknown, TypeUpdate.Params, unknown>
}

const formValidationSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório'}).trim().min(1, 'Nome é obrigatório'),
  description: z.string().max(255, 'Descrição deve ter no máximo 255 caracteres').nullable()
})

export type FormDataSchema = z.infer<typeof formValidationSchema>

export const TypesForm = ({ id, setIdEdit, open, setOpen, refetch, mutateAsync, showAsync, updateAsync }: TypesFormProps) => {
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
    resolver: zodResolver(formValidationSchema)
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
      if (id) {
        await updateAsync({
          id,
          name: event.name,
          description: event?.description ?? undefined
        })
      }

      if (!id) {
        await mutateAsync({
          name: event.name,
          description: event?.description
        })
      }

      reset()

      closeModal(false)

      toast({
        variant: 'default',
        title: 'Sucesso!',
        description: 'A categoria foi salva com sucesso'
      })

      refetch()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado!',
        description: 'Não foi possível salvar a categoria',
        action: <ToastAction altText="Fechar">Fechar</ToastAction>
      })
    }
  }

  const showType = useCallback(async () => {
    try {
      const type = await showAsync({ id: id as number })
      setValue('name', type.name)
      setValue('description', type?.description ?? null)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Ops! Algo deu errado!',
        description: 'Não foi possível buscar a categoria',
        action: <ToastAction altText="Fechar">Fechar</ToastAction>
      })
    }
  }, [id, showAsync, setValue, toast])

  useEffect(() => {
    reset()
    if (id) {
      showType()
    } else {
      setIdEdit(undefined)
    }
  }, [id, reset, showType, setIdEdit])

  return (
    <div className="flex flex-row place-content-center">
      <Dialog open={open} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader className="gap-2">
            <DialogTitle>Cadastro de categoria</DialogTitle>
            <DialogDescription>
              🚀 Cadastre suas categorias e facilite a busca e organização de seus produtos.
            </DialogDescription>
          </DialogHeader>
          <Form {...completeFormProps}>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <TypesFormContent errors={errors} register={register}  />

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
