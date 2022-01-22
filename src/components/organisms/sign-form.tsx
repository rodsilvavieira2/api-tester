import { Button, Stack } from '@chakra-ui/react'

import { FormInput } from '../molecules'

export const SignForm = () => {
  return (
    <Stack>
      <FormInput label="Email:" />

      <FormInput label="Password:" />

      <Button type="submit">Sign in</Button>
    </Stack>
  )
}
