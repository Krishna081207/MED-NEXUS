# MED-NEXUS (HealthMate)

AI-powered health companion with chat, health assessment, report analysis, and doctor connections.

## Features

- **AI Health Chat** – Talk to an AI assistant about health concerns
- **Health Assessment** – Describe symptoms for AI-powered mental & physical health analysis
- **Report Analysis** – Upload PDF health reports for instant AI insights
- **Doctor Directory** – Browse and connect with healthcare professionals

## Quick Start

### 1. Backend

```bash
cd backend/fastapi_app
pip install -r requirements.txt
python main.py
```

Backend runs at: http://localhost:8000

### 2. Frontend

```bash
cd "HealthMate - AI Health Companion"
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

### Windows One-Click

Double-click `start_app.bat` to launch both backend and frontend in separate terminals.

## Configuration

- **Backend** (`backend/fastapi_app/.env`): Set `GEMINI_API_KEY` for AI features ([Get key](https://makersuite.google.com/app/apikey))
- **Frontend** (`HealthMate - AI Health Companion/.env`): Set `VITE_API_URL=http://localhost:8000` if needed

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/chat` | POST | AI chat |
| `/api/assess-health` | POST | Health assessment |
| `/api/analyze-report` | POST | PDF report analysis |

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind, Radix UI
- **Backend**: FastAPI, LangChain, Google Gemini
- **PDF**: PyPDF2 for report text extraction

---

⚠️ Not a substitute for professional medical advice. Always consult healthcare providers.
