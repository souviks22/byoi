import type { RuntimeMessage, RuntimeResponse } from '@/types/messaging'
import type { DidUser } from '@/types/did'
import type { AuthChallenge } from '@/types/passkey'
import { styles } from './styles'
import { X } from 'lucide-react'
import ReactDOM from 'react-dom/client'
import DidRow from './DidRow'
import Loader from './Loader'

export default function DidAuthentication({ challenge, onClose }: {
    challenge: AuthChallenge
    onClose: () => void
}) {
    const [users, setUsers] = useState<DidUser[]>([])
    const [userIsSelected, setUserIsSelected] = useState<boolean>(false)
    const getUsers = async () => {
        const message: RuntimeMessage = {
            source: 'content',
            type: 'get-user',
            params: { did: '<all_users>' }
        }
        const { success, data } = await browser.runtime.sendMessage(message) as RuntimeResponse
        if (!success) throw new Error('Failed to fetch DID Users')
        setUsers(data as DidUser[])
    }
    useEffect(() => {
        getUsers()
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [])

    return (
        <div style={styles.backdrop} role='dialog' aria-modal='true'>
            <div style={styles.modal}>
                {userIsSelected ? <Loader /> : <>
                    <div style={styles.header}>
                        <h2 style={styles.title}>Select your Decentralized ID</h2>
                        <button onClick={onClose} style={styles.closeBtn} aria-label="Close">
                            <X size={20} />
                        </button>
                    </div>
                    <div style={styles.list}>
                        {users.map(user => <DidRow
                            key={user.id}
                            user={user}
                            challenge={challenge}
                            onSelect={() => setUserIsSelected(true)}
                            onClose={onClose}
                        />)}
                    </div>
                    <button onClick={onClose} style={styles.cancelBtn}>Cancel</button>
                </>}
            </div>
        </div>
    )
}

export const mountDidSelector = (challenge: AuthChallenge, onClose: () => void) => {
    return (container: HTMLElement) => {
        const zoomIn = `
        @keyframes zoomIn {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
        }
        @keyframes rotate {
            100% { transform: rotate(360deg); }
        }
        @keyframes dash {
            0% { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
            50% { stroke-dasharray: 100, 200; stroke-dashoffset: -15px; }
            100% { stroke-dasharray: 100, 200; stroke-dashoffset: -125px; }
        }
        `
        const style = document.createElement('style')
        style.textContent = zoomIn
        document.head.appendChild(style)
        const root = ReactDOM.createRoot(container)
        root.render(<DidAuthentication challenge={challenge} onClose={onClose} />)
        return root
    }
}
