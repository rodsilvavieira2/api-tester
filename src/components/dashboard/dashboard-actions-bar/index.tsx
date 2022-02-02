import {
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
import { nanoid } from '@reduxjs/toolkit'

import { SearchInputContainer } from './search-input-container'
import { SortByMenuContainer } from './sort-by-menu-container'

export type MenuActionsConfig = {
  menuButton: {
    text: string
    icon?: JSX.Element
  }
  menuList: {
    text: string
    icon?: JSX.Element
    onClick: () => void
  }[]
}

type DashboardActionsBarProps = {
  menuConfig: MenuActionsConfig
}

export const DashboardActionsBar = ({ menuConfig }: DashboardActionsBarProps) => {
  const { menuButton, menuList } = menuConfig

  return (
    <Flex
      borderBottom="1px solid"
      borderColor="border.primary"
      py="4"
      px="8"
      alignItems="center"
      justifyContent="space-between"
      position="sticky"
      zIndex="sticky"
      top="0"
      left="0"
      bg="background.primary"
    >
      <HStack ml="auto" spacing={5} alignItems="center">
        <SortByMenuContainer />

        <SearchInputContainer />

        <Menu>
          <MenuButton minW="5.5rem" rightIcon={menuButton.icon} as={Button}>
            {menuButton.text}
          </MenuButton>

          <MenuList>
            <MenuGroup title="Novo">
              {menuList.map((item) => (
                <MenuItem
                  key={nanoid()}
                  icon={item.icon}
                  onClick={item.onClick}
                >
                  {item.text}
                </MenuItem>
              ))}
            </MenuGroup>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  )
}
