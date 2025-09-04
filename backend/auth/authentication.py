from flask import Blueprint, request, jsonify

auth_bp = Blueprint('auth_bp', __name__)

# ユーザー登録
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # # 実際のユーザー登録処理
    # if User.query.filter_by(username=username).first():
    #     return jsonify({"message": "User already exists"}), 400
    # new_user = User(username=username)
    # new_user.set_password(password)
    # db.session.add(new_user)
    # db.session.commit()
    
    print(f"Registering user: {username}")
    return jsonify({"message": "User registered successfully", "user": {"username": username}}), 201

# ログイン
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # # 実際のログイン処理
    # user = User.query.filter_by(username=username).first()
    # if user is None or not user.check_password(password):
    #     return jsonify({"message": "Invalid username or password"}), 401
    
    # # JWTトークンの生成など
    # access_token = create_access_token(identity=username)
    
    print(f"Logging in user: {username}")
    # return jsonify(access_token=access_token)
    return jsonify({"message": "Login successful", "user": {"username": username}}), 200
