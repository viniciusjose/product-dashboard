import { Label as ShadcnLabel, Textarea as ShadcnTextarea } from '@/components/shadcn/ui'
import React, { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'
import { clsx } from 'clsx'

interface TextareaProps extends React.ComponentProps<typeof ShadcnTextarea> {
  errors?: FieldError
  placeholder?: string
  isLoading?: boolean
  label?: string
  className?: string
  name?: string
  required?: boolean
  labelDisabled?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, errors, placeholder, isLoading, label, required, labelDisabled = false, ...props }, ref) => {
    return (
      <>
        {!labelDisabled && (
          <ShadcnLabel
            htmlFor={placeholder}
            className={clsx('text-gray-500 mt-2 mb-1', { 'text-red-500': errors?.message })}
          >
            {label}
            {required ? '*' : ''}
          </ShadcnLabel>
        )}
        <ShadcnTextarea
          ref={ref}
          placeholder={placeholder}
          disabled={isLoading}
          className={clsx('dark:bg-secondary', className, {
            'border-red-500': errors?.message
          })}
          {...props}
        />
        {errors?.message && <span className={clsx('text-xs text-red-500', className)}>{errors.message as string}</span>}
      </>
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
