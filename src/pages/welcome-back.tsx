import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Center, Heading, Stack, Image } from '@chakra-ui/react'

export const WelcomeBackPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => { navigate('/dashboard') }, 1300)
  }, [navigate])

  return (
    <Center
      h="100vh"
      background="url(/assets/welcome-back-bg.jpg)"
      backgroundPosition="bottom"
      backgroundSize="cover"
      backgroundColor="primary"
    >
      <Stack alignItems="center">
        <Center
          border="4px solid"
          borderColor="primary"
          borderBottomColor="gray.100"
          borderTopColor="gray.100"
          bg="white"
          w="9rem"
          h="9rem"
          boxShadow="2xl"
          borderRadius="full"
          as={motion.div}
          animate="animate"
          variants={{
            animate: {
              rotate: 360,
              transition: {
                duration: 0.5,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'loop'
              }
            }
          }}
        />
        <Image
          top="36.5%"
          w="7rem"
          src="/assets/logo.png"
          alt="sejá bem vindo de volta"
          position="absolute"
        />
        <Heading fontSize="3xl" fontWeight="600" as="h1">
          Olá, novamente
        </Heading>
      </Stack>
    </Center>
  )
}
