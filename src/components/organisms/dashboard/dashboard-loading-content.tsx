import { Center, Spinner } from '@chakra-ui/react'

export const DashboardLoadingContent = () => {
  return (
    <Center h='100%' w='100%' >
        <Center borderRadius='full' bg='white' h='5rem' w='5rem' boxShadow='lg' >
          <Spinner size='xl' />
        </Center>
    </Center>
  )
}
