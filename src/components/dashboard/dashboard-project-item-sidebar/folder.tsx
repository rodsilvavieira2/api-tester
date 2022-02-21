import { useState } from 'react'
import { FaFolderMinus, FaFolderOpen } from 'react-icons/fa'

import {
  Box,
  Collapse,
  HStack,
  Icon,
  Text,
  Flex,
  Stack
} from '@chakra-ui/react'

import { FolderMenuActionsContainer } from './folder-menu-actions-container'

type FolderProps = {
  id: string
  name: string
  children: JSX.Element | JSX.Element[]
}

export const Folder = ({ name, children, id }: FolderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const onToggleFolder = () => setIsOpen((prev) => !prev)

  return (
    <Box>
      <Flex className="">
        <HStack as="button" flex={1} cursor="pointer" onClick={onToggleFolder}>
          <Icon fontSize="1.1rem" as={isOpen ? FaFolderOpen : FaFolderMinus} />

          <Text
            maxW="20ch"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {name}
          </Text>
        </HStack>

        <FolderMenuActionsContainer folderID={id} />
      </Flex>

      <Collapse
        in={isOpen}
        animateOpacity
        style={{
          padding: '0 0.5rem'
        }}
      >
        <Stack>{children}</Stack>
      </Collapse>
    </Box>
  )
}
