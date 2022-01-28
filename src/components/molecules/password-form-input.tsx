import { forwardRef, ForwardRefRenderFunction, useState } from 'react'
import { HiEyeOff, HiEye } from 'react-icons/hi'
import { MdLock } from 'react-icons/md'

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react'

import { DefaultInputProps } from './molecules.types'

const Base: ForwardRefRenderFunction<
  HTMLInputElement,
  Omit<DefaultInputProps, 'type'>
> = ({ label, error = null, name, ...rest }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const onTogglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev)

  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <InputGroup>
        <InputLeftElement>
          <Icon as={MdLock} />
        </InputLeftElement>

        <Input
          id={name}
          name={name}
          type={isPasswordVisible ? 'text' : 'password'}
          ref={ref}
          {...rest}
        />

        <InputRightElement>
          <IconButton
            onClick={onTogglePasswordVisibility}
            aria-label="alternar visibilidade da senha"
            icon={isPasswordVisible ? <HiEyeOff /> : <HiEye />}
          />
        </InputRightElement>
      </InputGroup>

      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const PasswordFormInput = forwardRef(Base)
