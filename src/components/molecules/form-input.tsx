import { forwardRef, ForwardRefRenderFunction } from 'react'

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react'

import { DefaultInputProps } from './molecules.types'
const Base: ForwardRefRenderFunction<HTMLInputElement, DefaultInputProps> = (
  { label, error = null, name, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Input {...rest} {...rest} ref={ref} />
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const FormInput = forwardRef(Base)
