import { extendTheme } from '@chakra-ui/react'

export const customTheme = extendTheme({
  colors: {
    primary: '#7579E7',
    secondary: '#9AB3F5',
    highlight: '#CDF0EA',
    heading: '#24292d',
    text: 'rgb(116, 117, 125)',
    border: {
      primary: '#ced4da'
    },
    background: {
      primary: '#F7FAFC',
      auth: 'linear-gradient(180deg, rgba(117,121,231,1) 5%, rgba(156,182,244,1) 43%, rgba(205,240,234,1) 100%)'
    }
  },
  styles: {
    global: {
      body: {
        fontFamily: "'Roboto', sans-serif",
        color: 'text',
        bg: 'background.primary'
      }
    }
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: 'primary',
          color: 'white',
          _hover: {
            bg: 'purple.500'
          },
          _focus: {
            bg: 'purple.500'
          },
          _active: {
            bg: 'purple.500'
          }
        },
        link: {
          color: 'primary'
        }
      }
    },
    Checkbox: {
      defaultProps: {
        colorScheme: 'purple'
      }
    },
    Heading: {
      baseStyle: {
        color: 'heading'
      }
    },
    Input: {
      defaultProps: {
        bg: 'red.500',
        focusBorderColor: 'primary'
      }
    },
    ModalHeader: {
      defaultProps: {
        color: 'heading'
      }
    }
  }
})
