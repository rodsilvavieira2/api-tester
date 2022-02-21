import { HiPlus } from 'react-icons/hi'
import {
  MdArrowDropDown,
  MdContentCopy,
  MdDelete,
  MdSettings
} from 'react-icons/md'

import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  MenuDivider
} from '@chakra-ui/react'

type FolderMenuActionsProps = {
  onNewRequest: () => void
  onDuplicate: () => void
  onDelete: () => void
  onSettings: () => void
}

export const FolderMenuActions = ({
  onDelete,
  onDuplicate,
  onNewRequest,
  onSettings
}: FolderMenuActionsProps) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<MdArrowDropDown fontSize="1.5rem" />}
        variant="ghost"
        size="xl"
      />

      <MenuList>
        <MenuItem onClick={onNewRequest} icon={<HiPlus fontSize="1.3rem" />}>
          Nova requisição
        </MenuItem>
        <MenuDivider />

        <MenuItem
          onClick={onDuplicate}
          icon={<MdContentCopy fontSize="1.3rem" />}
        >
          Duplicar
        </MenuItem>

        <MenuItem
          onClick={onDelete}
          color="red.500"
          icon={<MdDelete fontSize="1.3rem" />}
        >
          Deletar
        </MenuItem>

        <MenuDivider />

        <MenuItem onClick={onSettings} icon={<MdSettings fontSize="1.3rem" />}>
          Configurações
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
