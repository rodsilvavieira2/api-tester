import { useState } from 'react'
import { useSelector } from 'react-redux'

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
import { useCreateProjectIemMutation } from '../../../redux/apis'
import { selectCurrentProject } from '../../../redux/slices'
import { ProjectItemCodeErrors } from '../../../shared/errors'
import { DefaultContentProps, DefaultModalProps } from './shared'

const Content = ({ onClose }: DefaultContentProps) => {
  const [projectItemName, setProjectItemName] = useState('')

  const [createProjectItem] = useCreateProjectIemMutation()

  const toast = useToast()

  const projectName = useSelector(selectCurrentProject)

  const onCreate = async () => {
    const toastID = toast({
      title: 'Item de projeto',
      description: 'Processando...',
      isClosable: false,
      duration: null,
      variant: 'left-accent',
      status: 'error'
    })

    try {
      await createProjectItem({ projectItemName, projectName }).unwrap()

      toast({
        title: 'Item de projeto',
        description: 'Novo item de projeto criando com sucesso',
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
              title: 'Item de projeto',
              description: 'Nome de item de projeto em uso',
              variant: 'left-accent',
              isClosable: true,
              status: 'error'
            })

            break
          }
          default: {
            toast({
              title: 'Novo Projeto',
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
      <ModalHeader>Crie um novo item para o projeto</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <Input
          value={projectItemName}
          onChange={(e) => setProjectItemName(e.currentTarget.value)}
        />
      </ModalBody>

      <ModalFooter>
        <Button onClick={onCreate}>Criar</Button>
      </ModalFooter>
    </ModalContent>
  )
}

export const CreateNewProjectItem = ({
  isOpen,
  onClose
}: DefaultModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <Content onClose={onClose} />
    </Modal>
  )
}
