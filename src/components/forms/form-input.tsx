import {
  forwardRef,
  ForwardRefRenderFunction,
  ReactElement
} from 'react'

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react'

import { DefaultInputProps } from './forms.types'

type FormInputProps = { icon?: ReactElement } & DefaultInputProps

const Base: ForwardRefRenderFunction<HTMLInputElement, FormInputProps> = (
  { label, icon, error = null, name, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup>
        {icon && <InputLeftElement>{icon}</InputLeftElement>}

        <Input {...rest} {...rest} ref={ref} id={name} name={name} />
      </InputGroup>
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const FormInput = forwardRef(Base)
