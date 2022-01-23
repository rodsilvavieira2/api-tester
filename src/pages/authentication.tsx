import { useCallback, useState } from 'react'

import { Center } from '@chakra-ui/react'

import { SignInForm, SingUpForm } from '../components/organisms/forms'

export default function AuthenticationPage () {
  const [isInSignUpMode, setIsInSignUpMode] = useState(false)

  const onToggleMode = useCallback(() => {
    setIsInSignUpMode(prev => !prev)
  }, [])

  const handleSubmit = useCallback((data) => {
    console.log(data)
  }, [])

  return (
    <Center bg="background.primary" w="100vw" minH="100vh">
      {isInSignUpMode
        ? (
        <SingUpForm onToggleMode={onToggleMode} onSubmit={handleSubmit} />
          )
        : (
        <SignInForm onToggleMode={onToggleMode} onSubmit={handleSubmit} />
          )}
    </Center>
  )
}
