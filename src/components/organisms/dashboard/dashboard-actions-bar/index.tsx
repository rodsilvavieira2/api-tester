import { HiPlusSm } from 'react-icons/hi'
import { MdInsertDriveFile } from 'react-icons/md'
import { RiStackFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'

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

import { toggleCreateNewProjectItemOpen } from '../../../../redux/slices'
import { DashBoardNavigationBar } from '../dashboard-navigation-bar'
import { SearchInputWrapper } from './search-input-wrapper'
import { SortByMenu } from './sort-by-menu'

export const DashboardActionsBar = () => {
  const appDispatch = useDispatch()

  const onCreateNewProjectItem = () =>
    appDispatch(toggleCreateNewProjectItemOpen())

  return (
    <Flex
      borderBottom="1px solid"
      borderColor="border.primary"
      pb="5"
      my="5"
      alignItems="center"
      justifyContent="space-between"
    >
      <DashBoardNavigationBar />

      <HStack spacing={5} alignItems="center">
        <SortByMenu />

        <SearchInputWrapper />

        <Menu>
          <MenuButton minW="5.5rem" rightIcon={<HiPlusSm />} as={Button}>
            Criar
          </MenuButton>

          <MenuList>
            <MenuGroup title="Novo">
              <MenuItem icon={<MdInsertDriveFile fontSize="1.2rem" />}>
                Documento de design
              </MenuItem>

              <MenuItem
                onClick={onCreateNewProjectItem}
                icon={<RiStackFill fontSize="1.2rem" />}
              >
                Coleção de request
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  )
}
