import { MdArrowDropDown } from 'react-icons/md'

import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react'

import { RequestColors } from '../../../../shared'

const methods = [
  'POST',
  'GET',
  'DELETE',
  'GET',
  'PUT',
  'PATCH',
  'OPTIONS',
  'HEAD'
] as const

export const UrlManager = () => {
  return (
    <InputGroup>
      <InputLeftAddon >
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<MdArrowDropDown fontSize="1.5rem" />}
          />

          <MenuList>
            {methods.map((item, i) => (
              <MenuItem color={RequestColors[item]} key={i}>
                {item}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </InputLeftAddon>

      <Input />

      <InputRightAddon>
        <Button>Enviar</Button>
      </InputRightAddon>
    </InputGroup>
  )
}
