from flask import Blueprint, request, jsonify

db_bp = Blueprint('db_bp', __name__)

# C (Create)
@db_bp.route('/create', methods=['POST'])
def create_record():
    data = request.get_json()
    # # 実際のデータベース作成処理
    # new_record = YourModel(data)
    # db.session.add(new_record)
    # db.session.commit()
    print(f"Received data for creation: {data}")
    return jsonify({"message": "Record created successfully", "data": data}), 201

# R (Read)
@db_bp.route('/read/<int:record_id>', methods=['GET'])
def read_record(record_id):
    # # 実際のデータベース読み込み処理
    # record = YourModel.query.get(record_id)
    # if record is None:
    #     return jsonify({"message": "Record not found"}), 404
    # data = {"id": record.id, "name": record.name} # etc.
    print(f"Fetching record with ID: {record_id}")
    dummy_data = {"id": record_id, "name": "Sample Name", "value": "Sample Value"}
    return jsonify({"message": "Record fetched successfully", "data": dummy_data}), 200

# U (Update)
@db_bp.route('/update/<int:record_id>', methods=['PUT'])
def update_record(record_id):
    data = request.get_json()
    # # 実際のデータベース更新処理
    # record = YourModel.query.get(record_id)
    # if record is None:
    #     return jsonify({"message": "Record not found"}), 404
    # record.name = data.get('name', record.name)
    # db.session.commit()
    print(f"Received data for update on ID {record_id}: {data}")
    return jsonify({"message": "Record updated successfully", "data": data}), 200

# D (Delete)
@db_bp.route('/delete/<int:record_id>', methods=['DELETE'])
def delete_record(record_id):
    # # 実際のデータベース削除処理
    # record = YourModel.query.get(record_id)
    # if record is None:
    #     return jsonify({"message": "Record not found"}), 404
    # db.session.delete(record)
    # db.session.commit()
    print(f"Deleting record with ID: {record_id}")
    return jsonify({"message": "Record deleted successfully"}), 200
