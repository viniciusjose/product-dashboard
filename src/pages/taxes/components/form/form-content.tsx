import { Input } from '@/components/form'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormDataSchema } from '@/pages/taxes/components/form/form.tsx'

type TaxesFormProps = {
  errors: FieldErrors<FormDataSchema>
  register: UseFormRegister<FormDataSchema>
}

export const TaxesFormContent = ({ errors, register }: TaxesFormProps) => {
  return (
    <div className="grid  grid-cols-2 gap-2">
      <div>
        <Input
          label={'Nome'}
          placeholder={'Nome do imposto'}
          errors={errors.name}
          required={true}
          {...register('name')}
        />
      </div>
      <div>
        <Input
          label="Porcentagem"
          placeholder="Digite a porcentagem do imposto"
          errors={errors.percentage}
          {...register('percentage')}
        />
      </div>
    </div>
  )
}
