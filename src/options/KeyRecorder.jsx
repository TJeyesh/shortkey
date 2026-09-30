import { useState, useEffect, useRef } from 'react';
import { normalizeKeyEvent } from '../utils/keys';

export function KeyRecorder({ value, onChange, placeholder = "Click to record..." }) {
    const [isRecording, setIsRecording] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (!isRecording) return;

        const handleKeyDown = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const normalized = normalizeKeyEvent(e);
            if (normalized) {
                onChange(normalized);
                setIsRecording(false);
                inputRef.current?.blur();
            }
        };

        // We attach to window to catch all keys while focused, 
        // ensuring we don't miss anything or get stuck.
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isRecording, onChange]);

    return (
        <input
            ref={inputRef}
            type="text"
            value={isRecording ? 'Listening...' : value}
            placeholder={placeholder}
            onFocus={() => setIsRecording(true)}
            onBlur={() => setIsRecording(false)}
            readOnly
            style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                background: isRecording ? 'rgba(28, 231, 131, 0.1)' : 'var(--color-bg)',
                border: `1px solid ${isRecording ? 'var(--color-primary)' : 'var(--color-border)'}`,
                color: isRecording ? 'var(--color-primary)' : 'white',
                fontSize: '16px',
                cursor: 'pointer',
                textAlign: 'center',
                fontFamily: 'monospace'
            }}
        />
    );
}
