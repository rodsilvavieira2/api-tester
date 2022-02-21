/* eslint-disable @typescript-eslint/no-empty-function */
import { useCallback } from 'react'

import { useToast } from '@chakra-ui/react'

import { CustomError, Obj } from '../@types'
import { MakeActionModalProps } from '../components/modals'
import {
  useCreateProjectIemMutation,
  useUpdateProjectItemMutation
} from '../redux/apis'
import { ProjectItemModalTypes } from '../redux/slices/user-macro-actions/types'
import { ProjectCodeErrors } from '../shared/errors'

type ActionParams = {
  id: string | null
  type: ProjectItemModalTypes
  defaultValues?: Obj
}

type ActionReturn = Omit<MakeActionModalProps, 'onClose'>

type UseProjectModalsItemsReturn = [(params: ActionParams) => ActionReturn]

export const useProjectItemsModals = (): UseProjectModalsItemsReturn => {
  const [createProjectItem] = useCreateProjectIemMutation()
  const [updateProjectItem] = useUpdateProjectItemMutation()

  const toast = useToast()

  const action = useCallback(
    ({ id, type, defaultValues }: ActionParams): ActionReturn => {
      const actions = {
        'project_item.create': (): ActionReturn => {
          return {
            actionButtonText: 'Criar',
            headerText: 'Criar novo item de projeto',
            isOpen: true,
            onAction: async (value: string) => {
              const toastID = toast({
                title: 'Projeto',
                description: 'processando...',
                variant: 'left-accent',
                duration: null,
                status: 'info'
              })

              try {
                if (!id) return undefined
                await createProjectItem({ name: value, projectID: id }).unwrap()

                toast({
                  title: 'Projeto',
                  description: 'Novo item projeto criado',
                  variant: 'left-accent',
                  isClosable: true,
                  status: 'success'
                })
              } catch (e) {
                const error = e as CustomError<ProjectCodeErrors>

                const code = error.data?.code

                switch (code) {
                  case 'project.name-already-exists': {
                    toast({
                      title: 'Projeto',
                      description: 'Nome de projeto em uso',
                      variant: 'left-accent',
                      isClosable: true,
                      status: 'error'
                    })
                    break
                  }

                  default: {
                    toast({
                      title: 'Projeto',
                      description: 'Desculpe, aconteceu um erro inesperado',
                      variant: 'left-accent',
                      isClosable: true,
                      status: 'error'
                    })
                  }
                }
              } finally {
                if (toastID) toast.close(toastID)
              }
            }
          }
        },
        'project_item.rename': (): ActionReturn => {
          if (!id) {
            return {
              actionButtonText: '',
              headerText: '',
              isOpen: false,
              onAction: async () => {}
            }
          }

          const { name, projectID } = defaultValues as {
            projectID: string
            name: string
          }

          return {
            actionButtonText: 'renomear',
            headerText: 'Renomar item de projeto',
            isOpen: true,
            defaultValue: name,
            onAction: async (value: string) => {
              if (!id) return undefined

              await updateProjectItem({
                name: value,
                projectID,
                projectItemID: id
              })
            }
          }
        },
        'project_item.duplicate': (): ActionReturn => {
          return {
            actionButtonText: 'renomear',
            headerText: 'Renomar projeto',
            isOpen: true,
            onAction: async () => {}
          }
        }
      }

      return actions[type]()
    },
    [createProjectItem, toast, updateProjectItem]
  )

  return [action]
}
