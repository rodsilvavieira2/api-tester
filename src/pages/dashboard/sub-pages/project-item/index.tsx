/* eslint-disable @typescript-eslint/no-empty-function */
import { useCallback } from 'react'
// import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Flex } from '@chakra-ui/react'

import {
  DashboardProjectItemSidebar,
  DashboardProjectItemRequestManager,
  DashboardProjectItemRequestView,
  DashboardLoadingContent
} from '../../../../components/organisms/dashboard'
import { useGetProjectItemDetailsQuery } from '../../../../redux/apis/project-item-details-api-slice'
import { ProjectItemNotFound } from './project-item-not-found'

type Params = {
  id: string
}

export default function ProjectItemPage () {
  const { id = '' } = useParams<Params>()

  const {
    data = { explore: [] },
    isLoading,
    currentData
  } = useGetProjectItemDetailsQuery({
    id
  })

  // const appDispatch = useDispatch()

  const onNewFolder = () => {}

  const onNewRequisition = useCallback(() => {
    console.log('new req')
  }, [])

  if (isLoading) {
    return <DashboardLoadingContent />
  }

  if (!currentData) {
    return <ProjectItemNotFound />
  }

  return (
    <Flex h="100%" p="3" bg="inherit">
      <DashboardProjectItemSidebar
        onNewFolder={onNewFolder}
        onNewRequisition={onNewRequisition}
        details={data}
      />

      <DashboardProjectItemRequestManager />

      <DashboardProjectItemRequestView />
    </Flex>
  )
}
