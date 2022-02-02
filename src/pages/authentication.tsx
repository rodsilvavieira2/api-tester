/* eslint-disable no-debugger */
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Center, useToast } from '@chakra-ui/react'

import { CustomError } from '../@types'
import {
  SignFormFormData,
  SignInForm,
  SingUpForm,
  SingUpFormFormData
} from '../components/auth-forms'
import { useCreateNewUserMutation, useLoginMutation } from '../redux/apis'
import { selectAccessToken, setShouldRememberMe } from '../redux/slices'
import { AuthCodeErrors } from '../shared/errors'

export default function AuthenticationPage () {
  const [isInSignUpMode, setIsInSignUpMode] = useState(false)
  const accessToken = useSelector(selectAccessToken)

  const navigation = useNavigate()

  const appDispatch = useDispatch()

  useEffect(() => {
    if (accessToken) navigation('/dashboard')
  }, [accessToken, navigation])

  const [onSignIn] = useLoginMutation()
  const [onSingUp] = useCreateNewUserMutation()

  const toast = useToast()

  const onToggleMode = useCallback(() => {
    setIsInSignUpMode((prev) => !prev)
  }, [])

  const onSignUpSubmit = useCallback(
    async (data: SingUpFormFormData) => {
      try {
        appDispatch(setShouldRememberMe(data.rememberMe))
        await onSingUp({ ...data }).unwrap()

        navigation('/dashboard')
      } catch (e) {
        appDispatch(setShouldRememberMe(false))

        const error = e as CustomError<AuthCodeErrors>

        const code = error.data?.code

        if (code) {
          switch (code) {
            case 'auth.email-in-user': {
              toast({
                title: 'Autenticação',
                description: 'Esse email em uso',
                isClosable: true,
                variant: 'left-accent',
                status: 'error'
              })
              break
            }
            default: {
              toast({
                title: 'Autenticação',
                description: 'Desculpe, aconteceu um erro inesperado',
                isClosable: true,
                variant: 'left-accent',
                status: 'error'
              })
            }
          }
        }
      }
    },
    [appDispatch, navigation, onSingUp, toast]
  )

  const onSignInSubmit = useCallback(
    async (data: SignFormFormData) => {
      try {
        appDispatch(setShouldRememberMe(data.rememberMe))
        await onSignIn({ ...data }).unwrap()

        navigation('/dashboard')
      } catch (e) {
        appDispatch(setShouldRememberMe(false))

        const error = e as CustomError<AuthCodeErrors>

        const code = error.data?.code

        if (code) {
          switch (code) {
            case 'auth.invalid-credentials': {
              toast({
                title: 'Autenticação',
                description: 'Email ou senha invalido',
                isClosable: true,
                variant: 'left-accent',
                status: 'error'
              })
              break
            }
            default: {
              toast({
                title: 'Autenticação',
                description: 'Desculpe, aconteceu um erro inesperado',
                isClosable: true,
                variant: 'left-accent',
                status: 'error'
              })
            }
          }
        }
      }
    },
    [appDispatch, navigation, onSignIn, toast]
  )
  if (accessToken) return null

  return (
    <Center w="100vw" minH="100vh">
      {isInSignUpMode
        ? (
        <SingUpForm onToggleMode={onToggleMode} onSubmit={onSignUpSubmit} />
          )
        : (
        <SignInForm onToggleMode={onToggleMode} onSubmit={onSignInSubmit} />
          )}
    </Center>
  )
}
