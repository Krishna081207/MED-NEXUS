# HealthMate AI Chatbot - Complete Setup Guide

A complete AI-powered health companion chatbot with React frontend and FastAPI backend using Google Gemini AI.

## 🎯 Features

- Real-time AI chat interface with beautiful UI
- Google Gemini AI integration for intelligent responses
- Conversation history management
- Error handling and fallback responses
- Health-focused AI assistant
- Professional medical disclaimer

## 📋 Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))

## 🚀 Quick Start

### 1. Backend Setup

```bash
# Navigate to backend directory
cd "MED-NEXUS(ORO)/backend/fastapi_app"

# Install Python dependencies
pip install -r requirements.txt

# The .env file is already configured with your API key
# If you need to use a different key, edit .env

# Start the backend server
python main.py
```

The backend API will be available at: http://localhost:8000

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd "MED-NEXUS(ORO)/HealthMate - AI Health Companion"

# Install dependencies
npm install

# The .env file is already configured
# Start the development server
npm run dev
```

The frontend will be available at: http://localhost:5173

## 🔧 Configuration

### Backend (.env in fastapi_app/)
```env
GEMINI_API_KEY=your_actual_api_key_here
```

### Frontend (.env in HealthMate - AI Health Companion/)
```env
VITE_API_URL=http://localhost:8000
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## 📁 Project Structure

```
MED-NEXUS(ORO)/
├── backend/
│   └── fastapi_app/
│       ├── main.py              # FastAPI application
│       ├── requirements.txt     # Python dependencies
│       ├── .env                 # Environment variables
│       └── README.md           # Backend documentation
│
└── HealthMate - AI Health Companion/
    ├── src/
    │   ├── components/
    │   │   └── Chatbot.tsx     # Simple chatbot component
    │   ├── react-app/
    │   │   └── pages/
    │   │       └── Chat.tsx    # Full-featured chat page
    │   └── services/
    │       └── chatService.ts  # API service for chat
    ├── .env                     # Frontend environment variables
    └── package.json            # Node.js dependencies
```

## 🎨 Available Chat Components

### 1. Simple Chatbot Component
Location: `src/components/Chatbot.tsx`
- Basic chat interface
- Easy to integrate into any page
- Minimal styling

### 2. Full-Featured Chat Page
Location: `src/react-app/pages/Chat.tsx`
- Complete chat experience
- Beautiful UI with gradients
- Navigation included
- Message bubbles with avatars
- Loading states

## 🧪 Testing the API

### Health Check
```bash
curl http://localhost:8000/api/health
```

### Send a Chat Message
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "Hello, how are you?"}
    ]
  }'
```

## 🔌 API Endpoints

### GET /
- Returns API status and version

### POST /api/chat
- Request body:
  ```json
  {
    "messages": [
      {"role": "user", "content": "Your message here"}
    ]
  }
  ```
- Response:
  ```json
  {
    "message": "AI response here",
    "error": null
  }
  ```

### GET /api/health
- Returns health status and configuration check

## 🎯 Usage Examples

### Using the Chat Service in React

```typescript
import { chatWithAI } from '@/services/chatService';

const response = await chatWithAI("Hello, I need health advice", [
  { role: 'user', parts: 'Previous message' },
  { role: 'model', parts: 'Previous response' }
]);
```

### Checking API Health

```typescript
import { checkAPIHealth } from '@/services/chatService';

const isHealthy = await checkAPIHealth();
if (isHealthy) {
  console.log('API is ready!');
}
```

## 🛠️ Troubleshooting

### Backend won't start
- Check if port 8000 is already in use
- Verify Python dependencies are installed
- Check if GEMINI_API_KEY is set in .env

### Frontend can't connect to backend
- Ensure backend is running on port 8000
- Check VITE_API_URL in frontend .env
- Verify CORS settings in main.py

### AI responses are generic
- Verify GEMINI_API_KEY is valid
- Check API quota in Google AI Studio
- Review error messages in backend logs

## 🚦 Running Both Services

**Terminal 1 (Backend):**
```bash
cd "MED-NEXUS(ORO)/backend/fastapi_app"
python main.py
```

**Terminal 2 (Frontend):**
```bash
cd "MED-NEXUS(ORO)/HealthMate - AI Health Companion"
npm run dev
```

## 📝 Important Notes

- **Not Medical Advice**: This chatbot is for informational purposes only
- **Data Privacy**: Conversations are not stored permanently
- **API Costs**: Google Gemini API may have usage costs
- **Rate Limits**: Be aware of API rate limits

## 🎉 You're Ready!

Visit http://localhost:5173/chat to start chatting with your AI health companion!

## 🤝 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Verify all environment variables are set
3. Ensure both backend and frontend are running
4. Check browser console for errors
5. Check terminal logs for backend errors
