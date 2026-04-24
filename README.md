🚨 Thief Detect
Real-Time Face Detection & Criminal Identification System
📌 Overview

Thief Detect is a real-time surveillance system that uses computer vision and AI to detect human faces from live CCTV/Wi-Fi camera streams and match them against a criminal database.

When a match is found, the system automatically generates alerts and displays them on a web-based dashboard for monitoring and investigation.

🎯 Key Features
🔐 User Authentication (Admin / Police)
📹 Live Camera Monitoring (RTSP / Webcam)
🧠 Face Detection & Recognition (AI Engine)
🗂 Criminal Database Management
🚨 Real-Time Alert Generation
📊 Dashboard Analytics (alerts, cameras, stats)
🌐 Web-based interface (React)
🏗 System Architecture
Wi-Fi Camera (RTSP)
        ↓
Python AI Engine (OpenCV + Face Recognition)
        ↓
Matching Engine (Embeddings)
        ↓
Supabase Database (PostgreSQL)
        ↓
Node.js Backend API
        ↓
React Dashboard (Frontend)
🛠 Tech Stack
👨‍💻 Frontend
React (Vite)
React Router
Axios
Lucide Icons
Pure CSS
⚙ Backend
Node.js
Express.js
Nodemon
🧠 AI Engine (Upcoming)
Python 3.x
OpenCV
face_recognition (dlib)
NumPy
🗄 Database
Supabase (PostgreSQL)
Supabase Auth
🔧 Tools
VS Code
Git & GitHub
📁 Project Structure
thief-detect/
│
├── frontend/          # React dashboard
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── services/
│       └── styles/
│
├── backend/           # Node.js API
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── middleware/
│       └── server.js
│
├── ai-engine/         # Python AI (later)
├── database/          # SQL scripts
├── assets/            # Images, screenshots
├── docs/              # Documentation
│
├── .gitignore
├── package.json       # root runner
└── README.md
🚀 Getting Started
1. Clone the repository
git clone https://github.com/YOUR_USERNAME/Thief-Detect.git
cd Thief-Detect
2. Install all dependencies
npm run install-all
3. Run full project (Frontend + Backend)
npm run dev
4. Open in browser

Frontend:

http://localhost:5173

Backend API:

http://localhost:5000/api/health
⚙ Environment Variables
🔹 Frontend (frontend/.env)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
🔹 Backend (backend/.env)
PORT=5000
🧪 API Endpoint

Test backend:

GET /api/health

Response:

{
  "success": true,
  "message": "Thief Detect API is running"
}
📸 Screenshots (Add Later)
Dashboard
Alert History
Camera Management
Criminal Database
🔮 Future Work
🔗 Integrate Python AI engine
📡 RTSP camera streaming
🧠 Real-time face recognition
🔔 Push notifications (SMS / Email)
🗺 Map-based surveillance view
🔐 Advanced security (JWT, MFA)
⚡ Performance optimization
⚠ Limitations
Prototype-level system
No GPU acceleration yet
Limited real-world testing
Basic alert notification system
👨‍💻 Author

Dimantha Sheshan
BSc (Hons) Computer Science

📜 License

This project is for academic purposes only.

⭐ Support

If you like this project:

⭐ Star the repo
🍴 Fork it
🚀 Build on top of it
🔥 Quick Commands
# Run everything
npm run dev

# Run only frontend
npm run frontend

# Run only backend
npm run backend
