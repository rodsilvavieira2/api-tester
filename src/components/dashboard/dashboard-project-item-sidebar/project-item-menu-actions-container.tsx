import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { setModalData } from '../../../redux/slices'
import { ProjectItemMenuActions } from './project-item-menu-actions'

type Params = {
  projectID: string
  projectItemID: string
}

export const ProjectItemMenuActionsContainer = () => {
  const { projectID, projectItemID } = useParams<Params>()

  const appDispatch = useDispatch()

  const onNewFolder = useCallback(() => {
    appDispatch(
      setModalData({
        defaultValues: {
          projectID,
          projectItemID
        },
        type: 'project_item_folder.create'
      })
    )
  }, [appDispatch, projectID, projectItemID])

  const onNewRequest = useCallback(() => {
    console.log('new req')
  }, [])

  return (
    <ProjectItemMenuActions
      onNewFolder={onNewFolder}
      onNewRequest={onNewRequest}
    />
  )
}
