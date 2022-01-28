import { setupWorker } from 'msw'

import { handles } from './server'

export const serverWorker = setupWorker(...handles)
