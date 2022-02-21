import { useCallback } from 'react'

import { DefaultAlertDialogProps } from '../components/alerts'
import { useDeleteProjectMutation } from '../redux/apis'
import { ProjectAlertsTypes, AlertData } from '../redux/slices/user-macro-actions/types'

type AlertParams = { type: ProjectAlertsTypes } & Omit<
  AlertData,
  'type' | 'isOpen'
>

type AlertReturn = Omit<DefaultAlertDialogProps, 'onClose'>

type UseProjectAlertsReturn = [(params: AlertParams) => AlertReturn]

export const useProjectAlerts = (): UseProjectAlertsReturn => {
  const [deleteProject] = useDeleteProjectMutation()

  const alert = useCallback(
    ({ id, type }: AlertParams) => {
      const alerts = {
        'project.delete': (): AlertReturn => {
          return {
            headerText: 'Deletar projeto ?',
            bodyText: 'Essa ação não pode ser desfeita.',
            actionButtonText: 'Deletar',
            isOpen: true,
            onAction: async () => {
              if (!id) return undefined

              deleteProject({ id })
            }
          }
        }
      }

      return alerts[type]()
    },
    [deleteProject]
  )

  return [alert]
}
