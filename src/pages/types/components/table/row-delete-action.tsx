import { AlertCircleIcon, CircleOff } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  DropdownMenuItem
} from '@/components/shadcn/ui'

type RowDestroyActionProps = {
  onDestroy: (id: number) => void
  id: number
}
export const RowDestroyAction = ({ onDestroy, id }: RowDestroyActionProps) => {
  return (
    <DropdownMenuItem asChild>
       <AlertDialog>
         <AlertDialogTrigger
          className="relative flex cursor-pointer w-full select-none hover:bg-accent items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50}"
         >
           <CircleOff className="mr-2 h-3.5 w-3.5 text-red-500" />
           <p className="text-red-500">Deletar</p>
         </AlertDialogTrigger>
         <AlertDialogContent>
           <AlertDialogHeader>
             <AlertDialogTitle className="flex flex-row gap-2 items-center">
               <AlertCircleIcon className="text-red-500 " />
               A remoção é irreversível, deseja continuar?
             </AlertDialogTitle>
             <AlertDialogDescription>
               A remoção desta categoria removerá todos os registros associados a ele.
             </AlertDialogDescription>
           </AlertDialogHeader>
           <AlertDialogFooter>
             <AlertDialogCancel>
               Cancelar
             </AlertDialogCancel>
             <AlertDialogAction  asChild>
               <button className="bg-red-500" onClick={() => onDestroy(id)}>Deletar</button>
             </AlertDialogAction>
           </AlertDialogFooter>
         </AlertDialogContent>
       </AlertDialog>
    </DropdownMenuItem>
  )
}
