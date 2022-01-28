import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Flex } from '@chakra-ui/react'

import {
  DashboardProjectItemSidebar,
  DashboardProjectItemRequestManager,
  DashboardProjectItemRequestView
} from '../../../components/organisms/dashboard'
import { useGetProjectItemDetailsQuery } from '../../../redux/apis/project-item-details-api-slice'
import { setNewProjectItemFolderInfo } from '../../../redux/slices'

type Params = {
  id: string
}

export default function ProjectItemPage () {
  const { id = '' } = useParams<Params>()

  const { data = { requests: { alone: [], folders: [] } }, isLoading } =
    useGetProjectItemDetailsQuery({ id })

  const appDispatch = useDispatch()

  const onNewFolder = useCallback(() => {
    appDispatch(setNewProjectItemFolderInfo({ id, isOpen: true }))
  }, [appDispatch, id])

  const onNewRequisition = useCallback(() => {
    console.log('new req')
  }, [])

  return (
    <Flex h="100%">
      <DashboardProjectItemSidebar
        onNewFolder={onNewFolder}
        onNewRequisition={onNewRequisition}
        folderTree={data.requests}
        isLoading={isLoading}
      />

      <DashboardProjectItemRequestManager />

      <DashboardProjectItemRequestView />
    </Flex>
  )
}
