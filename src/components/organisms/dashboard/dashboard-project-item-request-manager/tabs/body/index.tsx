import { Box, HStack } from '@chakra-ui/react'

import { Multipart } from './contents'
import { MenuCurrentContent } from './menu-current-content'

export const BodyTab = () => {
  return (
    <Box>
      <HStack>
        <MenuCurrentContent />
      </HStack>

      <Box mt="3">
        <Multipart />
      </Box>
    </Box>
  )
}
