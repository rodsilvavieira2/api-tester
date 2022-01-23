import { StrictMode } from 'react'
import ReactDOM from 'react-dom'

import { ChakraProvider } from '@chakra-ui/react'

import { App } from './App'
import { customTheme } from './styles'

ReactDOM.render(
  <StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
)
