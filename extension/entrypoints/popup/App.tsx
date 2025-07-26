import type { PopupState } from '@/types/popup'
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material'
import Layout from '@/components/popup/Layout'
import Overview from '@/components/popup/Overview'
import Creation from '@/components/popup/Creation'

export default function App() {
  const [state, setState] = useState<PopupState>('did-overview')
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
      background: {
        default: prefersDarkMode ? '#121212' : '#fafafa',
        paper: prefersDarkMode ? '#1e1e1e' : '#ffffff'
      },
      text: {
        primary: prefersDarkMode ? '#ffffff' : '#111111'
      }
    },
    typography: {
      fontFamily: 'Inter, sans-serif'
    }
  }), [prefersDarkMode])

  return <ThemeProvider theme={theme}>
    <Layout>
      {state === 'did-overview' ? <Overview onStateChange={setState} /> :
        state === 'did-creation' ? <Creation onStateChange={setState} /> : null}
    </Layout>
  </ThemeProvider>
}
