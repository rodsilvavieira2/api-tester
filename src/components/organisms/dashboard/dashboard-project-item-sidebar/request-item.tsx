import { MdArrowDropDown, MdContentCopy, MdDelete, MdOutlineSettings, MdPushPin } from 'react-icons/md'

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

import { HttpMethods } from '../../../../@types'
import { RequestColorSchemes } from '../../../../shared'

type RequestItemProps = {
  id: string
  name: string
  method: HttpMethods
}

export const RequestItem = ({ method, name }: RequestItemProps) => {
  return (
    <Flex
      py="2"
      px="3"
      borderRadius="base"
      justifyContent="space-between"
      bg="gray.100"
    >
      <HStack>
        <Badge
          minW="3.5rem"
          textAlign="center"
          colorScheme={RequestColorSchemes[method]}
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

          <MenuItem icon={<MdOutlineSettings fontSize='1.3rem' />} >Configurações</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}
