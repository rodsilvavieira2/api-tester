import { useRef } from 'react'

import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button
} from '@chakra-ui/react'

export type DefaultAlertDialogProps = {
  isOpen: boolean
  headerText: string
  bodyText: string
  onClose: () => void
  onAction: () => void | Promise<void>
  actionButtonText: string
}

export const DefaultAlertDialog = ({
  isOpen,
  onClose,
  bodyText,
  headerText,
  onAction,
  actionButtonText
}: DefaultAlertDialogProps) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  const onClick = () => {
    onAction()
    onClose()
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelButtonRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {headerText}
          </AlertDialogHeader>

          <AlertDialogBody>{bodyText}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelButtonRef} onClick={onClose}>
              cancelar
            </Button>
            <Button colorScheme="red" onClick={onClick} ml={3}>
              {actionButtonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
