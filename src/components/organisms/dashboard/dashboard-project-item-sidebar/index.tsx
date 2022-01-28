import { HiPlusSm } from 'react-icons/hi'
import {
  MdArrowDropDown,
  MdFolder,
  MdOutlineSend,
  MdSettings
} from 'react-icons/md'

import {
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Stack,
  Center,
  Spinner
} from '@chakra-ui/react'

import {
  ProjectItemFolder,
  ProjectItemFolderChildren
} from '../../../../@types'
import { ProjectItemSearchInput } from '../../../molecules'
import { Folder } from './folder'
import { RequestItem } from './request-item'

type DashboardProjectItemSidebarProps = {
  isLoading: boolean
  onNewFolder: () => void
  onNewRequisition: () => void
  folderTree: {
    folders: ProjectItemFolder[]
    alone: ProjectItemFolderChildren[]
  }
}

export const DashboardProjectItemSidebar = ({
  folderTree,
  isLoading,
  onNewFolder,
  onNewRequisition
}: DashboardProjectItemSidebarProps) => {
  return (
    <Stack
      as="aside"
      spacing="6"
      w="20%"
      p="3"
      bg="white"
      borderRight="1px solid"
      borderColor="border.primary"
    >
      <Box>
        <Menu>
          <MenuButton
            variant="link"
            as={Button}
            rightIcon={<MdArrowDropDown fontSize="1.3rem" />}
          >
            Variaveis de ambiente
          </MenuButton>

          <MenuList zIndex="popover">
            <MenuOptionGroup
              defaultValue="variavies-1"
              title="Variveis ativas"
              type="radio"
            >
              <MenuItemOption value="variavies-1">variavies 1</MenuItemOption>

              <MenuItemOption value="variavies-2">variavies 2</MenuItemOption>
            </MenuOptionGroup>

            <MenuDivider />

            <MenuGroup title="Geral">
              <MenuItem icon={<MdSettings fontSize="1.3rem" />}>
                gerenciar ambiente
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>

      <Flex>
        <ProjectItemSearchInput size="sm" />

        <Menu>
          <MenuButton size="sm" as={IconButton} ml="6" icon={<HiPlusSm />} />

          <MenuList>
            <MenuItem onClick={onNewRequisition} icon={<MdOutlineSend fontSize="1.3rem" />}>
              Nova requisição
            </MenuItem>

            <MenuItem onClick={onNewFolder} icon={<MdFolder fontSize="1.3rem" />}>
              Nova Pasta
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {isLoading
        ? (
        <Center h="100%" w='100%'>
          <Spinner />
        </Center>
          )
        : (
        <Stack p="1" spacing="3" maxH="100%" overflowY="auto">
          {folderTree.folders.map((folder) => (
            <Folder key={folder.id} {...folder} />
          ))}

          {folderTree.alone.map((item) => (
            <RequestItem key={item.id} {...item} />
          ))}
        </Stack>
          )}
    </Stack>
  )
}
