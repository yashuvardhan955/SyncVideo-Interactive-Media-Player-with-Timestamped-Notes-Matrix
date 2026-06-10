import React, { useState, useCallback } from 'react';
import VideoPlayerCore from './components/VideoPlayerCore';
import NotesTimelineMatrix from './components/NotesTimelineMatrix';

export default function App() {
  const [notes, setNotes] = useState([
    { id: '1', timestamp: 12.4, text: 'Core React 18 Concurrent Rendering overview snippet assignment.' },
    { id: '2', timestamp: 45.2, text: 'Crucial structural execution checkpoint breaking down Vite bundling patterns.' }
  ]);
  const [inputNote, setInputNote] = useState('');
  const [activeFrameTime, setActiveFrameTime] = useState(0);
  const [jumpTime, setJumpTime] = useState(null);

  const handleCaptureRegistration = useCallback((capturedSeconds) => {
    setActiveFrameTime(capturedSeconds);
  }, []);

  const saveNotePayloadNode = async () => {
    if (!inputNote.strip()) return;
    const freshPayloadNode = {
      id: Date.now().toString(),
      timestamp: activeFrameTime,
      text: inputNote
    };

    setNotes((prev) => [...prev, freshPayloadNode].sort((a, b) => a.timestamp - b.timestamp));
    setInputNote('');

    try {
      await fetch('http://localhost:8004/api/v1/lessons/sync-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configuration_payload: freshPayloadNode })
      });
    } catch (err) {
      console.error('Remote data stream synchronizer encountered an anomaly loop:', err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', backgroundColor: '#0c0a09', fontFamily: 'system-ui, sans-serif', overflow: 'hidden' }}>
      <header style={{ height: '64px', background: '#1c1917', borderBottom: '1px solid #292524', display: 'flex', alignItems: 'center', padding: '0 24px', boxSizing: 'border-box' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#f5f5f4', margin: 0 }}>SyncVideo Classroom Hub</h2>
          <p style={{ margin: 0, fontSize: '11px', color: '#78716c' }}>Dynamic media viewport streaming runtime mapping telemetry logs into timeline parameters</p>
        </div>
      </header>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', width: '100%' }}>
        <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
          <VideoPlayerCore videoUrl="https://www.w3schools.com/html/mov_bbb.mp4" onTimestampCapture={handleCaptureRegistration} jumpTriggerTime={jumpTime} />
          <div style={{ display: 'flex', gap: '12px', background: '#1c1917', padding: '16px', borderRadius: '8px', border: '1px solid #292524' }}>
            <input type="text" value={inputNote} onChange={(e) => setInputNote(e.target.value)} placeholder="Type classroom index note block details here..." style={{ flex: 1, background: '#0c0a09', border: '1px solid #44403c', padding: '12px', color: '#fff', borderRadius: '6px', outline: 'none' }} />
            <button onClick={saveNotePayloadNode} style={{ background: '#fff', color: '#000', border: 'none', padding: '0 24px', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer' }}>
              Commit Note
            </button>
          </div>
        </div>
        <NotesTimelineMatrix notesList={notes} onMarkerClick={setJumpTime} activeTimelineStamp={activeFrameTime} />
      </div>
    </div>
  );
}
