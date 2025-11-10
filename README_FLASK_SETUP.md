# Gujarat Travel Planner - Flask Integration Setup

Complete guide to connect your React frontend with Flask Python backend.

## 🚀 Quick Start

### 1. Frontend Setup (React)

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and set your Flask URL
# VITE_FLASK_API_URL=http://localhost:5000

# Start frontend
npm run dev
```

Frontend will run at: http://localhost:8080

### 2. Backend Setup (Flask)

```bash
# Install Python dependencies
pip install -r requirements.txt

# Run Flask server
python flask_backend_example.py
```

Backend will run at: http://localhost:5000

## 📁 Project Structure

```
gujarat-travel-planner/
├── src/                          # React frontend
│   ├── components/              # UI components
│   │   ├── Hero.tsx            # Search & itinerary generation
│   │   ├── AIAssistant.tsx     # AI chat interface
│   │   └── ...
│   ├── lib/
│   │   └── api.ts              # Flask API integration
│   └── pages/
│       └── Index.tsx           # Main page
│
├── flask_backend_example.py     # Flask server (starter)
├── requirements.txt             # Python dependencies
├── .env.example                # Environment template
└── FLASK_INTEGRATION.md        # Detailed API docs
```

## 🔌 API Endpoints

Your Flask backend needs these endpoints:

### 1. Chat with AI
- **POST** `/api/chat`
- Handles conversational AI for travel planning
- See `FLASK_INTEGRATION.md` for details

### 2. Search Destinations
- **GET** `/api/search?destination=...&activity=...`
- Search Gujarat destinations

### 3. Generate Itinerary
- **POST** `/api/generate-itinerary`
- AI-powered itinerary generation

### 4. Destination Details
- **GET** `/api/destinations/:id`
- Get specific destination info

## 🤖 AI Model Integration

### Option 1: OpenAI GPT

```python
import openai

openai.api_key = "your-api-key"

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a Gujarat travel guide."},
        {"role": "user", "content": user_message}
    ]
)
```

### Option 2: Google Gemini

```python
import google.generativeai as genai

genai.configure(api_key="your-api-key")
model = genai.GenerativeModel('gemini-pro')
response = model.generate_content(user_message)
```

### Option 3: Local/Custom Model

Integrate your own trained models or use Hugging Face models.

## 💾 Database Setup (Optional)

### SQLite (Simplest)

```python
import sqlite3

conn = sqlite3.connect('gujarat_travel.db')
# Create tables and store destinations
```

### PostgreSQL (Production)

```python
from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:pass@localhost/db'
db = SQLAlchemy(app)
```

## 🔐 Environment Variables

### Frontend (.env)
```env
VITE_FLASK_API_URL=http://localhost:5000
```

### Backend (.env for Flask)
```env
OPENAI_API_KEY=your-openai-key
DATABASE_URL=your-database-url
FLASK_ENV=development
```

## 🧪 Testing the Integration

1. **Start both servers**
   - Frontend: `npm run dev` (port 8080)
   - Backend: `python flask_backend_example.py` (port 5000)

2. **Test chat**
   - Open http://localhost:8080
   - Scroll to AI Assistant
   - Type a message and check Flask terminal for requests

3. **Test search**
   - Fill in the hero search form
   - Click "Plan My Adventure"
   - Check if itinerary dialog opens

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
# Set environment variable: VITE_FLASK_API_URL=https://your-flask-api.com
```

### Backend (Heroku/Railway/DigitalOcean)
```bash
# Add Procfile
echo "web: python flask_backend_example.py" > Procfile

# Deploy to your platform
# Update frontend .env with deployed Flask URL
```

## 📚 Full API Documentation

See `FLASK_INTEGRATION.md` for:
- Complete endpoint specifications
- Request/response examples
- Error handling
- CORS configuration
- Production deployment tips

## 🐛 Troubleshooting

### CORS Errors
- Make sure Flask-CORS is installed
- Check CORS configuration in Flask app

### Connection Refused
- Verify Flask is running on port 5000
- Check `.env` file has correct URL

### AI Not Responding
- Verify AI API key is set
- Check Flask console for errors
- Ensure API credits/quota available

## 📞 Support

For detailed integration help, see:
- `FLASK_INTEGRATION.md` - Complete API guide
- `flask_backend_example.py` - Starter backend code
- React components in `src/components/` - Frontend implementation

## ✅ Next Steps

1. ✅ Frontend running
2. ✅ Flask backend running  
3. ⬜ Integrate your AI model
4. ⬜ Add database for destinations
5. ⬜ Implement user authentication (optional)
6. ⬜ Deploy to production

Happy coding! 🎉
