import { cn } from '@/lib/utils'
import { ChevronsUpDown, Check } from 'lucide-react'
import React, { forwardRef } from 'react'
import { Control, FieldError } from 'react-hook-form'

import {
  Label,
  Command,
  Button,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandEmpty,
  Popover,
  PopoverContent,
  PopoverTrigger,
  FormField,
  FormItem,
  FormControl,
  ScrollArea
} from '@/components/shadcn/ui'

type InfiniteComboboxProps = {
  errors?: FieldError
  label?: string
  className?: string
  buttonClassName?: string
  id: string
  options: any[]
  required?: boolean
  fieldLabel: string
  disabled?: boolean
  fieldValue: string
  control?: Control<any, any>,
  placeholder: string
} & React.ComponentProps<typeof Popover>

const Combobox = forwardRef<HTMLInputElement, InfiniteComboboxProps>(
  (
    {
      className,
      buttonClassName,
      errors,
      required,
      label,
      disabled,
      id,
      options,
      fieldLabel,
      fieldValue,
      control,
      placeholder
    }
  ) => {
    return (
      <>
        <Label htmlFor={id} className={cn('text-gray-500 mt-2 mb-1', { 'text-red-500': errors?.message })}>
          {label}
          {required ? '*' : ''}
        </Label>
        <FormField
          control={control}
          name={id}
          render={({ field }) => (
            <FormItem className={cn('flex flex-col', className)}>
              <Popover>
                <div className="gap-0 grid">
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        disabled={disabled}
                        className={(cn('justify-between', !field.value && 'text-muted-foreground', buttonClassName))}
                      >
                        {field.value
                          ? options.find((item: any) => item[fieldValue] === field.value)?.[fieldLabel]
                          : placeholder}
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className={`w-[450px] p-0`}>
                    <Command>
                      <CommandInput placeholder="Pesquisar..." />
                      <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                      <ScrollArea className="h-60 w-49 rounded-md">
                        <CommandGroup>
                          {options.map((item: any) => (
                            <CommandItem key={item[fieldValue]} value={item[fieldValue]} onSelect={() => field.onChange(item[fieldValue])}>
                              <Check
                                className={cn(
                                  'mr-2 size-4',
                                  item[fieldValue] === field.value ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                              {item[fieldLabel]}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </ScrollArea>
                    </Command>
                  </PopoverContent>
                </div>
              </Popover>
            </FormItem>
          )}
        />
        {errors?.message && <span className={cn('text-xs text-red-500', className)}>{errors.message}</span>}
      </>
    )
  }
)

Combobox.displayName = 'Combobox'

export { Combobox }
