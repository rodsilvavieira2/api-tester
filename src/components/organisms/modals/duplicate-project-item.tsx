import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useToast
} from '@chakra-ui/react'

import { useCreateProjectIemMutation } from '../../../redux/apis'
import {
  selectAvailableProjects,
  selectCurrentProject
} from '../../../redux/slices'
import { DefaultContentProps, DefaultModalProps } from './shared'

type ContentProps = {
  projectItemName: string
} & DefaultContentProps

const Content = ({ projectItemName, onClose }: ContentProps) => {
  const [newProjectItemName, setNewProjectItemName] = useState(projectItemName)
  const [toProject, setToProject] = useState('')

  const [createProjectItem] = useCreateProjectIemMutation()

  const toast = useToast()

  const availableProjects = useSelector(selectAvailableProjects)
  const currentProject = useSelector(selectCurrentProject)

  const onDuplicate = async () => {
    try {
      await createProjectItem({ projectName: toProject, projectItemName: newProjectItemName }).unwrap()

      onClose()
    } catch {
      toast({
        title: 'Novo Projeto',
        description: 'Desculpe, aconteceu um erro inesperado',
        variant: 'left-accent',
        isClosable: true,
        status: 'error'
      })
    }
  }

  return (
    <ModalContent>
      <ModalHeader>Duplicar item de projeto</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <Stack>
          <FormControl>
            <FormLabel>Novo nome</FormLabel>

            <Input
              value={newProjectItemName}
              onChange={(e) => setNewProjectItemName(e.currentTarget.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Projeto para duplicar em</FormLabel>

            <Select onChange={(e) => setToProject(e.currentTarget.value)}>
              {availableProjects
                .filter((item) => item.name !== currentProject)
                .map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </Select>
          </FormControl>
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button onClick={onDuplicate}>Duplicar</Button>
      </ModalFooter>
    </ModalContent>
  )
}

type DuplicateProjectItemProps = {
  projectItemName: string
} & DefaultModalProps

export const DuplicateProjectItem = ({
  isOpen,
  onClose,
  projectItemName
}: DuplicateProjectItemProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <Content onClose={onClose} projectItemName={projectItemName} />
    </Modal>
  )
}
