import { styles } from './styles'

export default function Loader() {
  return (
    <div style={styles.wrapper}>
      <svg style={styles.spinner} viewBox="25 25 50 50">
        <circle style={styles.circle} cx="50" cy="50" r="20" />
      </svg>
      <div style={styles.text}>Authenticating...</div>
    </div>
  )
}
