import { useCallback } from 'react'

import { DefaultAlertDialogProps } from '../components/alerts'
import { useDeleteProjectItemMutation } from '../redux/apis'
import { AlertData, ProjectItemAlertsTypes } from '../redux/slices'

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
              try {
                if (!id) return undefined

                deleteProjectItem({ projectID, projectItemID: id }).unwrap()
              } catch {}
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
