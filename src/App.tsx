import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { FallBack } from './components/organisms/fall-back'

const AuthenticationPage = lazy(() => import('./pages/authentication'))
const NotFoundPage = lazy(() => import('./pages/not-found'))
const DashboardPage = lazy(() => import('./pages/dashboard'))

// dashboard sub page

const InitialPage = lazy(() => import('./pages/dashboard/sub-pages/initial'))
const ProjectItemPage = lazy(() => import('./pages/dashboard/sub-pages/project-item'))

export const App = () => {
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
