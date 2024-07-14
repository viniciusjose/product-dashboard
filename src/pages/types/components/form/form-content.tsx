import { Input, InputMultipleSelect, Textarea } from '@/components/form'
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormDataSchema } from '@/pages/types/components/form/form.tsx'
import { ListTaxes } from '@/interfaces'

type TypesFormProps = {
  errors: FieldErrors<FormDataSchema>
  register: UseFormRegister<FormDataSchema>
  control: Control<FormDataSchema>
  listTaxes: ListTaxes.Result
}

export const TypesFormContent = ({ errors, register, control, listTaxes }: TypesFormProps) => {
  const taxesOptions = listTaxes.map((tax) => ({
    label: `${tax.name} - ${tax.percentage * 100}%`,
    value: tax.id
  }))

  return (
    <div className="grid  grid-row-2 gap-2">
      <div>
        <Input
          label={'Nome'}
          placeholder={'Nome da categoria'}
          errors={errors.name}
          required={true}
          {...register('name')}
        />
      </div>
      <div>
        <div {...register('taxes')}>
          <InputMultipleSelect
            id="taxes"
            options={taxesOptions ?? []}
            control={control as never}
            placeholder="Selecione os impostos"
            label="Impostos"
            errors={errors.taxes as never}
          />
        </div>
      </div>
      <div>
        <Textarea
          label="Descrição"
          placeholder="Digite a descrição da categoria"
          errors={errors.description}
          {...register('description')}
        />
      </div>
    </div>
  )
}
