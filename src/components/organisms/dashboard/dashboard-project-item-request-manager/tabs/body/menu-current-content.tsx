import { MdArrowDropDown } from 'react-icons/md'

import { Menu, MenuButton, Button, MenuList, MenuOptionGroup, MenuItemOption, MenuDivider } from '@chakra-ui/react'

export const MenuCurrentContent = () => {
  return (
    <Menu placement="auto-end">
      <MenuButton
        variant="link"
        as={Button}
        rightIcon={<MdArrowDropDown fontSize="1.5rem" />}
      >
        Tipo
      </MenuButton>
      <MenuList>
        <MenuOptionGroup
          onChange={(e) => console.log(e)}
          defaultValue="multipart_form"
          type="radio"
        >
          <MenuItemOption value="multipart_form">Multipart Form</MenuItemOption>

          <MenuItemOption value="form_url_encoded">
            Form URL Encoded
          </MenuItemOption>

          <MenuDivider />

          <MenuItemOption value="json">JSON</MenuItemOption>

          <MenuItemOption value="xml">XML</MenuItemOption>

          <MenuItemOption value="yaml">YAML</MenuItemOption>

          <MenuItemOption value="edn">EDN</MenuItemOption>

          <MenuItemOption value="plain">PLAIN</MenuItemOption>

          <MenuItemOption value="other">Other</MenuItemOption>

          <MenuDivider />

          <MenuItemOption value="binary_file">Binary File</MenuItemOption>

          <MenuItemOption value="no_body">Sem Body</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
