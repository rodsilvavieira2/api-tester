import { lazy, Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { localStorageKeys } from './config'
import { useLocalStorage } from './hooks'
import { FallBack } from './pages/fall-back'
import { setTokens } from './redux/slices'

const AuthenticationPage = lazy(() => import('./pages/authentication'))
const NotFoundPage = lazy(() => import('./pages/not-found'))
const DashboardPage = lazy(() => import('./pages/dashboard'))

// dashboard sub page

const InitialPage = lazy(() => import('./pages/dashboard/sub-pages/initial'))
const ProjectItemPage = lazy(() => import('./pages/dashboard/sub-pages/project-item'))

export const App = () => {
  const [accessToken] = useLocalStorage<string | null>(
    localStorageKeys.accessToken,
    null
  )
  const [refreshToken] = useLocalStorage<string | null>(
    localStorageKeys.refreshToken,
    null
  )

  const appDispatch = useDispatch()

  useEffect(() => {
    appDispatch(
      setTokens({
        accessToken,
        refreshToken
      })
    )
  }, [accessToken, appDispatch, refreshToken])

  return (
    <Suspense fallback={<FallBack />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthenticationPage />} />

          <Route path="/dashboard" element={<DashboardPage />}>
            <Route index element={<InitialPage />} />

            <Route
              path="project-item/:id"
              element={<ProjectItemPage />}
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}
