import { forwardRef, ForwardRefRenderFunction } from 'react'
import { MdOutlineSearch } from 'react-icons/md'

import {
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement
} from '@chakra-ui/react'

const Base:ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
  return (
    <InputGroup bg='white'>
      <Input {...props} ref={ref}/>
      <InputRightElement>
        <IconButton aria-label="pesquisas">
          <MdOutlineSearch />
        </IconButton>
      </InputRightElement>
    </InputGroup>
  )
}

export const SearchInput = forwardRef(Base)
