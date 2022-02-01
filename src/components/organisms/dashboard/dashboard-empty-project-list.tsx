import { HiPlusSm } from 'react-icons/hi'

import { Button, Center } from '@chakra-ui/react'

export const DashboardEmptyProjectList = () => {
  return <Center w="100%" h="100%">
    <Button boxShadow='lg' rightIcon={<HiPlusSm />}>
      Criar novo projeto
    </Button>
  </Center>
}
