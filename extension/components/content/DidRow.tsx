import type { AuthChallenge } from '@/types/passkey'
import type { DidUser } from '@/types/did'
import { styles } from './styles'
import { Copy, Check } from 'lucide-react'

export default function DidRow({ user, challenge, onSelect, onClose }: {
    user: DidUser
    challenge: AuthChallenge
    onSelect: () => void
    onClose: () => void
}) {
    const [hoveredDid, setHoveredDid] = useState<boolean>(false)
    const [copiedDid, setCopiedDid] = useState<boolean>(false)
    const copyHandler = async (event: React.MouseEvent) => {
        event.stopPropagation()
        await navigator.clipboard.writeText(user.id)
        setCopiedDid(true)
        setTimeout(() => setCopiedDid(false), 1500)
    }
    const didSelectionHandler = async () => {
        onSelect()
        await signin(user, challenge)
        onClose()
    }

    return (
        <div
            style={{ ...styles.didRow, ...(hoveredDid ? styles.didRowHover : {}) }}
            title='Click to select this DID'
            onMouseEnter={() => setHoveredDid(true)}
            onMouseLeave={() => setHoveredDid(false)}
            onClick={didSelectionHandler}
        >
            <button style={styles.didButton}>
                <span style={styles.didText}>{user.name}</span>
            </button>
            <button
                onClick={copyHandler}
                title='Copy DID'
                style={styles.copyBtn}
            >
                {copiedDid ? <Check size={16} /> : <Copy size={16} />}
            </button>
        </div>
    )
}
