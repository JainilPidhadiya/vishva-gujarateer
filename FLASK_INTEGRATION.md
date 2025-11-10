# Flask Backend Integration Guide

This guide explains how to integrate your Flask Python backend with the Gujarat Travel Planner frontend.

## Environment Setup

### 1. Create a `.env` file in the root directory:

```env
VITE_FLASK_API_URL=http://localhost:5000
```

For production, replace with your deployed Flask URL.

## Required Flask Endpoints

Your Flask application needs to implement the following API endpoints:

### 1. Chat Endpoint - `/api/chat` (POST)

Handles AI-powered chat conversations.

**Request Body:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Tell me about Gujarat"
    }
  ]
}
```

**Response:**
```json
{
  "message": "Gujarat is a vibrant state in western India..."
}
```

**Python Example:**
```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    messages = data.get('messages', [])
    
    # Integrate your AI model here (OpenAI, Google AI, etc.)
    # Process the conversation and generate a response
    
    response_message = your_ai_model.generate_response(messages)
    
    return jsonify({
        'message': response_message
    })
```

### 2. Search Endpoint - `/api/search` (GET)

Search for destinations based on user criteria.

**Query Parameters:**
- `destination` (optional): Destination name
- `activity` (optional): Activity type
- `date` (optional): Travel date
- `budget` (optional): Budget range

**Response:**
```json
{
  "results": [
    {
      "id": "1",
      "name": "Somnath Temple",
      "description": "Ancient temple by the sea",
      "category": "Religious",
      "rating": 4.8
    }
  ]
}
```

**Python Example:**
```python
@app.route('/api/search', methods=['GET'])
def search_destinations():
    destination = request.args.get('destination')
    activity = request.args.get('activity')
    date = request.args.get('date')
    budget = request.args.get('budget')
    
    # Query your database or use your search algorithm
    results = search_database(destination, activity, date, budget)
    
    return jsonify({
        'results': results
    })
```

### 3. Generate Itinerary - `/api/generate-itinerary` (POST)

Generate a personalized travel itinerary using AI.

**Request Body:**
```json
{
  "destination": "Gujarat",
  "activity": "temples and beaches",
  "date": "December 2024",
  "budget": "$1000"
}
```

**Response:**
```json
{
  "itinerary": [
    {
      "day": 1,
      "title": "Ahmedabad Exploration",
      "description": "Visit Sabarmati Ashram and local markets"
    },
    {
      "day": 2,
      "title": "Somnath Temple",
      "description": "Ancient temple visit and sunset by the sea"
    }
  ]
}
```

**Python Example:**
```python
@app.route('/api/generate-itinerary', methods=['POST'])
def generate_itinerary():
    data = request.json
    
    # Use your AI model to generate personalized itinerary
    prompt = f"""Generate a {data.get('duration', '5')}-day itinerary for Gujarat 
    focusing on {data.get('activity', 'sightseeing')} 
    with budget {data.get('budget', 'moderate')}"""
    
    itinerary = your_ai_model.generate_itinerary(prompt)
    
    return jsonify({
        'itinerary': itinerary
    })
```

### 4. Destination Details - `/api/destinations/<id>` (GET)

Get detailed information about a specific destination.

**Response:**
```json
{
  "id": "1",
  "name": "Somnath Temple",
  "description": "Detailed description...",
  "location": "Somnath, Gujarat",
  "bestTime": "October to March",
  "attractions": ["Temple", "Beach", "Museum"],
  "images": ["url1", "url2"]
}
```

**Python Example:**
```python
@app.route('/api/destinations/<destination_id>', methods=['GET'])
def get_destination_details(destination_id):
    # Query your database
    destination = get_destination_from_db(destination_id)
    
    return jsonify(destination)
```

## Complete Flask App Example

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai  # or your preferred AI library

app = Flask(__name__)
CORS(app)

# Configure your AI model
openai.api_key = "your-api-key"

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    messages = data.get('messages', [])
    
    # Call your AI model
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful Gujarat travel guide."},
            *messages
        ]
    )
    
    return jsonify({
        'message': response.choices[0].message.content
    })

@app.route('/api/search', methods=['GET'])
def search_destinations():
    # Implement your search logic
    pass

@app.route('/api/generate-itinerary', methods=['POST'])
def generate_itinerary():
    # Implement your itinerary generation
    pass

@app.route('/api/destinations/<destination_id>', methods=['GET'])
def get_destination_details(destination_id):
    # Implement destination details
    pass

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

## Running Your Application

1. **Start Flask backend:**
```bash
python app.py
```

2. **Start React frontend:**
```bash
npm run dev
```

3. **Access the application:**
- Frontend: http://localhost:8080
- Backend: http://localhost:5000

## CORS Configuration

Make sure to install Flask-CORS:
```bash
pip install flask-cors
```

For production, configure CORS properly:
```python
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://your-frontend-domain.com"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})
```

## Error Handling

Add proper error handling in your Flask routes:

```python
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500
```

## AI Model Integration Options

You can use any AI service:
- **OpenAI GPT**: For chat and itinerary generation
- **Google Gemini**: Alternative AI model
- **Anthropic Claude**: Another option
- **Custom Models**: Your own trained models

## Database Integration

Connect to your preferred database:
- **SQLite**: Simple file-based database
- **PostgreSQL**: Production-ready relational database
- **MongoDB**: Document-based database
- **Firebase**: Real-time database

## Next Steps

1. Implement the Flask endpoints listed above
2. Connect your AI model for chat functionality
3. Add database for storing destinations and user data
4. Implement authentication if needed
5. Deploy both frontend and backend to production

## Support

If you need help integrating specific features, refer to:
- Flask documentation: https://flask.palletsprojects.com/
- OpenAI API docs: https://platform.openai.com/docs
- CORS setup: https://flask-cors.readthedocs.io/
