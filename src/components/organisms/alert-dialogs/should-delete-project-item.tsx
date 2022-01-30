import { useRef } from 'react'

import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useToast
} from '@chakra-ui/react'

import { useDeleteProjectItemMutation } from '../../../redux/apis'
import { DefaultAlertDialogProps } from './shared'

type ShouldDeleteProjectItemProps = {
  id: string
} & DefaultAlertDialogProps

export const ShouldDeleteProjectItem = ({
  isOpen,
  onClose,
  id
}: ShouldDeleteProjectItemProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null)

  const toast = useToast()
  const [deleteProjectItem] = useDeleteProjectItemMutation()

  const onDelete = async () => {
    onClose()
    try {
      const toastID = toast({
        title: 'Deletar item de projeto',
        description: 'Processando...',
        isClosable: false,
        duration: null,
        status: 'info',
        variant: 'left-accent'
      })

      await deleteProjectItem({ id }).unwrap()

      if (toastID) toast.close(toastID)

      toast({
        title: 'Deletar item de projeto',
        description: 'Item de projeto deletado',
        isClosable: true,
        status: 'success',
        variant: 'left-accent'
      })
    } catch {
      toast({
        title: 'Deletar item de projeto',
        description: 'Algo inesperado aconteceu',
        isClosable: true,
        status: 'error',
        variant: 'left-accent'
      })
    }
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Excluir esse item de projeto?
          </AlertDialogHeader>

          <AlertDialogBody>
            Seu item de projeto será deletado, isso não pode ser desfeito.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={onDelete} ml={3}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
