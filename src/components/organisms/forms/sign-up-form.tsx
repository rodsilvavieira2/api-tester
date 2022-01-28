import { SubmitHandler, useForm } from 'react-hook-form'
import { MdEmail, MdPerson } from 'react-icons/md'
import * as yup from 'yup'

import {
  Box,
  Button,
  Center,
  Stack,
  Image,
  Flex,
  Checkbox,
  Heading,
  HStack,
  SlideFade
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'

import { FormInput } from '../../molecules'
import { PasswordFormInput } from '../../molecules'
import { formMessages } from './form.messages'

export type SingUpFormFormData = {
  fullName: string
  password: string
  email: string
}

const singUpFormValidation = yup.object().shape({
  fullName: yup.string().required(formMessages.required.fullName),
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
  onSubmit: SubmitHandler<SingUpFormFormData>
  onToggleMode: () => void
}

export const SingUpForm = ({ onSubmit, onToggleMode }: SignFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SingUpFormFormData>({
    resolver: yupResolver(singUpFormValidation)
  })

  return (
    <SlideFade in offsetY={40}>
      <Box bg="white" borderRadius="base" p="6" px="8" boxShadow="2xl">
        <Stack>
          <Center minH="7rem">
            <Stack alignItems="center">
              <Image
                w="64px"
                src="/assets/sign-up-form-icon.png"
                alt="sign up icon"
              />

              <Heading as="h1" fontSize="2xl" fontWeight="600">
                Sign Up
              </Heading>
            </Stack>
          </Center>

          <Stack spacing="5" as="form" onSubmit={handleSubmit(onSubmit)}>
            <HStack>
              <FormInput
                icon={<MdPerson />}
                error={errors.email}
                label="Nome Completo:"
                type="text"
                {...register('fullName')}
              />

              <FormInput
                icon={<MdEmail />}
                error={errors.email}
                label="Email:"
                type="email"
                {...register('email')}
              />
            </HStack>

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
              Já tem uma conta ?Sign in
            </Button>
          </Stack>
        </Stack>
      </Box>
    </SlideFade>
  )
}
