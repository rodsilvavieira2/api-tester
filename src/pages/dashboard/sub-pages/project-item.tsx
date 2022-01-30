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

  const { data = { explore: [] }, isLoading } =
    useGetProjectItemDetailsQuery({ id })

  const appDispatch = useDispatch()

  const onNewFolder = useCallback(() => {
    appDispatch(setNewProjectItemFolderInfo({ id, isOpen: true }))
  }, [appDispatch, id])

  const onNewRequisition = useCallback(() => {
    console.log('new req')
  }, [])

  return (
    <Flex h="100%" p='3' bg='inherit' >
      <DashboardProjectItemSidebar
        onNewFolder={onNewFolder}
        onNewRequisition={onNewRequisition}
        details={data}
        isLoading={isLoading}
      />

      <DashboardProjectItemRequestManager />

      <DashboardProjectItemRequestView />
    </Flex>
  )
}
