export const styles: Record<string, React.CSSProperties> = {
    backdrop: {
        position: 'fixed',
        inset: 0,
        background: 'rgba(16, 24, 40, 0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        fontFamily: '"Inter", system-ui, sans-serif',
    },

    modal: {
        width: 'min(92vw, 500px)',
        maxHeight: '85vh',
        overflow: 'hidden',
        borderRadius: '20px',
        background: '#f8fafc',
        padding: '24px',
        boxShadow: '0 40px 120px rgba(0,0,0,0.25)',
        animation: 'zoomIn 0.25s ease-out',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e2e8f0',
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },

    title: {
        fontSize: '20px',
        fontWeight: 600,
        margin: 0,
        color: '#1e293b',
    },

    closeBtn: {
        background: '#f1f5f9',
        borderRadius: '8px',
        border: 'none',
        color: '#334155',
        padding: '6px',
        cursor: 'pointer',
        transition: 'background 0.2s ease-in-out',
    },

    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        overflowY: 'auto',
        paddingInline: '4px',
        marginBottom: '24px',
        maxHeight: '280px',
    },

    didRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '14px',
        background: '#ffffff',
        padding: '12px 16px',
        border: '1px solid #cbd5e1',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
    },

    didRowHover: {
        transform: 'scale(1.01)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        backgroundColor: '#f1f5f9',
    },

    didButton: {
        all: 'unset',
        cursor: 'pointer',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '14px',
        color: '#0f172a',
        flexGrow: 1,
    },

    didText: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },

    copyBtn: {
        marginLeft: '10px',
        border: 'none',
        cursor: 'pointer',
        color: '#1e293b',
        backgroundColor: '#f8fafc',
        padding: '4px 8px',
        fontSize: '13px',
        borderRadius: '8px',
        transition: 'all 0.2s ease-in-out',
    },

    cancelBtn: {
        marginTop: '10px',
        padding: '12px',
        fontSize: '15px',
        fontWeight: 600,
        borderRadius: '12px',
        border: 'none',
        backgroundColor: '#4f46e5',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background 0.2s ease-in-out',
        boxShadow: '0 2px 10px rgba(79,70,229,0.3)',
    },

    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '36px',
        fontFamily: 'Inter, sans-serif',
    },

    spinner: {
        width: '44px',
        height: '44px',
        animation: 'rotate 1.4s linear infinite',
    },

    circle: {
        fill: 'none',
        stroke: '#4f46e5',
        strokeWidth: 4,
        strokeLinecap: 'round',
        strokeDasharray: '80, 200',
        strokeDashoffset: 0,
        transformOrigin: 'center',
        animation: 'dash 1.4s ease-in-out infinite',
    },

    text: {
        fontSize: '14px',
        color: '#64748b',
        fontWeight: 500,
    },
}
