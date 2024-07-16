import { Input, Textarea } from '@/components/form'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormDataSchema } from '@/pages/sales/components/form'

type ProductFormProps = {
  errors: FieldErrors<FormDataSchema>
  register: UseFormRegister<FormDataSchema>
}

export const SalesFormContent = ({ errors, register }: ProductFormProps) => {
  return (
    <div className="grid grid-rows-1 gap-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Input
            label={'Nome do cliente'}
            placeholder={'Nome completo'}
            errors={errors.customer}
            required={true}
            {...register('customer')}
          />
        </div>
        <div>
          <Input
            label={'E-mail'}
            placeholder={'E-mail do cliente'}
            errors={errors.email}
            required={true}
            {...register('email')}
          />
        </div>

      </div>
      <div className="grid grid-cols-4 gap-2">
        <div>
          <Input
            label={'CEP'}
            placeholder={'099950-599'}
            errors={errors.zip_code}
            required={true}
            {...register('zip_code')}
          />
        </div>
        <div className="col-span-2">
          <Input
            label={'Endereço'}
            placeholder={'Endereço completo'}
            errors={errors.address}
            required={true}
            {...register('address')}
          />
        </div>
        <div>
          <Input
            label={'Número'}
            placeholder={'Número'}
            errors={errors.address_number}
            required={true}
            {...register('address_number')}
          />
        </div>
      </div>
      <div>
        <Textarea
          label={'Descrição'}
          placeholder={'Descrição resumida da venda'}
          errors={errors.description}
          required={false}
          {...register('description')}
        />
      </div>
    </div>
  )
}
