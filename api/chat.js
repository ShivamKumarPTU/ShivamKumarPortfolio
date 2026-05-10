export default async function handler(request, response) {
  // Set CORS headers to allow requests from your GitHub Pages domain and local development
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  // Handle CORS preflight request
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { messages } = request.body;
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY) {
      return response.status(500).json({ error: 'Groq API Key not configured in Vercel' });
    }

    const apiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: messages,
        temperature: 0.5,
        max_tokens: 350
      })
    });

    const data = await apiResponse.json();
    return response.status(apiResponse.status).json(data);
  } catch (error) {
    console.error('Vercel Serverless Function Error:', error);
    return response.status(500).json({ error: 'Failed to process chat request' });
  }
}
