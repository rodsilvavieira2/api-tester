import { memo } from 'react'
import {
  MdArrowDropDown,
  MdSettings
} from 'react-icons/md'

import {
  Box,
  Button,
  Flex,
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

import { ProjectItemSearchInput } from '../../forms'
import { ExploreTreeContainer } from './explore-tree-container'
import { ProjectItemMenuActionsContainer } from './project-item-menu-actions-container'

const Base = () => {
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

        <ProjectItemMenuActionsContainer />
      </Flex>

     <ExploreTreeContainer/>
    </Stack>
  )
}

export const DashboardProjectItemSidebar = memo(Base)
