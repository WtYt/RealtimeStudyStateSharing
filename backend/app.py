from flask import Flask
from flask_cors import CORS

from db.database import db_bp
from auth.authentication import auth_bp

app = Flask(__name__)
CORS(app) # フロントエンドからのリクエストを許可

# Blueprintの登録
app.register_blueprint(db_bp, url_prefix='/db')
app.register_blueprint(auth_bp, url_prefix='/auth')

@app.route('/')
def index():
    return "Flask-Backend is running!"

if __name__ == '__main__':
    app.run(debug=True, port=5001)
