import { Input, InputCurrency } from '@/components/form'
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormDataSchema } from '@/pages/taxes/components/form/form.tsx'

type TaxesFormProps = {
  errors: FieldErrors<FormDataSchema>
  register: UseFormRegister<FormDataSchema>
  control: Control<FormDataSchema>
}

export const TaxesFormContent = ({ errors, register, control }: TaxesFormProps) => {
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
        <InputCurrency
          label={'Porcentagem'}
          name={'percentage'}
          placeholder={'Digite a porcentagem do imposto'}
          errors={errors.percentage}
          intlConfig={undefined}
          suffix={' %'}
          required={true}
          control={control}
        />
      </div>
    </div>
  )
}
