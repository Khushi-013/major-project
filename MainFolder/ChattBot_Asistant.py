import os
import google.generativeai as genai

from dotenv import load_dotenv
load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_NONE",
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
  },
]

model = genai.GenerativeModel(
  model_name= "gemini-1.5-flash",
  safety_settings= safety_settings,
  generation_config= generation_config,
  system_instruction= "You are the expert system of the world. You know everything.",
)

chat_session = model.start_chat(
    history=[]
)

while True:
    
  user_input = input("You: ")
  print()

  response = chat_session.send_message(user_input)

  model_response = response.text

  print(f'Bot: {model_response}')
  print()

  chat_session.history.append({"role": "user", "parts": [user_input]})
  chat_session.history.append({"role": "model", "parts": [model_response]})
