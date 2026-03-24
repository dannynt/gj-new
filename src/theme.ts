import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#EEF4FA',
      100: '#D4E3F2',
      200: '#A9C8E6',
      300: '#7EADDA',
      400: '#5392CE',
      500: '#3A7BBF',
      600: '#2E6299',
      700: '#234A73',
      800: '#17314D',
      900: '#0C1926',
    },
    jam: {
      blue: '#A9C8E6',
      blueLight: '#C4D9EE',
      blueDark: '#8AB4DC',
      orange: '#DB551C',
      orangeLight: '#E8753F',
      orangeDark: '#B84516',
      green: '#B4C867',
      greenLight: '#C5D485',
      greenDark: '#9AB54D',
      dark: '#0A0A0A',
      darkBlue: '#0D1B2A',
      panel: '#1A1A2E',
      panelLight: '#252545',
      white: '#FFFFFF',
      gray: '#8B8B8B',
    }
  },
  fonts: {
    heading: `'Fredoka One', cursive`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'jam.dark',
        color: 'white',
        minHeight: '100vh',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: 'heading',
        fontWeight: 'normal',
        borderRadius: 'md',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        transition: 'all 0.2s ease',
      },
      variants: {
        jam: {
          bg: 'jam.orange',
          color: 'white',
          border: '2px solid',
          borderColor: 'jam.orange',
          _hover: {
            bg: 'jam.orangeLight',
            borderColor: 'jam.orangeLight',
            transform: 'translateY(-2px)',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
        jamOutline: {
          bg: 'transparent',
          color: 'jam.blue',
          border: '2px solid',
          borderColor: 'jam.blue',
          _hover: {
            bg: 'jam.blue',
            color: 'jam.dark',
            transform: 'translateY(-2px)',
          },
        },
      },
      defaultProps: {
        variant: 'jam',
      },
    },
    Input: {
      variants: {
        jam: {
          field: {
            bg: 'jam.panel',
            border: '2px solid',
            borderColor: 'jam.blue',
            borderRadius: 'md',
            color: 'white',
            fontSize: 'md',
            _focus: {
              borderColor: 'jam.blueLight',
              boxShadow: '0 0 0 1px #A9C8E6',
            },
            _placeholder: {
              color: 'jam.gray',
            },
          },
        },
      },
      defaultProps: {
        variant: 'jam',
      },
    },
    Select: {
      variants: {
        jam: {
          field: {
            bg: 'jam.panel',
            border: '2px solid',
            borderColor: 'jam.blue',
            borderRadius: 'md',
            color: 'white',
            fontSize: 'md',
            _focus: {
              borderColor: 'jam.blueLight',
              boxShadow: '0 0 0 1px #A9C8E6',
            },
          },
        },
      },
      defaultProps: {
        variant: 'jam',
      },
    },
    Textarea: {
      variants: {
        jam: {
          bg: 'jam.panel',
          border: '2px solid',
          borderColor: 'jam.blue',
          borderRadius: 'md',
          color: 'white',
          fontSize: 'md',
          _focus: {
            borderColor: 'jam.blueLight',
            boxShadow: '0 0 0 1px #A9C8E6',
          },
          _placeholder: {
            color: 'jam.gray',
          },
        },
      },
      defaultProps: {
        variant: 'jam',
      },
    },
  },
})

export default theme
