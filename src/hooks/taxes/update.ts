import { RemoteTaxUpdate } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { TaxUpdate } from '@/interfaces'

export function TaxUpdateRequest(input: TaxUpdate.Params) {
  const remoteTaxUpdate = new RemoteTaxUpdate()

  return remoteTaxUpdate.show(input)
}

export const useTaxUpdate = () => {
  return useMutation({
    mutationFn: TaxUpdateRequest
  })
}
