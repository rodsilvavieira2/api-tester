import { memo } from 'react'

import {
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react'

import { BodyTab } from './tabs'
import { UrlManager } from './url-manager'

const Base = () => {
  return (
    <Stack spacing={3} w="45%" p="3" bg="white">
      <UrlManager />

      <Tabs>
        <TabList>
          <Tab>Body</Tab>

          <Tab>Auth</Tab>

          <Tab>Query</Tab>

          <Tab>Header</Tab>

          <Tab>Docs</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <BodyTab />
          </TabPanel>

          <TabPanel>2</TabPanel>

          <TabPanel>3</TabPanel>

          <TabPanel>4</TabPanel>

          <TabPanel>5</TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}

export const DashboardProjectItemRequestManager = memo(Base)
