import { FieldError } from 'react-hook-form'

import { InputProps } from '@chakra-ui/react'

export type DefaultInputProps = {
  label?: string
  error?: FieldError | null
} & InputProps
