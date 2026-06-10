import React from 'react';

export default function NotesTimelineMatrix({ notesList, onMarkerClick, activeTimelineStamp }) {
  const containerStyle = {
    background: '#1c1917',
    borderLeft: '1px solid #292524',
    padding: '24px',
    color: '#e7e5e4',
    boxSizing: 'border-box',
    width: '360px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    overflowY: 'auto'
  };

  return (
    <div style={containerStyle}>
      <h3 style={{ margin: 0, fontSize: '16px', color: '#f5f5f4', fontWeight: '600', borderBottom: '1px solid #292524', paddingBottom: '12px' }}>
        Interactive Stamped Matrix
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        {notesList.length === 0 ? (
          <span style={{ color: '#78716c', fontSize: '13px', fontStyle: 'italic' }}>
            No interactive video notes stamped inside this frame context loop block.
          </span>
        ) : (
          notesList.map((note) => {
            const isTargetActive = Math.floor(activeTimelineStamp) === Math.floor(note.timestamp);
            return (
              <div 
                key={note.id}
                onClick={() => onMarkerClick(note.timestamp)}
                style={{ 
                  padding: '14px', 
                  background: isTargetActive ? '#1e3a8a' : '#0c0a09', 
                  border: `1px solid ${isTargetActive ? '#3b82f6' : '#292524'}`, 
                  borderRadius: '8px', 
                  cursor: 'pointer', 
                  transition: 'all 0.15s ease-out' 
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', background: '#292524', padding: '2px 6px', borderRadius: '4px', color: '#38bdf8', fontFamily: 'monospace' }}>
                    Frame Node: {Math.floor(note.timestamp)}s
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: '#e7e5e4', lineHeight: '1.4' }}>
                  {note.text}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
