# SyncVideo-Interactive-Media-Player-with-Timestamped-Notes-Matrix
An interactive multimedia learning console combining a custom synchronized video player layer with a dynamic side-panel text matrix to map student timestamp markers smoothly.
Business Utility and Frontend Focus:
* Synchronized Playback Control: Showcases deep browser Event Object Model mastery by binding individual user text elements to precise, running media millisecond timestamps.
* Dual Viewport Interaction: Implements optimized component layout architectures where selecting an annotation index badge tells the custom player controller hooks to automatically update and jump playback tracks safely.

Project Structure
    
    syncvideo-learning-hub/
    ├── backend/
    │   └── main.py
    └── frontend/
        ├── src/
        │   ├── components/
        │   │   ├── VideoPlayerCore.jsx
        │   │   └── NotesTimelineMatrix.jsx
        │   └── App.jsx
        └── index.html

Core Technical Features
* Memory Leak Interception: Configured robust state clean-up loops inside active tracking structures to guarantee zero browser tab resource pollution or background thread bleeding.
* Asynchronous Sync Bridges: Backed by a high-speed Python 3.12 FastAPI validation router mapping runtime payloads safely into Supabase database containers.

Local Installation and Setup

Backend Framework Launch
1. Shift directories and launch the data storage endpoint:
   cd backend
   pip install fastapi uvicorn pydantic
   python main.py

Frontend Dev Compilation
1. Boot up the package installers and start your client compilation:
   cd ../frontend
   npm install
   npm run dev
