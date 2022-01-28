import { Center, Heading, Stack, Text } from '@chakra-ui/react'

export default function NotFoundPage () {
  return (
    <Center w="100vw" h="100vh">
      <Stack alignItems='center'>
        <Heading fontSize='9xl' >404</Heading>

        <Text>OPS, pagina não encontrada</Text>
      </Stack>
    </Center>
  )
}
