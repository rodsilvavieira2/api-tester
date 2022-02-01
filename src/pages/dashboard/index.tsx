/* eslint-disable no-debugger */
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

import { Box, Skeleton } from '@chakra-ui/react'

import { DashboardHeader } from '../../components/organisms/dashboard'
import { DashboardLoadingContent } from '../../components/organisms/dashboard'
import { useGetUserMutation } from '../../redux/apis'
import { logout, selectAccessToken } from '../../redux/slices'
import { ModalsController } from './modals-controller'
import { ToastsController } from './toasts-controller'

export default function DashboardPage () {
  const accessToken = useSelector(selectAccessToken)

  const [getUser, { data, isError, isLoading = true }] = useGetUserMutation()

  const navigate = useNavigate()

  const appDispatch = useDispatch()

  const onExit = useCallback(() => {
    appDispatch(logout())
  }, [appDispatch])

  useEffect(() => {
    if (accessToken) {
      getUser()
    }
  }, [accessToken, getUser])

  useEffect(() => {
    if (!accessToken || isError) {
      appDispatch(logout)
      navigate('/', { replace: true })
    }
  }, [accessToken, appDispatch, isError, navigate])

  return (
    <Box minH="100vh" position='relative'>
      {!isLoading && data
        ? (
        <DashboardHeader onExit={onExit} fullName={data.fullName} avatarURL={data.avatarURL} />
          )
        : (
        <Skeleton h="5rem" px="8" boxShadow="lg" />
          )}

      <Box h="calc(100vh - 5rem)" overflowY='auto'>
        {!isLoading && data ? <Outlet /> : <DashboardLoadingContent />}
      </Box>

      <ModalsController />

      <ToastsController />
    </Box>
  )
}
