from flask import Blueprint, request, jsonify
from auth import authentication
from db import databaseCRUD as dbcrud

# 認証関連のBlueprint
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def handle_register():
    data = request.get_json()
    response_data, status_code = authentication.register_user(data)
    return jsonify(response_data), status_code

@auth_bp.route('/login', methods=['POST'])
def handle_login():
    data = request.get_json()
    response_data, status_code = authentication.login_user(data)
    return jsonify(response_data), status_code


# データベース関連のBlueprint
db_bp = Blueprint('db', __name__)

@db_bp.route('/create', methods=['POST'])
def handle_create():
    data = request.get_json()
    response_data, status_code = dbcrud.create_record(data)
    return jsonify(response_data), status_code

@db_bp.route('/read', methods=['GET'])
def handle_read():
    # GETリクエストの全パラメータを辞書として取得し、そのまま渡す
    params = request.args.to_dict()
    response_data, status_code = dbcrud.read_record(params)
    return jsonify(response_data), status_code

@db_bp.route('/update', methods=['PUT'])
def handle_update():
    data = request.get_json()
    response_data, status_code = dbcrud.update_record(data)
    return jsonify(response_data), status_code

@db_bp.route('/delete', methods=['DELETE'])
def handle_delete():
    params = request.args.to_dict()
    response_data, status_code = dbcrud.delete_record(params)
    return jsonify(response_data), status_code

@db_bp.route('/search', methods=['GET'])
def handle_search():
    pass # TODO
    return jsonify({"status": "error", "message": "Not implemented"}), 501
