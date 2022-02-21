import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import { selectUser } from '../../redux/slices/auth'

export function RequireAuth ({ children }: { children: JSX.Element }) {
  const user = useSelector(selectUser)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}
