import { RemoteTaxDestroy } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { TaxDestroy } from '@/interfaces'

export function TaxDestroyRequest(input: TaxDestroy.Params) {
  const remoteTaxDestroy = new RemoteTaxDestroy()

  return remoteTaxDestroy.destroy(input)
}

export const useTaxDestroy = () => {
  return useMutation({
    mutationFn: TaxDestroyRequest
  })
}
