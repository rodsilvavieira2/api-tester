/* eslint-disable @typescript-eslint/no-empty-function */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useUpdateEffect } from '@chakra-ui/react'

import { MakeActionModal, MakeActionModalProps } from '../../components/modals'
import {
  useProjectItemFolderModals,
  useProjectItemsModals,
  useProjectModals
} from '../../hooks'
import { selectModalData, setModalData } from '../../redux/slices'
import { ProjectItemFolderModalTypes, ProjectItemModalTypes, ProjectModalTypes } from '../../redux/slices/user-macro-actions/types'

type Sets = 'project' | 'project_item' | 'project_item_folder'

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

  const modalData = useSelector(selectModalData)

  const [createProjectModal] = useProjectModals()
  const [createProjectItemModal] = useProjectItemsModals()
  const [createProjectItemFolderModal] = useProjectItemFolderModals()

  useUpdateEffect(() => {
    const { id, type, defaultValues } = modalData
    console.log(modalData)

    if (type === 'no-action') {
      setCurrentModalsProps(initialState)
      return undefined
    }

    const [set] = modalData.type.split('.') as [Sets]

    const sets = {
      project: () => {
        return createProjectModal({
          id,
          type: type as ProjectModalTypes,
          defaultValues
        })
      },
      project_item: () => {
        return createProjectItemModal({
          id,
          type: type as ProjectItemModalTypes,
          defaultValues
        })
      },
      project_item_folder: () => {
        return createProjectItemFolderModal({
          id,
          type: type as ProjectItemFolderModalTypes,
          defaultValues
        })
      }
    }

    setCurrentModalsProps(sets[set]())
  }, [modalData, createProjectModal, createProjectItemModal])

  const onClose = () =>
    appDispatch(
      setModalData({
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
