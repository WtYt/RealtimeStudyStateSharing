from flask import Flask
from flask_cors import CORS
from initialize import init_firebase

# Flaskアプリケーションの起動前に初期化処理を実行
init_firebase()

from server import auth_bp, db_bp, room_bp

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(db_bp, url_prefix='/db')
app.register_blueprint(room_bp, url_prefix='/room')

if __name__ == '__main__':
    app.run(debug=True)
