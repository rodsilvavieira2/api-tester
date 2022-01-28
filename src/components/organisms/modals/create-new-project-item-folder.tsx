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

import { CustomError } from '../../../@types'
import { useNewProjectItemFolderMutation } from '../../../redux/apis/project-item-details-api-slice'
import { ProjectItemCodeErrors } from '../../../shared/errors'
import { DefaultContentProps, DefaultModalProps } from './shared'

type ContentProps = {
  id: string
} & DefaultContentProps

const Content = ({ onClose, id }:ContentProps) => {
  const [projectItemNameFolder, setProjectItemNameFolder] = useState('')

  const [createProjectItemFolder] = useNewProjectItemFolderMutation()

  const toast = useToast()

  const onCreate = async () => {
    const toastID = toast({
      title: 'Nova pasta',
      description: 'Processando...',
      isClosable: false,
      duration: null,
      variant: 'left-accent',
      status: 'error'
    })

    try {
      await createProjectItemFolder({ id, name: projectItemNameFolder }).unwrap()

      toast({
        title: 'Nova pasta',
        description: 'Novo pasta criada com sucesso',
        isClosable: true,
        variant: 'left-accent',
        status: 'success'
      })

      onClose()
    } catch (e) {
      const error = e as CustomError<ProjectItemCodeErrors>

      const code = error.data?.code

      if (code) {
        switch (code) {
          case 'project-item.name-already-exists': {
            toast({
              title: 'Nova pasta',
              description: 'Nome pasta em uso',
              variant: 'left-accent',
              isClosable: true,
              status: 'error'
            })

            break
          }
          default: {
            toast({
              title: 'Nova pasta',
              description: 'Desculpe, aconteceu um erro inesperado',
              variant: 'left-accent',
              isClosable: true,
              status: 'error'
            })
          }
        }
      }
    } finally {
      if (toastID) toast.close(toastID)
    }
  }

  return (
    <ModalContent>
      <ModalHeader>Nova pasta</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <Input
          value={projectItemNameFolder}
          onChange={(e) => setProjectItemNameFolder(e.currentTarget.value)}
        />
      </ModalBody>

      <ModalFooter>
        <Button onClick={onCreate}>Criar</Button>
      </ModalFooter>
    </ModalContent>
  )
}

type CreateNewProjectItemFolderParams = {
  id: string
} & DefaultModalProps

export const CreateNewProjectItemFolder = ({
  isOpen,
  onClose,
  id
}: CreateNewProjectItemFolderParams) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <Content id={id} onClose={onClose} />
    </Modal>
  )
}
