from firebase_admin import firestore

# Firestoreクライアントを取得
# Firebase Admin SDKは、起動時にauthentication.pyまたはapp.pyで初期化されていることを前提とします。
try:
    db = firestore.client()
except Exception as e:
    print(f"Firestoreクライアントの取得に失敗しました: {e}")
    db = None

# Create
def create_record(data):
    """
    Firestoreに新しいドキュメントを作成する
    引数: data (dict) - 作成するデータ。'collection'キーを含む必要がある。
    返り値: (dict, int) - レスポンスデータとHTTPステータスコードのタプル
    """
    if not db:
        return {"status": "error", "message": "Firestore is not initialized"}, 500
    
    collection_name = data.pop('collection', None)
    if not collection_name:
        return {"status": "error", "message": "Collection name is missing in the request body"}, 400

    try:
        # 指定されたコレクションに新しいドキュメントを追加
        update_time, doc_ref = db.collection(collection_name).add(data.pop('data', None))
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
        data (dict) - 更新内容のデータ。'collection'と'id'キーを含む必要がある。
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

    try:
        doc_ref = db.collection(collection_name).document(doc_id)
        doc_ref.update(data.pop('data', None))
        response_data = {"status": "success", "message": f"Document {doc_id} updated"}
        return response_data, 200
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500

# Delete
def delete_record(params):
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
