from flask import Blueprint, request, jsonify
from auth import authentication
from db import databaseCRUD as dbcrud
from db import roomManagementUtility as rmu

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
    response_data, status_code = dbcrud.create_document(data)
    return jsonify(response_data), status_code

@db_bp.route('/read', methods=['GET'])
def handle_read():
    # GETリクエストの全パラメータを辞書として取得し、そのまま渡す
    params = request.args.to_dict()
    response_data, status_code = dbcrud.read_document(params)
    return jsonify(response_data), status_code

@db_bp.route('/readcl', methods=['GET'])
def handle_read_collection():
    params = request.args.to_dict()
    response_data, status_code = dbcrud.read_collection(params)
    return jsonify(response_data), status_code

@db_bp.route('/readbyfield', methods=['GET'])
def handle_read_by_field():
    params = request.args.to_dict()
    response_data, status_code = dbcrud.read_document_by_field(params)
    return jsonify(response_data), status_code

@db_bp.route('/update', methods=['PUT'])
def handle_update():
    data = request.get_json()
    response_data, status_code = dbcrud.update_document(data)
    return jsonify(response_data), status_code

@db_bp.route('/delete', methods=['DELETE'])
def handle_delete():
    params = request.args.to_dict()
    response_data, status_code = dbcrud.delete_document(params)
    return jsonify(response_data), status_code

@db_bp.route('/search', methods=['GET'])
def handle_search():
    pass # TODO
    return jsonify({"status": "error", "message": "Not implemented"}), 501

@db_bp.route('/add2array', methods=['PUT'])
def handle_add_to_array():
    data = request.get_json()
    response_data, status_code = dbcrud.add_to_array(data)
    return jsonify(response_data), status_code

@db_bp.route('/remove_from_array', methods=['PUT'])
def handle_remove_from_array():
    data = request.get_json()
    response_data, status_code = dbcrud.remove_from_array(data)
    return jsonify(response_data), status_code


# ルーム管理関連のBlueprint
room_bp = Blueprint('room', __name__)

@room_bp.route('/create', methods=['POST'])
def handle_create_room():
    data = request.get_json()
    response_data, status_code = rmu.create_room(data)
    return jsonify(response_data), status_code

@room_bp.route('/delete', methods=['DELETE'])
def handle_delete_room():
    params = request.args.to_dict()
    response_data, status_code = rmu.delete_room(params)
    return jsonify(response_data), status_code

@room_bp.route('/adduser', methods=['PUT'])
def handle_add_user():
    data = request.get_json()
    response_data, status_code = rmu.add_user(data)
    return jsonify(response_data), status_code

@room_bp.route('/removeuser', methods=['PUT'])
def handle_remove_user():
    data = request.get_json()
    response_data, status_code = rmu.remove_user(data)
    return jsonify(response_data), status_code
