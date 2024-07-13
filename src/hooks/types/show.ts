import { RemoteTypeShow } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { TypeShow } from '@/interfaces'

export function TypeShowRequest({ id }: TypeShow.Params) {
  const remoteTypeShow = new RemoteTypeShow()

  return remoteTypeShow.show({ id })
}

export const useTypeShow = () => {
  return useMutation({
    mutationFn: TypeShowRequest
  })
}
