import './seeds'
import { authHandles, projectsHandles } from './routes'

export const handles = [...authHandles, ...projectsHandles]
