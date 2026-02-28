/// <reference types="vite/client" />

interface Message {
  role: 'user' | 'model';
  parts: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Chat with AI using the backend API
 * @param message - The user's message
 * @param history - Previous conversation messages
 * @returns The AI's response text
 */
export async function chatWithAI(message: string, history: Message[] = []): Promise<string> {
  try {
    // Transform messages to match backend format
    const messages = [
      ...history.map(msg => ({
        role: msg.role === 'model' ? 'assistant' : msg.role,
        content: msg.parts
      })),
      {
        role: 'user',
        content: message
      }
    ];

    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return data.message;
  } catch (error) {
    console.error('Error calling chat API:', error);
    throw error;
  }
}

/**
 * Check if the API is healthy and available
 */
export async function checkAPIHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    const data = await response.json();
    return data.status === 'healthy';
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
}
