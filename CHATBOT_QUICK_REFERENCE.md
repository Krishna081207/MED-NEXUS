# HealthMate Chatbot - Quick Reference

## 🚀 Quick Start (Windows)
```bash
# Double-click this file:
start_chatbot.bat
```

## 🚀 Quick Start (Mac/Linux)
```bash
chmod +x start_chatbot.sh
./start_chatbot.sh
```

## 📍 URLs
- Frontend: http://localhost:5173
- Chat Page: http://localhost:5173/chat
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 🔑 Key Files

### Backend
- `MED-NEXUS(ORO)/backend/fastapi_app/main.py` - API server
- `MED-NEXUS(ORO)/backend/fastapi_app/.env` - API key configuration

### Frontend
- `MED-NEXUS(ORO)/HealthMate - AI Health Companion/src/react-app/pages/Chat.tsx` - Main chat UI
- `MED-NEXUS(ORO)/HealthMate - AI Health Companion/src/components/Chatbot.tsx` - Simple chatbot
- `MED-NEXUS(ORO)/HealthMate - AI Health Companion/src/services/chatService.ts` - API client

## 🛠️ Manual Start

### Backend (Terminal 1)
```bash
cd "MED-NEXUS(ORO)/backend/fastapi_app"
pip install -r requirements.txt
python main.py
```

### Frontend (Terminal 2)
```bash
cd "MED-NEXUS(ORO)/HealthMate - AI Health Companion"
npm install
npm run dev
```

## 🧪 Test Commands

### Test Backend
```bash
curl http://localhost:8000/api/health
```

### Test Chat
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello"}]}'
```

## 🔧 Common Issues

### Port Already in Use
```bash
# Windows - Kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Mac/Linux - Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

### Missing Dependencies
```bash
# Backend
pip install -r requirements.txt

# Frontend
npm install
```

### Environment Variables Not Set
Check these files exist:
- `backend/fastapi_app/.env`
- `HealthMate - AI Health Companion/.env`

## 📝 API Integration

```typescript
// Import the service
import { chatWithAI } from '@/services/chatService';

// Send a message
const response = await chatWithAI("Your message here", conversationHistory);

// Check API health
import { checkAPIHealth } from '@/services/chatService';
const isHealthy = await checkAPIHealth();
```

## 🎯 Features

✅ Real-time AI chat
✅ Conversation history
✅ Error handling
✅ Beautiful UI with animations
✅ Loading states
✅ Health-focused responses
✅ Professional disclaimers

## 🔐 Security Notes

- Never commit `.env` files with real API keys
- Use environment variables for sensitive data
- API keys are in `.env` files (gitignored)

## 📚 Full Documentation

See `CHATBOT_SETUP_GUIDE.md` for complete documentation.
