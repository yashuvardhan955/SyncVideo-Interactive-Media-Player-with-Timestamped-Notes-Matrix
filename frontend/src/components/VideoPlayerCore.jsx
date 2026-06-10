import React, { useRef, useEffect, useState } from 'react';

export default function VideoPlayerCore({ videoUrl, onTimestampCapture, jumpTriggerTime }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (jumpTriggerTime !== null && videoRef.current) {
      videoRef.current.currentTime = jumpTriggerTime;
      if (!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [jumpTriggerTime]);

  const togglePlaybackState = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdateTracking = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadataConfig = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const captureCurrentTimeNode = () => {
    if (!videoRef.current) return;
    onTimestampCapture(videoRef.current.currentTime);
  };

  return (
    <div style={{ background: '#1c1917', padding: '24px', borderRadius: '12px', border: '1px solid #292524', width: '100%', boxSizing: 'border-box' }}>
      <video 
        ref={videoRef}
        src={videoUrl}
        onTimeUpdate={handleTimeUpdateTracking}
        onLoadedMetadata={handleLoadedMetadataConfig}
        style={{ width: '100%', borderRadius: '8px', background: '#0c0a09', aspectRatio: '16/9' }}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px', gap: '16px' }}>
        <button onClick={togglePlaybackState} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
          {isPlaying ? 'Pause Lesson' : 'Start Lesson Video'}
        </button>
        <div style={{ fontFamily: 'monospace', fontSize: '14px', color: '#a8a29e' }}>
          Timestamp: {Math.floor(currentTime)}s / {Math.floor(duration)}s
        </div>
        <button onClick={captureCurrentTimeNode} style={{ background: '#fafafa', color: '#1c1917', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
          Stamp Active Frame Note
        </button>
      </div>
    </div>
  );
}
