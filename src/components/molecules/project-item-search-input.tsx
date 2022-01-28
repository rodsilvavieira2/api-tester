import { forwardRef, ForwardRefRenderFunction } from 'react'

import { Input, InputProps } from '@chakra-ui/react'

const Base: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  props,
  ref
) => {
  return <Input focusBorderColor="primary" {...props} ref={ref} />
}

export const ProjectItemSearchInput = forwardRef(Base)
