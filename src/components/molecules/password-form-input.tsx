import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input
} from '@chakra-ui/react'

import { DefaultInputProps } from './molecules.types'

export const PasswordFormInput = ({
  label,
  error = null,
  name,
  ...rest
}: DefaultInputProps) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Input id={name} {...rest} />

      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}
