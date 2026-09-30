import { useState } from 'react'

function App() {
  const [enabled, setEnabled] = useState(true)

  return (
    <div style={{ width: '300px', padding: '16px', background: 'var(--color-bg)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '18px' }}>Shortkey</h2>
        <div
          onClick={() => setEnabled(!enabled)}
          style={{
            width: '40px',
            height: '22px',
            background: enabled ? 'var(--color-primary)' : 'var(--color-surface)',
            borderRadius: '11px',
            position: 'relative',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
        >
          <div style={{
            width: '18px',
            height: '18px',
            background: '#fff',
            borderRadius: '50%',
            position: 'absolute',
            top: '2px',
            left: enabled ? '20px' : '2px',
            transition: 'left 0.2s'
          }} />
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          {enabled ? 'Shortkeys are active on this page' : 'Shortkeys are disabled'}
        </p>
        <button className="btn btn-ghost" style={{ width: '100%', marginTop: '12px' }} onClick={() => {
          if (chrome.runtime && chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
          } else {
            window.open('/src/options/index.html', '_blank');
          }
        }}>
          Open Settings
        </button>
      </div>
    </div>
  )
}

export default App
