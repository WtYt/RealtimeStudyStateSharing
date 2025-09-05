import firebase_admin
from firebase_admin import credentials

def init_firebase():
    """
    Firebase Admin SDKを初期化する。
    既に初期化されている場合は何もしない。
    """
    try:
        # デフォルトのアプリが初期化されていない場合のみ初期化処理を行う
        if not firebase_admin._apps:
            # サービスアカウントキーのパスを指定
            cred = credentials.Certificate("./keys/flask-test-ee614-firebase-adminsdk-fbsvc-8342bd1b8a.json")
            firebase_admin.initialize_app(cred)
            print("Firebase Admin SDK initialized successfully.")
    except Exception as e:
        print("Firebase Admin SDKの初期化に失敗しました。")
        print(e)
        # アプリケーションの起動を中止することも検討
        # import sys
        # sys.exit(1)

# 他の初期化処理が必要な場合は、ここに関数を追加していく
