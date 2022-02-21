
import { Flex } from '@chakra-ui/react'

import {
  DashboardProjectItemSidebar,
  DashboardProjectItemRequestManager,
  DashboardProjectItemRequestView
} from '../../../../components/dashboard'

export default function ProjectItemsPage () {
  return (
    <Flex h="100%" p="3" bg="inherit">
      <DashboardProjectItemSidebar
      />

      <DashboardProjectItemRequestManager />

      <DashboardProjectItemRequestView />
    </Flex>
  )
}
