import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Box, Skeleton } from '@chakra-ui/react'

import { DashboardHeader } from '../../components/organisms/dashboard'
import { localStorageKeys } from '../../config'
import { useLocalStorage } from '../../hooks'
import { useGetUserMutation } from '../../redux/apis'
import { LoadingContent } from './loading-content'
import { ModalsController } from './modals-controler'

export default function DashboardPage () {
  const [accessToken] = useLocalStorage<string | null>(
    localStorageKeys.accessToken,
    null
  )

  const [getUser, { data, isError, isLoading = true }] = useGetUserMutation()

  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) {
      getUser()
    }
  }, [accessToken, getUser])

  useEffect(() => {
    if (!accessToken || isError) navigate('/', { replace: true })
  }, [accessToken, isError, navigate])

  return (
    <Box minH="100vh">
      {!isLoading && data
        ? (
        <DashboardHeader fullName={data.fullName} avatarURL={data.avatarURL} />
          )
        : (
        <Skeleton h="5rem" px="8" boxShadow="lg" />
          )}

      <Box h="calc(100vh - 5rem)" padding="5" overflowY="auto">
        {!isLoading && data ? <Outlet /> : <LoadingContent />}
      </Box>

      <ModalsController />
    </Box>
  )
}
