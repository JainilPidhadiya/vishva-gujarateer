// Configure your Flask API base URL here
// For development: http://localhost:5000
// For production: your deployed Flask URL
export const FLASK_API_URL = import.meta.env.VITE_FLASK_API_URL || 'http://localhost:5000';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface SearchParams {
  destination?: string;
  activity?: string;
  date?: string;
  budget?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

// Chat with AI assistant
export async function sendChatMessage(messages: Message[]): Promise<string> {
  try {
    const response = await fetch(`${FLASK_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI response');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Chat API error:', error);
    throw error;
  }
}

// Search destinations
export async function searchDestinations(params: SearchParams) {
  try {
    const queryParams = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v !== undefined) as [string, string][]
    );
    
    const response = await fetch(`${FLASK_API_URL}/api/search?${queryParams}`);
    
    if (!response.ok) {
      throw new Error('Search failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Search API error:', error);
    throw error;
  }
}

// Generate itinerary
export async function generateItinerary(params: SearchParams): Promise<ItineraryDay[]> {
  try {
    const response = await fetch(`${FLASK_API_URL}/api/generate-itinerary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to generate itinerary');
    }

    const data = await response.json();
    return data.itinerary;
  } catch (error) {
    console.error('Itinerary API error:', error);
    throw error;
  }
}

// Get destination details
export async function getDestinationDetails(destinationId: string) {
  try {
    const response = await fetch(`${FLASK_API_URL}/api/destinations/${destinationId}`);
    
    if (!response.ok) {
      throw new Error('Failed to get destination details');
    }

    return await response.json();
  } catch (error) {
    console.error('Destination details API error:', error);
    throw error;
  }
}
