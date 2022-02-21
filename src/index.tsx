import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'

import { ChakraProvider } from '@chakra-ui/react'

import { App } from './App'
import { store } from './redux/store'
import { customTheme } from './styles'

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
