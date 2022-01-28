import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Center, useToast } from '@chakra-ui/react'

import {
  SignFormFormData,
  SignInForm,
  SingUpForm
} from '../components/organisms/forms'
import { localStorageKeys } from '../config'
import { useLocalStorage } from '../hooks'
import { useLoginMutation } from '../redux/apis'

export default function AuthenticationPage () {
  const [isInSignUpMode, setIsInSignUpMode] = useState(false)
  const [accessToken] = useLocalStorage(localStorageKeys.accessToken, null)

  const navigation = useNavigate()

  useEffect(() => {
    if (accessToken) navigation('/dashboard')
  }, [accessToken, navigation])

  const [onSignIn] = useLoginMutation()

  const toast = useToast()

  const onToggleMode = useCallback(() => {
    setIsInSignUpMode((prev) => !prev)
  }, [])

  const handleSubmit = useCallback((data) => {
    console.log(data)
  }, [])

  const onSignInSubmit = useCallback(
    async (data: SignFormFormData) => {
      try {
        await onSignIn({ ...data }).unwrap()

        navigation('/dashboard')
      } catch (e) {
        toast({
          title: 'Autenticação',
          description: 'Email ou senha invalidos',
          isClosable: true,
          variant: 'left-accent',
          status: 'error'
        })
      }
    },
    [navigation, onSignIn, toast]
  )

  return (
    <Center bg="background.auth" w="100vw" minH="100vh">
      {isInSignUpMode
        ? (
        <SingUpForm onToggleMode={onToggleMode} onSubmit={handleSubmit} />
          )
        : (
        <SignInForm onToggleMode={onToggleMode} onSubmit={onSignInSubmit} />
          )}
    </Center>
  )
}
