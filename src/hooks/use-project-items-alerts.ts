import { useCallback } from 'react'

import { DefaultAlertDialogProps } from '../components/alerts'
import { useDeleteProjectItemMutation } from '../redux/apis'
import {
  ProjectItemAlertsTypes,
  AlertData
} from '../redux/slices/user-macro-actions/types'

type AlertParams = { type: ProjectItemAlertsTypes } & Omit<
  AlertData,
  'type' | 'isOpen'
>

type AlertReturn = Omit<DefaultAlertDialogProps, 'onClose'>

type UseProjectAlertsItemReturn = [(params: AlertParams) => AlertReturn]

export const useProjectItemAlerts = (): UseProjectAlertsItemReturn => {
  const [deleteProjectItem] = useDeleteProjectItemMutation()

  const alert = useCallback(
    ({ id, type, defaultValues }: AlertParams) => {
      const alerts = {
        'project_item.delete': (): AlertReturn => {
          const { projectID } = defaultValues as { projectID: string }

          return {
            headerText: 'Deletar item de projeto ?',
            bodyText: 'Essa ação não pode ser desfeita.',
            actionButtonText: 'Deletar',
            isOpen: true,
            onAction: async () => {
              if (!id) return undefined

              deleteProjectItem({ projectID, projectItemID: id })
            }
          }
        }
      }

      return alerts[type]()
    },
    [deleteProjectItem]
  )

  return [alert]
}
