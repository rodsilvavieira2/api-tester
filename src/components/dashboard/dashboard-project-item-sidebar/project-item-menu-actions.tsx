import { HiPlusSm } from 'react-icons/hi'
import { MdOutlineSend, MdFolder } from 'react-icons/md'

import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'

type ProjectItemMenuActionsProps = {
  onNewRequest: () => void
  onNewFolder: () => void
}

export const ProjectItemMenuActions = ({
  onNewFolder,
  onNewRequest
}: ProjectItemMenuActionsProps) => {
  return (
    <Menu>
      <MenuButton size="sm" as={IconButton} ml="6" icon={<HiPlusSm />} />

      <MenuList>
        <MenuItem
          onClick={onNewRequest}
          icon={<MdOutlineSend fontSize="1.3rem" />}
        >
          Nova requisição
        </MenuItem>

        <MenuItem onClick={onNewFolder} icon={<MdFolder fontSize="1.3rem" />}>
          Nova Pasta
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
