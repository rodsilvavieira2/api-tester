import { TiArrowUnsorted } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux'

import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption
} from '@chakra-ui/react'

import { SortBy } from '../../../../@types'
import { selectSortBy, setSortBy } from '../../../../redux/slices'

export const SortByMenu = () => {
  const sortBy = useSelector(selectSortBy)

  const appDispatch = useDispatch()

  return (
    <Menu>
      <MenuButton as={IconButton} icon={<TiArrowUnsorted />} />

      <MenuList>
        <MenuOptionGroup
          defaultValue={sortBy}
          onChange={(e) => appDispatch(setSortBy(e as SortBy))}
        >
          <MenuItemOption value="newest">Mais recentes</MenuItemOption>

          <MenuItemOption value="oldest">Mais antigos</MenuItemOption>

          <MenuItemOption value="ascending">Crescente</MenuItemOption>

          <MenuItemOption value="descending">Decrescente</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
