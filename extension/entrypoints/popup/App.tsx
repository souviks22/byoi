import type { PopupState } from '@/types/popup'
import type { DidUser } from '@/types/did'
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material'
import Layout from '@/components/popup/Layout'
import Overview from '@/components/popup/Overview'
import Creation from '@/components/popup/Creation'

export default function App() {
  const [state, setState] = useState<PopupState>('did-overview')
  const [users, setUsers] = useState<DidUser[]>([])
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

  useEffect(() => {
    (async () => {
      const users = await getDidUsers()
      setUsers(users)
    })()
  }, [])

  return <ThemeProvider theme={theme}>
    <Layout>
      {state === 'did-overview' ?
        <Overview users={users}
          onStateChange={setState}
        />
        : state === 'did-creation' ?
          <Creation
            onStateChange={setState}
            onUserCreation={(user: DidUser) => setUsers(users => [...users, user])}
          />
          : null
      }
    </Layout>
  </ThemeProvider>
}
