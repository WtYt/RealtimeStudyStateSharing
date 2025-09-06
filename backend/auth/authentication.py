import firebase_admin
from firebase_admin import auth
# from firebase_admin import credentials # initialize.pyに移動

# ===============================================================================
# Firebase Admin SDKの初期化処理はapp.pyで起動時に行われる
# ===============================================================================
# try:
#     cred = credentials.Certificate("./auth/keys/flask-test-ee614-firebase-adminsdk-fbsvc-8342bd1b8a.json")
#     firebase_admin.initialize_app(cred)
# except Exception as e:
#     print("Firebase Admin SDKの初期化に失敗しました。サービスアカウントキーのパスが正しいか確認してください。")
#     print(e)


def register_user(data):
    """
    ユーザーを登録するロジック
    引数: data (dict) - emailとpasswordを含む辞書
    返り値: (dict, int) - レスポンスデータとHTTPステータスコードのタプル
    """
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return {"status": "error", "message": "Email and password are required"}, 400

    try:
        user = auth.create_user(
            email=email,
            password=password
        )
        response_data = {"status": "success", "message": f"User {user.uid} registered successfully"}
        return response_data, 201
    except Exception as e:
        # Firebaseからのエラーをクライアントに返す
        return {"status": "error", "message": str(e)}, 400

def login_user(data):
    """
    ユーザーのIDトークンを検証するロジック
    引数: data (dict) - tokenを含む辞書
    返り値: (dict, int) - レスポンスデータとHTTPステータスコードのタプル
    """
    id_token = data.get('token')

    if not id_token:
        return {"status": "error", "message": "ID token is required"}, 400

    try:
        # IDトークンを検証する
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        
        response_data = {"status": "success", "message": "Login successful", "uid": uid}
        return response_data, 200
    except auth.InvalidIdTokenError:
        return {"status": "error", "message": "Invalid ID token"}, 401
    except Exception as e:
        return {"status": "error", "message": str(e)}, 400
