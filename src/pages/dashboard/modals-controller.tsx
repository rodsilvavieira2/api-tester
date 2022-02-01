/* eslint-disable @typescript-eslint/no-empty-function */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useUpdateEffect } from '@chakra-ui/react'

import { MakeActionModal, MakeActionModalProps } from '../../components/organisms/modals'
import { useProjectDecisionActions } from '../../hooks'
import { ProjectDecisionActions, selectDecisionAction, setDecisionAction } from '../../redux/slices'

type Sets = 'project'

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

  const [projectActions] = useProjectDecisionActions()

  useUpdateEffect(() => {
    const { id, type, defaultValues } = decisionAction

    if (type === 'no-action') {
      setCurrentModalsProps(initialState)
      return undefined
    }

    const [set] = decisionAction.type.split('.') as [Sets]

    const sets = {
      project: () => {
        return projectActions({
          id,
          type: type as ProjectDecisionActions,
          defaultValues
        })
      }
    }

    setCurrentModalsProps(sets[set]())
  }, [decisionAction, projectActions])

  const onClose = () => appDispatch(setDecisionAction({
    id: null,
    isOpen: false,
    type: 'no-action'
  }))

  return (
    <>
      <MakeActionModal {...currentModalProps} onClose={onClose} />
    </>
  )
}
