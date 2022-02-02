/* eslint-disable @typescript-eslint/no-empty-function */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useUpdateEffect } from '@chakra-ui/react'

import { MakeActionModal, MakeActionModalProps } from '../../components/modals'
import { useProjectItemsModals, useProjectModals } from '../../hooks'
import {
  ProjectDecisionActions,
  ProjectItemDecisionActions,
  selectDecisionAction,
  setDecisionAction
} from '../../redux/slices'

type Sets = 'project' | 'project_item'

const initialState = {
  actionButtonText: '',
  headerText: '',
  isOpen: false,
  onAction: async () => {}
}

export const ModalsController = () => {
  const [currentModalProps, setCurrentModalsProps] = useState<
    Omit<MakeActionModalProps, 'onClose'>
  >(() => initialState)
  const appDispatch = useDispatch()

  const decisionAction = useSelector(selectDecisionAction)

  const [createProjectModal] = useProjectModals()
  const [createProjectItemModal] = useProjectItemsModals()

  useUpdateEffect(() => {
    const { id, type, defaultValues } = decisionAction

    if (type === 'no-action') {
      setCurrentModalsProps(initialState)
      return undefined
    }

    const [set] = decisionAction.type.split('.') as [Sets]

    const sets = {
      project: () => {
        return createProjectModal({
          id,
          type: type as ProjectDecisionActions,
          defaultValues
        })
      },
      project_item: () => {
        return createProjectItemModal({
          id,
          type: type as ProjectItemDecisionActions,
          defaultValues
        })
      }
    }

    setCurrentModalsProps(sets[set]())
  }, [decisionAction, createProjectModal, createProjectItemModal])

  const onClose = () =>
    appDispatch(
      setDecisionAction({
        id: null,
        isOpen: false,
        type: 'no-action'
      })
    )

  return (
    <>
      <MakeActionModal {...currentModalProps} onClose={onClose} />
    </>
  )
}
