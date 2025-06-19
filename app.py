from flask import Flask, request, jsonify # type: ignore
from flask_cors import CORS # type: ignore
import os
import requests # type: ignore
from dotenv import load_dotenv # type: ignore

# Load environment variables
load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Chat route
@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    persona = data.get("persona", "Teacher")

    # Default persona prompts
    default_prompts = {
        "Teacher": "You are a helpful teacher who explains concepts with examples.",
        "Therapist": "You are a kind therapist who gives emotional support.",
        "Friend": "You are a fun, casual friend who chats informally and uses emojis.",
    }

    # Use custom input as prompt if it's not a known default
    if persona in default_prompts:
        system_prompt = default_prompts[persona]
    else:
        system_prompt = persona  # assume it's a custom persona prompt

    # OpenRouter headers and payload
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message}
        ]
    }

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload
        )
        response.raise_for_status()
        data = response.json()

        # Safely get bot reply
        reply = data.get("choices", [{}])[0].get("message", {}).get("content", "")

        if not reply:
            reply = "[❗ Bot returned an empty message. Try a different prompt or model.]"

        return jsonify({"response": reply})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
