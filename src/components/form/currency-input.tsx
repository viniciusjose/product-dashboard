import CurrencyInput from 'react-currency-input-field'
import { FormField, Label } from '@/components/shadcn/ui'
import { cn } from '@/lib'
import { Control, FieldError } from 'react-hook-form'

type InputCurrencyProps = {
  placeholder: string
  name: string
  label: string
  required?: boolean
  errors?: FieldError
  control: Control<any, any>
  className?: string
}
export const InputCurrency = ({ placeholder, name, label, required, errors, control, className}: InputCurrencyProps) => {
  return  (
    <div className="flex flex-col gap gap-0">
      <Label
        htmlFor={placeholder}
        className={cn('text-gray-500 mb-1 mt-1.5', { 'text-red-500': errors?.message })}
      >
        {label}
        {required ? '*' : ''}
      </Label>
      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <CurrencyInput
            placeholder={placeholder}
            value={field.value}
            onValueChange={(input) => field.onChange(input)}
            className={cn('dark:bg-secondary flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              className,
              {
              'border-red-500': errors?.message
              }
            )}
            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
            fixedDecimalLength={2}
          />
        )}
      />
      {errors?.message && (
        <span className="text-red-500 text-xs mt-1.5">{errors.message}</span>
      )}
    </div>
  )
}
