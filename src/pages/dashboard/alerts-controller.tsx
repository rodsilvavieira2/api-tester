/* eslint-disable @typescript-eslint/no-empty-function */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useUpdateEffect } from '@chakra-ui/react'

import { DefaultAlertDialog, DefaultAlertDialogProps } from '../../components/alerts'
import { useProjectAlerts, useProjectItemAlerts } from '../../hooks'
import {
  ProjectAlertsTypes,
  ProjectItemAlertsTypes,
  selectAlertData,
  setAlertData
} from '../../redux/slices'

type Sets = 'project' | 'project_item'

type InitialState = Omit<DefaultAlertDialogProps, 'onClose'>

const initialState: InitialState = {
  actionButtonText: '',
  bodyText: '',
  headerText: '',
  isOpen: false,
  onAction: () => {}
}

export const AlertsController = () => {
  const [currentAlertProps, setCurrentAlertProps] = useState<InitialState>(
    () => initialState
  )
  const appDispatch = useDispatch()

  const alertData = useSelector(selectAlertData)

  const [createProjectAlert] = useProjectAlerts()
  const [createProjectItemAlert] = useProjectItemAlerts()

  useUpdateEffect(() => {
    const { id, type, defaultValues } = alertData

    if (type === 'no-action') {
      setCurrentAlertProps(initialState)
      return undefined
    }

    const [set] = alertData.type.split('.') as [Sets]

    const sets = {
      project: () => {
        return createProjectAlert({
          id,
          type: type as ProjectAlertsTypes,
          defaultValues
        })
      },
      project_item: () => {
        return createProjectItemAlert({
          id,
          type: type as ProjectItemAlertsTypes,
          defaultValues
        })
      }
    }

    setCurrentAlertProps(sets[set]())
  }, [createProjectAlert, alertData, createProjectItemAlert])

  const onClose = () =>
    appDispatch(
      setAlertData({
        isOpen: false,
        type: 'no-action'
      })
    )

  return (
    <>
      <DefaultAlertDialog {...currentAlertProps} onClose={onClose} />
    </>
  )
}
