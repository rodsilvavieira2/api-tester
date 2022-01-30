import { useState } from 'react'

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast
} from '@chakra-ui/react'

import { useUpdateProjectItemMutation } from '../../../redux/apis'
import { DefaultContentProps, DefaultModalProps } from './shared'

type ContentProps = {
  projectItemName: string
  id: string
} & DefaultContentProps

const Content = ({ projectItemName, id, onClose }: ContentProps) => {
  const [newName, setNewName] = useState(projectItemName)

  const [updateProjectItem] = useUpdateProjectItemMutation()

  const toast = useToast()

  const onRename = async () => {
    const toastID = toast({
      title: 'Renomear item do projeto',
      description: 'Processando...',
      variant: 'left-accent',
      isClosable: false,
      status: 'info'
    })
    try {
      await updateProjectItem({ name: newName, id }).unwrap()

      toast({
        title: 'Renomear item do projeto',
        description: 'Item de projeto renomeado',
        variant: 'left-accent',
        isClosable: true,
        status: 'success'
      })

      onClose()
    } catch {
      toast({
        title: 'Renomear item do projeto',
        description: 'Desculpe, aconteceu um erro inesperado',
        variant: 'left-accent',
        isClosable: true,
        status: 'error'
      })
    } finally {
      if (toastID) toast.close(toastID)
    }
  }

  return (
    <ModalContent>
      <ModalHeader>Renomear item do projeto</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <Input
          value={newName}
          onChange={(e) => setNewName(e.currentTarget.value)}
        />
      </ModalBody>

      <ModalFooter>
        <Button onClick={onRename}>Renomear</Button>
      </ModalFooter>
    </ModalContent>
  )
}

type RenameProjectItemProps = {
  id: string
  projectItemName: string
} & DefaultModalProps

export const RenameProjectItem = ({
  id,
  isOpen,
  onClose,
  projectItemName
}: RenameProjectItemProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <Content onClose={onClose} projectItemName={projectItemName} id={id} />
    </Modal>
  )
}
