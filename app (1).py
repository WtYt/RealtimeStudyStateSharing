# app.py
from typing import Any, Dict
from flask import Flask, jsonify, request
from flask_cors import CORS

from db.room_search_front import search_rooms_front

app = Flask(__name__)
CORS(app, resources={r"/db/*": {"origins": "*"}})  # 本番はオリジンを絞ってください


@app.get("/db/search")
def api_db_search():
    """
    例:
      /db/search?collection=rooms&roomname=会議
      /db/search?collection=rooms&category=3
      /db/search?collection=rooms&roomname=会議&category=3&limit=20&start_after_id=xxxx
    """
    params: Dict[str, Any] = {
        "collection": request.args.get("collection", "rooms"),
        "roomname": request.args.get("roomname"),
        "category": request.args.get("category"),
        "limit": request.args.get("limit", type=int),
        "start_after_id": request.args.get("start_after_id"),
    }
    body, status = search_rooms_front(params)
    return jsonify(body), status


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
