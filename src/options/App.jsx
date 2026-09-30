import { useState, useEffect } from 'react'
import { getShortcuts, saveShortcuts } from '../utils/storage'
import { AVAILABLE_ACTIONS } from '../utils/actions'
import { KeyRecorder } from './KeyRecorder'

function App() {
  const [shortcuts, setShortcuts] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentId, setCurrentId] = useState(null)

  // Form State
  const [formData, setFormData] = useState({ key: '', action: AVAILABLE_ACTIONS[0].value, label: '' })

  useEffect(() => {
    // Load shortcuts on mount
    getShortcuts().then(setShortcuts)
  }, [])

  const handleSave = async () => {
    if (!formData.key) {
      alert("Please set a shortcut key");
      return;
    }

    let newShortcuts;
    if (currentId) {
      // Edit existing
      newShortcuts = shortcuts.map(s => s.id === currentId ? { ...formData, id: currentId } : s)
    } else {
      // Add new
      newShortcuts = [...shortcuts, { ...formData, id: Date.now().toString() }]
    }

    await saveShortcuts(newShortcuts)
    setShortcuts(newShortcuts)
    resetForm()
  }

  const handleDelete = async (id) => {
    const newShortcuts = shortcuts.filter(s => s.id !== id)
    await saveShortcuts(newShortcuts)
    setShortcuts(newShortcuts)
  }

  const handleEdit = (shortcut) => {
    setFormData({ key: shortcut.key, action: shortcut.action, label: shortcut.label })
    setCurrentId(shortcut.id)
    setIsEditing(true)
  }

  const resetForm = () => {
    setFormData({ key: '', action: AVAILABLE_ACTIONS[0].value, label: '' })
    setCurrentId(null)
    setIsEditing(false)
  }

  return (
    <div className="container" style={{ position: 'relative' }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        paddingTop: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'var(--color-primary)',
            borderRadius: '6px'
          }} />
          <h1 style={{ margin: 0, fontSize: '24px', letterSpacing: '-0.5px' }}>Shortkey</h1>
        </div>
        {!isEditing && (
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
            + New Shortcut
          </button>
        )}
      </header>

      <main>
        {isEditing ? (
          <div style={{
            background: 'var(--color-surface)',
            padding: '24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)'
          }}>
            <h2 style={{ marginTop: 0 }}>{currentId ? 'Edit Shortcut' : 'New Shortcut'}</h2>

            <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Shortcut Key</label>
                <KeyRecorder
                  value={formData.key}
                  onChange={k => setFormData({ ...formData, key: k })}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Label</label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={e => setFormData({ ...formData, label: e.target.value })}
                  placeholder="My Custom Action"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    color: 'white',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>Action</label>
                <select
                  value={formData.action}
                  onChange={e => setFormData({ ...formData, action: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    color: 'white',
                    fontSize: '16px'
                  }}
                >
                  {AVAILABLE_ACTIONS.map(a => (
                    <option key={a.value} value={a.value}>{a.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={resetForm}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSave}>Save Shortcut</button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {shortcuts.map(shortcut => (
              <div key={shortcut.id} style={{
                background: 'var(--color-surface)',
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid transparent',
                transition: 'border-color 0.2s'
              }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
              >
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{shortcut.label || shortcut.action}</h3>
                  <code style={{
                    color: 'var(--color-primary)',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    background: 'rgba(28, 231, 131, 0.1)',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    {shortcut.key}
                  </code>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-ghost" onClick={() => handleEdit(shortcut)} style={{ fontSize: '14px', padding: '6px 12px' }}>Edit</button>
                  <button className="btn btn-ghost" onClick={() => handleDelete(shortcut.id)} style={{ fontSize: '14px', padding: '6px 12px', color: '#EF4444', borderColor: '#EF4444' }}>Delete</button>
                </div>
              </div>
            ))}

            {shortcuts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)' }}>
                No shortcuts configured. Click "New Shortcut" to add one.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App
