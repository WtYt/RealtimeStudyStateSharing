from firebase_admin import firestore

# Firestoreクライアントを取得
# Firebase Admin SDKは、起動時にauthentication.pyまたはapp.pyで初期化されていることを前提とします。
try:
    db = firestore.client()
except Exception as e:
    print(f"Firestoreクライアントの取得に失敗しました: {e}")
    db = None

# Create
def create_document(data):
    """
    Firestoreに新しいドキュメントを作成する
    引数: data (dict) - 作成するデータ。'collection'と'data'キーを含む必要がある。
    'doc_id'キーがあれば、その値がドキュメントIDとして使用される。
    返り値: (dict, int) - レスポンスデータとHTTPステータスコードのタプル
    """
    if not db:
        return {"status": "error", "message": "Firestore is not initialized"}, 500
    
    collection_name = data.pop('collection', None)
    doc_id = data.pop('doc_id', None)  # doc_idを取得
    if not collection_name:
        return {"status": "error", "message": "Collection name is missing in the request body"}, 400

    record_data = data.pop('data', {})
    if not record_data:
        return {"status": "error", "message": "Data is missing in the request body"}, 400

    try:
        # 作成日時と更新日時フィールドを追加
        record_data['createdAt'] = firestore.SERVER_TIMESTAMP
        record_data['updatedAt'] = firestore.SERVER_TIMESTAMP
        
        if doc_id:
            # doc_idが指定されている場合、そのIDでドキュメントを作成
            doc_ref = db.collection(collection_name).document(doc_id)
            doc_ref.set(record_data)
            response_data = {"status": "success", "message": f"Record created with ID: {doc_ref.id}", "id": doc_ref.id}
        else:
            # doc_idが指定されていない場合、自動IDでドキュメントを追加
            update_time, doc_ref = db.collection(collection_name).add(record_data)
            response_data = {"status": "success", "message": f"Record created with ID: {doc_ref.id}", "id": doc_ref.id}
            
        return response_data, 201
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500

# Read
def read_record(params):
    """
    Firestoreからドキュメントを読み込む
    引数: params (dict) - 'collection'と'doc_id'を含む辞書
    返り値: (dict, int) - レスポンスデータとHTTPステータスコードのタプル
    """
    if not db:
        return {"status": "error", "message": "Firestore is not initialized"}, 500
    
    collection_name = params.get('collection')
    doc_id = params.get('doc_id')

    # 内部的なパラメータチェック
    if not collection_name or not doc_id:
        return {"status": "error", "message": "Internal error: collection or doc_id missing in params"}, 500

    try:
        doc_ref = db.collection(collection_name).document(doc_id)
        doc = doc_ref.get()
        if doc.exists:
            response_data = {"status": "success", "data": doc.to_dict()}
            return response_data, 200
        else:
            return {"status": "error", "message": "Record not found"}, 404
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500

# Update
def update_record(data):
    """
    Firestoreのドキュメントを更新する
    引数:
        data (dict) - 更新内容のデータ。'collection'と'doc_id'、'data'キーを含む必要がある。
    返り値: (dict, int) - レスポンスデータとHTTPステータスコードのタプル
    """
    if not db:
        return {"status": "error", "message": "Firestore is not initialized"}, 500
    
    collection_name = data.pop('collection', None)
    doc_id = data.pop('doc_id', None)

    if not collection_name:
        return {"status": "error", "message": "Collection name is missing in the request body"}, 400
    if not doc_id:
        return {"status": "error", "message": "Document ID is missing in the request body"}, 400

    update_data = data.pop('data', {})
    if not update_data:
        return {"status": "error", "message": "Data is missing in the request body"}, 400

    try:
        # 更新日時フィールドを追加
        update_data['updatedAt'] = firestore.SERVER_TIMESTAMP

        doc_ref = db.collection(collection_name).document(doc_id)
        doc_ref.update(update_data)
        response_data = {"status": "success", "message": f"Document {doc_id} updated"}
        return response_data, 200
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500

# Delete
def delete_document(params):
    """
    Firestoreからドキュメントを削除する
    引数: params (dict) - 'collection'と'doc_id'を含む辞書
    返り値: (dict, int) - レスポンスデータとHTTPステータスコードのタプル
    """
    if not db:
        return {"status": "error", "message": "Firestore is not initialized"}, 500

    collection_name = params.get('collection')
    doc_id = params.get('doc_id')

    if not collection_name:
        return {"status": "error", "message": "Collection name is required"}, 400
    if not doc_id:
        return {"status": "error", "message": "Document ID is required"}, 400

    try:
        db.collection(collection_name).document(doc_id).delete()
        response_data = {"status": "success", "message": f"Document {doc_id} deleted"}
        return response_data, 200
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500

# Add to array
def add_to_array(data):
    """
    Firestoreドキュメントの配列フィールドに要素を追加する
    引数:
        data (dict): 'collection', 'doc_id', 'field', 'values' を含む辞書
    返り値: (dict, int) - レスポンスデータとHTTPステータスコードのタプル
    """
    if not db:
        return {"status": "error", "message": "Firestore is not initialized"}, 500

    collection_name = data.get('collection')
    doc_id = data.get('doc_id')
    field_name = data.get('field')
    values_to_add = data.get('values')

    if not all([collection_name, doc_id, field_name, values_to_add]):
        return {"status": "error", "message": "Missing required parameters: collection, doc_id, field, and values"}, 400

    if not isinstance(values_to_add, list):
        return {"status": "error", "message": "'values' must be a list"}, 400

    try:
        doc_ref = db.collection(collection_name).document(doc_id)
        
        update_data = {
            field_name: firestore.ArrayUnion(values_to_add),
            'updatedAt': firestore.SERVER_TIMESTAMP
        }
        
        doc_ref.update(update_data)
        
        response_data = {"status": "success", "message": f"Elements added to '{field_name}' in document {doc_id}"}
        return response_data, 200
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500

# Remove from array
def remove_from_array(data):
    """
    Firestoreドキュメントの配列フィールドから要素を削除する
    引数:
        data (dict): 'collection', 'doc_id', 'field', 'values' を含む辞書
    返り値: (dict, int) - レスポンスデータとHTTPステータスコードのタプル
    """
    if not db:
        return {"status": "error", "message": "Firestore is not initialized"}, 500

    collection_name = data.get('collection')
    doc_id = data.get('doc_id')
    field_name = data.get('field')
    values_to_remove = data.get('values')

    if not all([collection_name, doc_id, field_name, values_to_remove]):
        return {"status": "error", "message": "Missing required parameters: collection, doc_id, field, and values"}, 400

    if not isinstance(values_to_remove, list):
        return {"status": "error", "message": "'values' must be a list"}, 400

    try:
        doc_ref = db.collection(collection_name).document(doc_id)
        
        update_data = {
            field_name: firestore.ArrayRemove(values_to_remove),
            'updatedAt': firestore.SERVER_TIMESTAMP
        }
        
        doc_ref.update(update_data)
        
        response_data = {"status": "success", "message": f"Elements removed from '{field_name}' in document {doc_id}"}
        return response_data, 200
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500
