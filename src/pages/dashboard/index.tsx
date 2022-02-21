import { Center } from '@chakra-ui/react'

import { DashboardLoadingContent } from '../../components/dashboard'
import { RequireAuth } from '../../components/utils'
import { useGetUserQuery } from '../../redux/apis'
import { AlertsController } from './alerts-controller'
import { DashboardLayoutContainer } from './dashboard-layout-container'
import { ModalsController } from './modals-controller'
import { ToastsController } from './toasts-controller'

export default function DashboardPage () {
  const { isLoading } = useGetUserQuery()

  if (isLoading) {
    return (
    <Center h='100vh' w='100vw'>
      <DashboardLoadingContent />
    </Center>
    )
  }

  return (
    <>
      {!isLoading && (
        <RequireAuth>
          <DashboardLayoutContainer />
        </RequireAuth>
      )}

      <ModalsController />

      <ToastsController />

      <AlertsController />
    </>
  )
}
