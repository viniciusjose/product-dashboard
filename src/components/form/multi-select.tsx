import React, { forwardRef } from 'react'
import { Control, FieldError } from 'react-hook-form'
import {
  Label,
  Popover,
  FormField,
  Command,
  CommandInput,
  CommandList, CommandEmpty, CommandGroup, CommandItem, Checkbox
} from '@/components/shadcn/ui'
import { cn } from '@/lib'

type InputMultipleSelectProps = {
  errors?: FieldError
  label?: string
  className?: string
  id: string
  options: Array<{
    label: number | string
    value: number | string
  }> | []
  control: Control<never>
  placeholder: string
} & React.ComponentProps<typeof Popover>

const InputMultipleSelect = forwardRef<HTMLInputElement, InputMultipleSelectProps>(
  (
    {
      className,
      errors,
      id,
      label,
      options,
      control,
      placeholder
    }
  ) => {

    return (
      <>
        <FormField
          control={control}
          name={id}
          render={({ field }) => (
        <div>
          <Label className="text-gray-500 mt-2 mb-1">{label}</Label>
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>{placeholder}</CommandEmpty>
              <CommandGroup>
                <CommandItem>
                  <Checkbox
                    className="mr-2"
                    checked={field.value?.length === options.length}
                    onCheckedChange={(checked) => {
                      return checked
                        ? field.onChange(
                          options.map(({ value }) => ({ id: value}))
                        )
                        : field.onChange([])
                    }}
                  />
                  Marcar todos
                </CommandItem>
                {options && options.map((option) => {
                  return (
                    <CommandItem key={option.value}>
                      <Checkbox
                        className="mr-2"
                        id={`checkbox-event-${option.value}`}
                        checked={!!field.value?.find(({ id }: any) => id === option.value) ?? false}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, { id: option.value }])
                            : field.onChange(field.value?.filter(({ id }: never) => id !== option.value))
                        }}
                      />
                      <Label htmlFor={`checkbox-event-${option.value}`}>{option.label}</Label>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
          )}
        />
        {errors?.message && <span className={cn('text-xs text-red-500', className)}>{errors.message}</span>}
      </>
    )
  }
)

InputMultipleSelect.displayName = 'InputMultipleSelect'

export { InputMultipleSelect }
