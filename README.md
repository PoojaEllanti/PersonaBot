# 🤖 PersonaBot

**PersonaBot** is a full-stack AI chatbot that lets users chat with AI in different personas — like a Teacher, Therapist, Friend, or even a custom personality they define. Built using **React** (frontend) and **Flask** (backend), it uses **OpenRouter** as the bridge to powerful LLMs like GPT-3.5.

---

## 🌟 Features

- 🧠 AI chat powered by OpenRouter (GPT-3.5)
- 🧍‍♂️ Multiple personas: Teacher, Therapist, Friend
- ✍️ Custom persona creation (e.g., “Be a pirate Shakespeare bot”)
- 💬 Beautiful chat UI with avatars and message bubbles
- 🔁 Auto-scroll and seamless UX
- ✅ Fully working without Tailwind (pure CSS)

---

## 🖼️ Demo Preview

![PersonaBot UI Preview](preview.png) <!-- optional screenshot -->

---

## 🛠️ Tech Stack

| Frontend | Backend | AI Provider |
|----------|---------|-------------|
| React.js | Flask (Python) | OpenRouter (GPT-3.5) |

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/personabot.git
cd personabot

2️⃣ Backend Setup (Flask)
cd server
python -m venv venv
venv\Scripts\activate  # or source venv/bin/activate on Mac/Linux
pip install -r requirements.txt
Create a .env file:
OPENROUTER_API_KEY=sk-or-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
Run the server:
python app.py

3️⃣ Frontend Setup (React)
cd ../client
npm install
npm start
The React app runs on http://localhost:3000
The Flask backend runs on http://localhost:5000

🔐 Get OpenRouter API Key
Go to https://openrouter.ai

Log in and generate an API key

Paste it into your .env file as OPENROUTER_API_KEY
