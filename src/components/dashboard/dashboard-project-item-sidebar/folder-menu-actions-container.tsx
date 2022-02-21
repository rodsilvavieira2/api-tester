import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { setAlertData } from '../../../redux/slices'
import { FolderMenuActions } from './folder-menu-actions'

type Params = {
  projectID: string
  projectItemID: string
}

type FolderMenuActionsContainerProps = {
  folderID: string
}

export const FolderMenuActionsContainer = ({ folderID }: FolderMenuActionsContainerProps) => {
  const { projectID, projectItemID } = useParams<Params>()
  const appDispatch = useDispatch()

  const onDelete = useCallback(
    () => {
      appDispatch(
        setAlertData({
          type: 'project_item_folder.delete',
          id: folderID,
          defaultValues: {
            projectID,
            projectItemID
          }
        })
      )
    },
    [appDispatch, folderID, projectID, projectItemID]
  )

  const onNewRequest = useCallback(() => {
    console.log('new request')
  }, [])

  const onDuplicate = useCallback(() => {
    console.log('duplicate')
  }, [])

  const onSettings = useCallback(() => {
    console.log('settings')
  }, [])

  return (
    <FolderMenuActions
      onDelete={onDelete}
      onDuplicate={onDuplicate}
      onNewRequest={onNewRequest}
      onSettings={onSettings}
    />
  )
}
