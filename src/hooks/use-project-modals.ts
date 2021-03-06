/* eslint-disable @typescript-eslint/no-empty-function */
import { useCallback } from 'react'

import { useToast } from '@chakra-ui/react'

import { CustomError, Obj } from '../@types'
import { MakeActionModalProps } from '../components/modals'
import {
  useCreateProjectMutation,
  useUpdateProjectMutation
} from '../redux/apis/project-api-slice'
import { ProjectModalTypes } from '../redux/slices/user-macro-actions/types'
import { ProjectCodeErrors } from '../shared/errors'

type ActionParams = {
  id: string | null
  type: ProjectModalTypes
  defaultValues?: Obj
}

type ActionReturn = Omit<MakeActionModalProps, 'onClose'>

type UseProjectModalsReturn = [(params: ActionParams) => ActionReturn]

export const useProjectModals = (): UseProjectModalsReturn => {
  const [createProject] = useCreateProjectMutation()
  const [updateProject] = useUpdateProjectMutation()

  const toast = useToast()

  const action = useCallback(
    ({ id, type, defaultValues }: ActionParams): ActionReturn => {
      const actions = {
        'project.create': (): ActionReturn => {
          return {
            actionButtonText: 'criar',
            headerText: 'Criar novo projeto',
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
                await createProject({ name: value }).unwrap()

                toast({
                  title: 'Projeto',
                  description: 'Novo projeto criado',
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
        'project.rename': (): ActionReturn => {
          if (!id) {
            return {
              actionButtonText: '',
              headerText: '',
              isOpen: false,
              onAction: async () => {}
            }
          }

          return {
            actionButtonText: 'renomear',
            headerText: 'Renomar projeto',
            isOpen: true,
            defaultValue: defaultValues ? defaultValues.name as string : '',
            onAction: async (value: string) => {
              updateProject({ id, name: value })
            }
          }
        }
      }

      return actions[type]()
    },
    [createProject, toast, updateProject]
  )

  return [action]
}
