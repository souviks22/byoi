export const baseStyles: Record<string, React.CSSProperties> = {
    backdrop: {
        position: 'fixed',
        inset: 0,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        fontFamily: '"Inter", system-ui, sans-serif',
    },
    modal: {},
    title: {
        marginBottom: '20px',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        overflowY: 'auto',
        paddingInline: '10px',
        marginBottom: '24px',
        maxHeight: '260px',
    },
    didRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '14px',
        padding: '12px 16px',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
    },
    didRowHover: {
        transform: 'scale(1.01)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    },
    didBtn: {
        all: 'unset',
        cursor: 'pointer',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '14px',
        flexGrow: 1,
    },
    didText: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    preferredTag: {
        marginLeft: '10px',
        padding: '3px 10px',
        borderRadius: '9999px',
        fontSize: '13px',
        fontWeight: 600,
        fontFamily: '"Segoe UI", system-ui, sans-serif',
        display: 'inline-block',
        verticalAlign: 'middle',
        userSelect: 'none',
        letterSpacing: '0.3px',
        transition: 'all 0.2s ease',
        backdropFilter: 'blur(2px)',
    },
    cancelBtn: {
        marginTop: '10px',
        padding: '12px',
        fontSize: '15px',
        fontWeight: 600,
        borderRadius: '12px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background 0.2s ease-in-out',
        boxShadow: '0 2px 10px rgba(79,70,229,0.3)',
        backgroundColor: '#2563eb',
        color: '#ffffff',
    },
    loaderWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    loaderProgress: {
        margin: '15px',
        color: '#2563eb',
    },
    loaderText: {
        fontSize: '14px',
        fontWeight: 500,
    }
}

export const lightStyles: Record<string, React.CSSProperties> = {
    backdrop: { background: 'rgba(16, 24, 40, 0.6)' },
    modal: {
        background: '#ffffff',
        color: '#0f172a',
        padding: '24px',
        width: 'min(92vw, 500px)',
        maxHeight: '85vh',
        borderRadius: '20px',
        boxShadow: '0 40px 120px rgba(0,0,0,0.25)',
        animation: 'zoomIn 0.25s ease-out',
        display: 'flex',
        flexDirection: 'column',
    },
    title: { color: '#1e1e1e' },
    didRow: {
        backgroundColor: '#ffffff',
        border: '1px solid #cbd5e1',
    },
    didRowHover: {
        backgroundColor: '#f1f5f9',
    },
    didBtn: {
        color: '#0f172a',
    },
    preferredTag: {
        background: 'linear-gradient(135deg, #fefce8, #fcd34d)',
        color: '#92400e',
        border: '1px solid #fbbf24',
        boxShadow: '0 2px 6px rgba(251,191,36,0.25)',
    },
    loaderText: {
        color: '#64748b',
    },
}

export const darkStyles: Record<string, React.CSSProperties> = {
    backdrop: { background: 'rgba(0, 0, 0, 0.6)' },
    modal: {
        background: '#1e1e1e',
        color: '#ffffff',
        padding: '24px',
        width: 'min(92vw, 500px)',
        maxHeight: '85vh',
        borderRadius: '20px',
        boxShadow: '0 40px 120px rgba(0,0,0,0.5)',
        animation: 'zoomIn 0.25s ease-out',
        display: 'flex',
        flexDirection: 'column',
    },
    title: { color: '#f1f5f9' },
    didRow: {
        backgroundColor: '#60a5fa1a',
        border: '1px solid #475569',
    },
    didRowHover: {
        backgroundColor: '#121212',
    },
    didBtn: {
        color: '#ffffff',
    },
    preferredTag: {
        background: 'linear-gradient(135deg, #334155, #1e293b)',
        color: '#facc15',
        border: '1px solid #475569',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    },
    loaderText: {
        color: '#cbd5e1',
    },
}

const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches

export const styles = Object.fromEntries(
    Object.entries(baseStyles).map(([key, base]) => [
        key,
        {
            ...base,
            ...(isDark ? darkStyles[key] : lightStyles[key])
        }
    ])
)
