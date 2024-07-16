import { useQuery } from '@tanstack/react-query'
import { RemoteListSales } from '@/services'

export const useListSales = () => {
  const remoteListSales = new RemoteListSales()

  return useQuery({
    queryKey: ['sales'],
    queryFn: remoteListSales.list,
    refetchOnWindowFocus: "always"
  })
}
