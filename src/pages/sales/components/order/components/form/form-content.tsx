import { Combobox, Input } from '@/components/form'
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormDataSchema } from '@/pages/sales/components/order/components/form'
import { ListProducts } from '@/interfaces'

type AddProductsFormContent = {
  errors: FieldErrors<FormDataSchema>
  register: UseFormRegister<FormDataSchema>
  control: Control<FormDataSchema>
  listProducts: ListProducts.Result
}

export const AddProductsFormContent = ({ errors, register, control, listProducts }: AddProductsFormContent) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="col-span-3 w-full place-content-between">
        <Combobox
          {...register('product_id')}
          control={control}
          id="product_id"
          placeholder={'Selecione um produto'}
          label={'Produto'}
          required={true}
          options={listProducts}
          fieldLabel="name"
          fieldValue="id"
          errors={errors.product_id}
        />
      </div>
      <div>
        <Input
          label={'Quantidade'}
          placeholder={'Quantidade'}
          errors={errors.quantity}
          required={true}
          {...register('quantity')}
        />
      </div>
    </div>
  )
}
