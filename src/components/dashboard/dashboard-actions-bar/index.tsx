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

import { SearchInputWrapper } from './search-input-wrapper'
import { SortByMenu } from './sort-by-menu'

type MenuConfig = {
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
  menuConfig: MenuConfig
}

export const DashboardActionsBar = ({ menuConfig }: DashboardActionsBarProps) => {
  const { menuButton, menuList } = menuConfig

  return (
    <Flex
      borderBottom="1px solid"
      borderColor="border.primary"
      py='4'
      px='8'
      alignItems="center"
      justifyContent="space-between"
      position="sticky"
      zIndex="sticky"
      top="0"
      left="0"
      bg="background.primary"
    >
      <HStack ml="auto" spacing={5} alignItems="center">
        <SortByMenu />

        <SearchInputWrapper />

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