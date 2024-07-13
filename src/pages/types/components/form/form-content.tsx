import { Input, Textarea } from '@/components/form'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormDataSchema } from '@/pages/types/components/form/form.tsx'

type TypesFormProps = {
  errors?: FieldErrors<FormDataSchema>
  register: UseFormRegister<FormDataSchema>
}

export const TypesFormContent = ({ errors, register }: TypesFormProps) => {
  return (
    <div className="grid  grid-row-2 gap-2">
      <div>
        <Input
          label={'Nome'}
          placeholder={'Nome da categoria'}
          errors={errors?.name}
          required={true}
          {...register('name')}
        />
      </div>

      <div>
        <Textarea
          label="Descrição"
          placeholder="Digite a descrição da categoria"
          errors={errors?.description}
          {...register('description')}
        />
      </div>
    </div>
  )
}
