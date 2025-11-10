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
# Enable CORS for all routes with logging
CORS(app, resources={r"/api/*": {"origins": "*"}})
app.logger.setLevel("DEBUG")

# Log all requests
@app.before_request
def log_request_info():
    app.logger.debug('Headers: %s', request.headers)
    app.logger.debug('Body: %s', request.get_data())

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
        app.logger.info('Received chat request')
        data = request.json
        app.logger.debug('Request data: %s', data)
        messages = data.get('messages', [])
        
        if not messages:
            return jsonify({'error': 'No messages provided'}), 400
        
        # Get the last user message
        last_message = messages[-1]['content'].lower().strip()
        app.logger.info('Processing message: %s', last_message)
        
        # Simple rule-based responses for demonstration
        if any(word in last_message for word in ['hello', 'hi', 'hey', 'hy']):
            ai_response = "Hello! I'm your Gujarat travel assistant. How can I help you plan your journey?"
        
        elif any(word in last_message for word in ['places', 'visit', 'tourist', 'spots']):
            ai_response = """Here are some must-visit places in Gujarat:
1. Statue of Unity, Kevadia - World's tallest statue
2. Somnath Temple - One of the 12 Jyotirlingas
3. Rann of Kutch - World's largest salt desert
4. Gir National Park - Home to Asiatic Lions
5. Sabarmati Ashram, Ahmedabad - Gandhi's residence
6. Dwarkadhish Temple - Ancient Krishna temple
7. Laxmi Vilas Palace, Vadodara - Largest private dwelling
8. Rani ki Vav, Patan - UNESCO World Heritage site

Would you like more details about any of these places?"""
        
        elif any(word in last_message for word in ['food', 'eat', 'cuisine', 'restaurant']):
            ai_response = """Gujarat offers a rich variety of vegetarian cuisine:
1. Dhokla - Steamed savory snack
2. Thepla - Multi-grain flatbread
3. Fafda-Jalebi - Popular breakfast combo
4. Undhiyu - Mixed vegetable dish
5. Khandvi - Gram flour rolls
6. Gujarati Thali - Complete meal experience

Would you like restaurant recommendations or recipes?"""
        
        elif any(word in last_message for word in ['weather', 'climate', 'when', 'best time']):
            ai_response = """The best time to visit Gujarat is from October to March when the weather is pleasant.
• October-February: Cool and dry (15-25°C)
• March-June: Hot summer (25-45°C)
• July-September: Monsoon season

Different regions have specific best times:
• Rann of Kutch: November to February (Rann Utsav)
• Gir National Park: December to March
• Temple Circuit: Year-round, but avoid summer
• Beaches: September to March"""
        
        elif any(word in last_message for word in ['transport', 'travel', 'reach', 'how to go']):
            ai_response = """Gujarat is well-connected by various modes of transport:
1. By Air: Major airports in Ahmedabad, Vadodara, Surat, and Rajkot
2. By Train: Well-connected railway network
3. By Road: Excellent highway network
4. Local Transport:
   - State buses (GSRTC)
   - Private buses
   - Cabs and auto-rickshaws
   - Metro in Ahmedabad

Would you like specific route information?"""
        
        else:
            ai_response = """I'd be happy to help you plan your Gujarat trip! I can assist with:
1. Popular tourist destinations
2. Local cuisine and restaurants
3. Weather and best time to visit
4. Transportation options
5. Cultural events and festivals
6. Accommodation recommendations
7. Custom itinerary planning

What would you like to know more about?"""
        
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
