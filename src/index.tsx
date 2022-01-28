import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'

import { ChakraProvider } from '@chakra-ui/react'

import { App } from './App'
import { store } from './redux/store'
import { customTheme } from './styles'

function startReact () {
  ReactDOM.render(
    <StrictMode>
      <ChakraProvider theme={customTheme}>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </ChakraProvider>
    </StrictMode>,
    document.getElementById('root')
  )
}

if (process.env.NODE_ENV === 'development') {
  (async () => {
    const { serverWorker } = await import('./mock/browser')
    try {
      await serverWorker.start()
      startReact()
    } catch {
      console.error('error on start worker on development mode')
    }
  })()
} else {
  startReact()
}
