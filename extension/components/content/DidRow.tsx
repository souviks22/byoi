import type { AuthChallenge } from '@/types/passkey'
import type { DidUser } from '@/types/did'
import { styles } from './styles'

export default function DidRow({ user, challenge, onSelect, onClose }: {
    user: DidUser
    challenge: AuthChallenge
    onSelect: () => void
    onClose: () => void
}) {
    const [hoveredDid, setHoveredDid] = useState<boolean>(false)
    const didSelectionHandler = async () => {
        onSelect()
        await signin(user, challenge)
        onClose()
    }

    return <div
        style={{ ...styles.didRow, ...(hoveredDid ? styles.didRowHover : {}) }}
        title='Click to select this DID'
        onMouseEnter={() => setHoveredDid(true)}
        onMouseLeave={() => setHoveredDid(false)}
        onClick={didSelectionHandler}
    >
        <button style={styles.didBtn}>
            <span style={styles.didText}>{user.profile || user.name}</span>
        </button>
    </div>
}
