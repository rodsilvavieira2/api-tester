import { memo, useMemo } from 'react'
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
  Stack
} from '@chakra-ui/react'

import { ProjectItemDetails } from '../../../@types'
import { ProjectItemSearchInput } from '../../forms'
import { TreeRecursive } from './tree-recursive'

type DashboardProjectItemSidebarProps = {
  onNewFolder: () => void
  onNewRequisition: () => void
  details: ProjectItemDetails
}

const Base = ({
  details: { explore },
  onNewFolder,
  onNewRequisition
}: DashboardProjectItemSidebarProps) => {
  const tree = useMemo(() => {
    return <TreeRecursive data={explore} />
  }, [explore])

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
            <MenuItem
              onClick={onNewRequisition}
              icon={<MdOutlineSend fontSize="1.3rem" />}
            >
              Nova requisição
            </MenuItem>

            <MenuItem
              onClick={onNewFolder}
              icon={<MdFolder fontSize="1.3rem" />}
            >
              Nova Pasta
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Stack p="1" spacing="3" maxH="100%" overflowY="auto">
          {tree}
      </Stack>
    </Stack>
  )
}

export const DashboardProjectItemSidebar = memo(Base)
