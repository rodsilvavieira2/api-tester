import { useState } from 'react'
import { FaFolderMinus, FaFolderOpen } from 'react-icons/fa'
import { HiPlus } from 'react-icons/hi'
import {
  MdArrowDropDown,
  MdContentCopy,
  MdDelete,
  MdSettings
} from 'react-icons/md'

import {
  Box,
  Collapse,
  HStack,
  Icon,
  Text,
  List,
  ListItem,
  Flex,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  MenuDivider
} from '@chakra-ui/react'

import { ProjectItemFolder } from '../../../../@types'
import { RequestItem } from './request-item'

type FolderProps = ProjectItemFolder

export const Folder = ({ name, children }: FolderProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const onToggleFolder = () => setIsOpen((prev) => !prev)

  return (
    <Box >
      <Flex>
        <HStack flex={1} cursor="pointer" onClick={onToggleFolder}>
          <Icon fontSize="1.1rem" as={isOpen ? FaFolderOpen : FaFolderMinus} />

          <Text>{name}</Text>
        </HStack>

        <Menu>
          <MenuButton
            as={IconButton}
            icon={<MdArrowDropDown fontSize="1.5rem" />}
            variant="ghost"
            size="xl"
          />

          <MenuList>
            <MenuItem icon={<HiPlus />}>Nova requisição</MenuItem>
            <MenuDivider />

            <MenuItem icon={<MdContentCopy />}>Duplicar</MenuItem>

            <MenuItem icon={<MdDelete />}>Deletar</MenuItem>

            <MenuDivider />

            <MenuItem icon={<MdSettings />}>Configurações</MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <List spacing="2" pl="2">
          {children.map((item) => (
            <ListItem key={item.id}>
              <RequestItem {...item} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Box>
  )
}
