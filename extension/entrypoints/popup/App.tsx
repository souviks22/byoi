import type { PopupState } from '@/types/popup'
import type { DidUser } from '@/types/did'
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material'
import Layout from '@/components/popup/Layout'
import Overview from '@/components/popup/Overview'
import Creation from '@/components/popup/Creation'
import Info from '@/components/popup/Infomation'

export default function App() {
  const [state, setState] = useState<PopupState>('did-overview')
  const [users, setUsers] = useState<DidUser[]>([])
  const [info, setInfo] = useState<DidUser>()
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
        <Overview
          users={users}
          onStateChange={setState}
          onDidInfo={user => {
            setInfo(user)
            setState('did-info')
          }}
        />
        : state === 'did-creation' ?
          <Creation
            onStateChange={setState}
            onUserCreation={(user: DidUser) => setUsers(users => [...users, user])}
          />
          :
          <Info
            user={info}
            onStateChange={setState}
          />
      }
    </Layout>
  </ThemeProvider>
}
