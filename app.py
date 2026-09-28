from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello from Python!"

@app.route("/api/hello")
def hello():
    return {"message": "Hello from Python API!"}

@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.json

    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    return {
        "success": True,
        "message": f"Thank you {name}! Your message has been received."
    }

if __name__ == "__main__":
    app.run(port=5000)