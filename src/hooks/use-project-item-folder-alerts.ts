import { useCallback } from 'react'

import { DefaultAlertDialogProps } from '../components/alerts'
import { useDeleteProjectItemFolderMutation } from '../redux/apis'
import { ProjectItemFolderAlertsTypes, AlertData } from '../redux/slices/user-macro-actions/types'

type AlertParams = { type: ProjectItemFolderAlertsTypes } & Omit<
  AlertData,
  'type' | 'isOpen'
>

type AlertReturn = Omit<DefaultAlertDialogProps, 'onClose'>

type UseProjectItemFolderAlertsReturn = [(params: AlertParams) => AlertReturn]

export const useProjectItemFolderAlerts = (): UseProjectItemFolderAlertsReturn => {
  const [deleteProjectItemFolder] = useDeleteProjectItemFolderMutation()

  const alert = useCallback(
    ({ id, type, defaultValues }: AlertParams) => {
      const alerts = {
        'project_item_folder.delete': (): AlertReturn => {
          const { projectID, projectItemID } = defaultValues as {
            projectID: string
            projectItemID: string
          }

          return {
            headerText: 'Deletar item de projeto ?',
            bodyText: 'Essa ação não pode ser desfeita.',
            actionButtonText: 'Deletar',
            isOpen: true,
            onAction: async () => {
              if (!id) return undefined

              deleteProjectItemFolder({
                projectID,
                projectItemID,
                folderID: id
              })
            }
          }
        }
      }

      return alerts[type]()
    },
    [deleteProjectItemFolder]
  )

  return [alert]
}
