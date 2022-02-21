/* eslint-disable @typescript-eslint/no-empty-function */
import { useCallback } from 'react'

import { useToast } from '@chakra-ui/react'

import { Obj } from '../@types'
import { MakeActionModalProps } from '../components/modals'
import { useNewProjectItemFolderMutation } from '../redux/apis'
import { ProjectItemFolderModalTypes } from '../redux/slices/user-macro-actions/types'

type ActionParams = {
  id: string | null
  type: ProjectItemFolderModalTypes
  defaultValues?: Obj
}

type ActionReturn = Omit<MakeActionModalProps, 'onClose'>

type UseProjectItemFolderModalReturn = [(params: ActionParams) => ActionReturn]

export const useProjectItemFolderModals =
  (): UseProjectItemFolderModalReturn => {
    const [createFolder] = useNewProjectItemFolderMutation()

    const toast = useToast()

    const action = useCallback(
      ({ id, type, defaultValues }: ActionParams): ActionReturn => {
        const actions = {
          'project_item_folder.create': (): ActionReturn => {
            return {
              actionButtonText: 'Criar',
              headerText: 'Criar nova pasta.',
              isOpen: true,
              onAction: async (value: string) => {
                const { projectID, projectItemID } = defaultValues as {
                  projectID: string
                  projectItemID: string
                }

                await createFolder({
                  name: value,
                  projectItemID,
                  projectID
                })
              }
            }
          },
          'project_item_folder.rename': (): ActionReturn => {
            if (!id) {
              return {
                actionButtonText: '',
                headerText: '',
                isOpen: false,
                onAction: async () => {}
              }
            }

            const { name } = defaultValues as {
              projectID: string
              name: string
            }

            return {
              actionButtonText: 'renomear',
              headerText: 'Renomar item de projeto',
              isOpen: true,
              defaultValue: name,
              onAction: async () => {}
            }
          },
          'project_item_folder.duplicate': (): ActionReturn => {
            return {
              actionButtonText: 'renomear',
              headerText: 'Renomar projeto',
              isOpen: true,
              onAction: async () => {}
            }
          },
          'project_item_folder.delete': (): ActionReturn => {
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
      [createFolder]
    )

    return [action]
  }
