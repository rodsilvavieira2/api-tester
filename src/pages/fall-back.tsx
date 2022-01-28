import { Center, Stack, Spinner, Heading } from '@chakra-ui/react'

export const FallBack = () => {
  return (
    <Center w="100vw" minH="100vh">
      <Stack alignItems="center">
        <Spinner size="xl" />
        <Heading color='primary' fontSize='larger' as='h2'>Carregando...</Heading>
      </Stack>
    </Center>
  )
}
