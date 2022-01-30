import {
  MdArrowDropDown,
  MdContentCopy,
  MdDelete,
  MdOutlineSettings,
  MdPushPin
} from 'react-icons/md'

import {
  Badge,
  Text,
  HStack,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider
} from '@chakra-ui/react'

import { ExplorerTreeNode } from '../../../../@types'
import { RequestColorSchemes } from '../../../../shared'

export const RequestItem = ({ method, name }: ExplorerTreeNode) => {
  return (
    <Flex justifyContent="space-between">
      <HStack>
        <Badge
          minW="3.5rem"
          textAlign="center"
          colorScheme={method ? RequestColorSchemes[method] : undefined}
        >
          {method}
        </Badge>

        <Text
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          maxW="14ch"
        >
          {name}
        </Text>
      </HStack>

      <Menu>
        <MenuButton>
          <MdArrowDropDown fontSize="1.5rem" />
        </MenuButton>

        <MenuList>
          <MenuItem icon={<MdContentCopy fontSize="1.3rem" />}>
            Duplicar
          </MenuItem>

          <MenuItem icon={<MdPushPin fontSize="1.3rem" />}>Fixar</MenuItem>

          <MenuItem icon={<MdDelete fontSize="1.3rem" />}>Deletar</MenuItem>

          <MenuDivider />

          <MenuItem icon={<MdOutlineSettings fontSize="1.3rem" />}>
            Configurações
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
