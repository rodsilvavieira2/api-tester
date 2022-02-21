import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { Box } from '@chakra-ui/react'

import { User } from '../../@types'
import { DashboardHeader } from '../../components'
import { logout, selectUser } from '../../redux/slices'

export const DashboardLayoutContainer = () => {
  const appDispatch = useDispatch()

  const user = useSelector(selectUser)

  const onExit = useCallback(() => {
    appDispatch(logout())
  }, [appDispatch])

  const { name, avatarURL } = user as User

  return (
    <Box h="100vh" position="relative" overflow="hidden">
      <DashboardHeader
        onExit={onExit}
        name={name}
        avatarURL={avatarURL}
      />
      <Box h="calc(100vh - 5rem)" overflow="hidden">
        <Outlet />
      </Box>
    </Box>
  )
}
