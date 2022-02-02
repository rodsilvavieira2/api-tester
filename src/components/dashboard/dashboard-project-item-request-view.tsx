import { memo } from 'react'

import { Flex } from '@chakra-ui/react'

const Base = () => {
  return (
    <Flex w='35%' bg='blue' ></Flex>
  )
}

export const DashboardProjectItemRequestView = memo(Base)
