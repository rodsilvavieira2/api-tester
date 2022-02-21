import { TiArrowUnsorted } from 'react-icons/ti'

import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption
} from '@chakra-ui/react'

import { SortBy } from '../../../redux/slices/user-macro-actions/types'

type SortByMenuProps = {
  onChange: (sortType: SortBy) => void,
  defaultValue: SortBy
}

export const SortByMenu = ({ defaultValue, onChange }: SortByMenuProps) => {
  return (
    <Menu>
      <MenuButton as={IconButton} icon={<TiArrowUnsorted />} />

      <MenuList>
        <MenuOptionGroup
          defaultValue={defaultValue}
          onChange={(value) => onChange(value as SortBy)}
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
