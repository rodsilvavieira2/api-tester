import { useState } from 'react'
import { useDispatch } from 'react-redux'

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
import { useCreateProjectMutation } from '../../../redux/apis'
import { setCurrentProject } from '../../../redux/slices'
import { ProjectCodeErrors } from '../../../shared/errors'
import { DefaultContentProps, DefaultModalProps } from './shared'

const Content = ({ onClose }: DefaultContentProps) => {
  const [projectName, setProjectName] = useState('')

  const [createProject] = useCreateProjectMutation()

  const appDispatch = useDispatch()

  const toast = useToast()

  const onCreate = async () => {
    const toastID = toast({
      title: 'Novo Projeto',
      description: 'Processando...',
      isClosable: false,
      duration: null,
      variant: 'left-accent',
      status: 'info'
    })

    try {
      await createProject({ projectName }).unwrap()

      if (toastID) toast.close(toastID)

      appDispatch(setCurrentProject(projectName))

      toast({
        title: 'Novo Projeto',
        description: 'Novo projeto criado com sucesso',
        isClosable: true,
        variant: 'left-accent',
        status: 'success'
      })

      onClose()
    } catch (e) {
      const error = e as CustomError<ProjectCodeErrors>

      const code = error.data?.code

      if (code) {
        switch (code) {
          case 'project.name-already-exists': {
            toast({
              title: 'Novo Projeto',
              description: 'Nome de projeto em uso',
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
      <ModalHeader>Crie um novo projeto</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <Input
          value={projectName}
          onChange={(e) => setProjectName(e.currentTarget.value)}
        />
      </ModalBody>

      <ModalFooter>
        <Button onClick={onCreate}>Criar</Button>
      </ModalFooter>
    </ModalContent>
  )
}

export const CreateNewProject = ({ isOpen, onClose }: DefaultModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <Content onClose={onClose} />
    </Modal>
  )
}
