import { SubmitHandler, useForm } from 'react-hook-form'
import { MdEmail } from 'react-icons/md'
import * as yup from 'yup'

import {
  Box,
  Button,
  Center,
  Stack,
  Image,
  Flex,
  Checkbox,
  Heading
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { FormInput } from '../../molecules'
import { PasswordFormInput } from '../../molecules'
import { formMessages } from './form.messages'

export type SignFormFormData = {
  password: string
  email: string
}

const signFormValidation = yup.object().shape({
  password: yup
    .string()
    .required(formMessages.required.password)
    .min(6, formMessages.invalid.password),
  email: yup
    .string()
    .required(formMessages.required.email)
    .email(formMessages.invalid.email)
})

type SignFormProps = {
  onSubmit: SubmitHandler<SignFormFormData>
  onToggleMode: () => void
}

export const SignInForm = ({ onSubmit, onToggleMode }: SignFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignFormFormData>({
    resolver: yupResolver(signFormValidation)
  })

  return (
    <Box bg="white" borderRadius="base" p="6" px="8" boxShadow="2xl" my="10">
      <Center minH="7rem">
        <Stack alignItems="center">
          <Image
            w="64px"
            src="/assets/sign-in-form-icon.png"
            alt="sign in icon"
          />

          <Heading as="h1" fontSize="2xl" fontWeight="600">
            Sign in
          </Heading>
        </Stack>
      </Center>

      <Stack spacing="5" as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          icon={<MdEmail />}
          error={errors.email}
          label="Email:"
          type="email"
          {...register('email')}
        />

        <PasswordFormInput
          error={errors.password}
          label="Senha:"
          {...register('password')}
        />
        <Flex>
          <Checkbox>Lembar de min ?</Checkbox>
        </Flex>

        <Button isLoading={isSubmitting} type="submit">
          Sign in
        </Button>

        <Button onClick={onToggleMode} variant="link">
          Não tem uma conta ?Sign up
        </Button>
      </Stack>
    </Box>
  )
}
