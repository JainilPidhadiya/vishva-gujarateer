"""
Gujarat Travel Planner - Flask Backend Example
This is a starter Flask backend that connects with your React frontend.

Installation:
pip install flask flask-cors openai

Usage:
python flask_backend_example.py
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
# Enable CORS for all routes
CORS(app)

# ===========================
# Configuration
# ===========================
# Set your OpenAI API key or other AI service credentials
# os.environ['OPENAI_API_KEY'] = 'your-key-here'

# ===========================
# Sample Data (Replace with Database)
# ===========================
destinations_db = [
    {
        "id": "1",
        "name": "Somnath Temple",
        "description": "One of the twelve Jyotirlinga shrines of Lord Shiva",
        "category": "Religious",
        "rating": 4.8,
        "location": "Somnath, Gujarat",
        "bestTime": "October to March"
    },
    {
        "id": "2",
        "name": "Statue of Unity",
        "description": "World's tallest statue at 182 meters",
        "category": "Monument",
        "rating": 4.9,
        "location": "Kevadia, Gujarat",
        "bestTime": "October to February"
    },
    {
        "id": "3",
        "name": "Gir National Park",
        "description": "Only natural habitat of Asiatic lions",
        "category": "Wildlife",
        "rating": 4.7,
        "location": "Gir, Gujarat",
        "bestTime": "December to March"
    }
]

# ===========================
# API Routes
# ===========================

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Handle AI chat conversations
    
    Request: { "messages": [{"role": "user", "content": "..."}] }
    Response: { "message": "AI response" }
    """
    try:
        data = request.json
        messages = data.get('messages', [])
        
        if not messages:
            return jsonify({'error': 'No messages provided'}), 400
        
        # Get the last user message
        last_message = messages[-1]['content']
        
        # TODO: Replace with your AI model (OpenAI, Gemini, etc.)
        # Example with OpenAI:
        # import openai
        # response = openai.ChatCompletion.create(
        #     model="gpt-4",
        #     messages=[
        #         {"role": "system", "content": "You are a helpful Gujarat travel guide."},
        #         *messages
        #     ]
        # )
        # ai_response = response.choices[0].message.content
        
        # For now, return a sample response
        ai_response = f"I received your message: '{last_message}'. I'm a sample response. Please integrate your AI model to provide real responses about Gujarat travel planning."
        
        return jsonify({
            'message': ai_response
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/search', methods=['GET'])
def search_destinations():
    """
    Search destinations based on query parameters
    
    Query params: destination, activity, date, budget
    Response: { "results": [...] }
    """
    try:
        destination = request.args.get('destination', '').lower()
        activity = request.args.get('activity', '').lower()
        
        # Simple search implementation
        results = destinations_db
        
        if destination:
            results = [d for d in results if destination in d['name'].lower() or destination in d['description'].lower()]
        
        if activity:
            results = [d for d in results if activity in d['category'].lower()]
        
        return jsonify({
            'results': results
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/generate-itinerary', methods=['POST'])
def generate_itinerary():
    """
    Generate a personalized travel itinerary
    
    Request: { "destination": "...", "activity": "...", "date": "...", "budget": "..." }
    Response: { "itinerary": [{"day": 1, "title": "...", "description": "..."}] }
    """
    try:
        data = request.json
        destination = data.get('destination', 'Gujarat')
        activity = data.get('activity', 'sightseeing')
        duration = data.get('duration', 5)
        
        # TODO: Use AI to generate personalized itinerary
        # Sample itinerary response
        sample_itinerary = [
            {
                "day": 1,
                "title": "Ahmedabad Arrival",
                "description": "Arrive in Ahmedabad, visit Sabarmati Ashram, explore local markets, try authentic Gujarati thali"
            },
            {
                "day": 2,
                "title": "Statue of Unity",
                "description": "Full day trip to the world's tallest statue, visit surrounding attractions and museum"
            },
            {
                "day": 3,
                "title": "Dwarka Temple",
                "description": "Visit the ancient Dwarkadhish Temple, explore the coastal town and beaches"
            },
            {
                "day": 4,
                "title": "Gir National Park",
                "description": "Safari experience to spot Asiatic lions, visit interpretation zone"
            },
            {
                "day": 5,
                "title": "Rann of Kutch",
                "description": "Experience the magical white desert, enjoy sunset, cultural performances"
            }
        ]
        
        return jsonify({
            'itinerary': sample_itinerary[:duration]
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/destinations/<destination_id>', methods=['GET'])
def get_destination_details(destination_id):
    """
    Get detailed information about a specific destination
    
    Response: { "id": "...", "name": "...", ... }
    """
    try:
        destination = next((d for d in destinations_db if d['id'] == destination_id), None)
        
        if not destination:
            return jsonify({'error': 'Destination not found'}), 404
        
        return jsonify(destination)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Gujarat Travel Planner API is running'
    })


# ===========================
# Error Handlers
# ===========================

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500


# ===========================
# Run Server
# ===========================

if __name__ == '__main__':
    print("=" * 50)
    print("Gujarat Travel Planner - Flask Backend")
    print("=" * 50)
    print("Server running at: http://localhost:5000")
    print("\nAvailable endpoints:")
    print("  POST /api/chat - AI chat conversations")
    print("  GET  /api/search - Search destinations")
    print("  POST /api/generate-itinerary - Generate travel plans")
    print("  GET  /api/destinations/<id> - Get destination details")
    print("  GET  /health - Health check")
    print("\nMake sure to:")
    print("  1. Install dependencies: pip install flask flask-cors openai")
    print("  2. Set up your AI model API keys")
    print("  3. Create .env file with VITE_FLASK_API_URL=http://localhost:5000")
    print("=" * 50)
    
    app.run(debug=True, host='0.0.0.0', port=5000)
