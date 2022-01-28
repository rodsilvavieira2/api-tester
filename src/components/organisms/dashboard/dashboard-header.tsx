import { MdSettings } from 'react-icons/md'
import { Link } from 'react-router-dom'

import {
  Avatar,
  Flex,
  HStack,
  IconButton,
  Image,
  Text
} from '@chakra-ui/react'

import { User } from '../../../@types'

type DashboardHeaderProps = Pick<User, 'avatarURL' | 'fullName'>

export const DashboardHeader = ({ fullName, avatarURL }: DashboardHeaderProps) => {
  return (
    <Flex
      position="sticky"
      top={0}
      left={0}
      boxShadow="lg"
      h="5rem"
      px="10"
      alignItems="center"
      justifyContent="space-between"
      bg="white"
      zIndex="sticky"
    >
      <HStack alignItems="center" as={Link} to="/dashboard">
        <Image h="64px" src="/assets/logo.png" alt="api test" />

        <Text fontSize="larger" fontWeight={600}>
          Api Tester
        </Text>
      </HStack>

      <HStack spacing={5}>
        <IconButton aria-label="configurações" icon={<MdSettings />} />

        <Avatar name={fullName} src={avatarURL || undefined} />
      </HStack>
    </Flex>
  )
}
