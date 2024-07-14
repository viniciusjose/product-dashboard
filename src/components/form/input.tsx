import {
  Label as ShadcnLabel,
  Input as ShadcnInput
} from "@/components/shadcn/ui"
import React, { forwardRef } from "react"
import { FieldError } from "react-hook-form"
import { cn } from '@/lib'

interface InputProps extends React.ComponentProps<typeof ShadcnInput> {
  errors?: FieldError
  placeholder?: string
  isLoading?: boolean
  label?: string
  labelDisabled?: boolean
  className?: string
  name?: string
  required?: boolean
  disabled?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>((
  { className, errors, placeholder, isLoading, label, labelDisabled, required, disabled, ...props },
  ref) => {
  return (
    <>
      {!labelDisabled && (
        <ShadcnLabel
          htmlFor={placeholder}
          className={cn("text-gray-500 mt-2 mb-1", { "text-red-500": errors?.message })}
        >
          {label}
          {required ? "*" : ""}
        </ShadcnLabel>
      )}
      <ShadcnInput
        ref={ref}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect="off"
        disabled={isLoading || disabled}
        className={cn("dark:bg-secondary", className, {
          "border-red-500": errors?.message,
        })}
        {...props}
      />
      {errors?.message && <span className={"text-xs text-red-500"}>{errors.message as string}</span>}
    </>
  );
})

Input.displayName = 'Input'

export { Input }
