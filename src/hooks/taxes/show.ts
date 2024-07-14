import { RemoteTaxShow } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { TaxShow } from '@/interfaces'

export function TaxShowRequest({ id }: TaxShow.Params) {
  const remoteTaxShow = new RemoteTaxShow()

  return remoteTaxShow.show({ id })
}

export const useTaxShow = () => {
  return useMutation({
    mutationFn: TaxShowRequest
  })
}
