import { useQuery } from '@tanstack/react-query'
import { RemoteListTypes } from '@/services'

export const useListTypes = () => {
  const remoteListTypes = new RemoteListTypes()

  return useQuery({
    queryKey: ['types'],
    queryFn: remoteListTypes.list,
    refetchOnWindowFocus: "always"
  })
}
