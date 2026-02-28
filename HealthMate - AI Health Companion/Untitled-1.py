d/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app)

genai.configure(api_key=os.getenv('GEMINI_API_KEY'))

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')
    chat_history = data.get('history', [])
    
    model = genai.GenerativeModel('gemini-pro')
    chat = model.start_chat(history=chat_history)
    
    response = chat.send_message(user_message)
    
    return jsonify({'response': response.text})

if __name__ == '__main__':
    app.run(debug=True, port=5000)