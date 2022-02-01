import { Center, Image, Stack, Text } from '@chakra-ui/react'

export const ProjectItemNotFound = () => {
  return (
    <Center h="100%" w="100%">
      <Stack textAlign="center" spacing={5} >
        <Image
          w="20rem"
          src="/assets/request-item-not-found.svg"
          alt="item de projeto não encontrado"
        />

        <Text fontSize='larger'>Item de projeto não encontrado</Text>
      </Stack>
    </Center>
  )
}
