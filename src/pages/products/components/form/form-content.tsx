import { Input, InputCurrency, InputMultipleSelect } from '@/components/form'
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormDataSchema } from '@/pages/products/components/form/form.tsx'
import { ListTypes } from '@/interfaces'

type ProductFormProps = {
  errors: FieldErrors<FormDataSchema>
  register: UseFormRegister<FormDataSchema>
  control: Control<FormDataSchema>
  listTypes: ListTypes.Result
}

export const ProductFormContent = ({ errors, register, control, listTypes }: ProductFormProps) => {
  const typesOptions = listTypes.map((type) => ({
    label: type.name,
    value: type.id
  }))

  return (
    <div className="grid grid-rows-1 gap-2">
      <div className="grid  grid-cols-2 gap-2">
        <div>
          <Input
            label={'Nome'}
            placeholder={'Nome do produto'}
            errors={errors.name}
            required={true}
            {...register('name')}
          />
        </div>
        <div>
          <InputCurrency
            label={'Preço'}
            name={'price'}
            placeholder={'Preço do produto'}
            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
            fixedDecimalLength={2}
            errors={errors.price}
            required={true}
            control={control}
          />
        </div>
      </div>
      <div>
        <div {...register('types')}>
          <InputMultipleSelect
            id="types"
            options={typesOptions ?? []}
            control={control as never}
            placeholder="Selecione as categorias"
            label="Categorias*"
            errors={errors.types as never}
          />
        </div>
      </div>
    </div>
  )
}
