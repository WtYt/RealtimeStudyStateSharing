# db/room_search_front.py
from typing import Any, Dict, Tuple, Optional, List
from google.cloud.firestore_v1 import FieldFilter
from google.cloud import firestore as gcf
from google.api_core.exceptions import FailedPrecondition

# Firestore Admin SDK 初期化は databaseCRUD.py 側にある前提
from databaseCRUD import db

# === フロント(categories.json)に合わせた key→label マップ ===
CATEGORY_MAP = {
    1: "プログラミング",
    2: "数学",
    3: "英語",
    4: "理科",
    5: "歴史",
    6: "芸術",
    7: "音楽",
    8: "文学",
    9: "ビジネス",
    10: "デザイン",
}

# Firestore の部屋名フィールド（必要なら変更）
ROOM_NAME_FIELD = "name"


def _normalize_limit(v: Optional[int], default: int = 20, upper: int = 100) -> int:
    try:
        n = int(v) if v is not None else default
        return max(1, min(n, upper))
    except Exception:
        return default


def search_rooms_front(params: Dict[str, Any]) -> Tuple[Dict[str, Any], int]:
    """
    /db/search 用の検索関数（フロント実装に合わせる）
    受け取る params:
      - collection: str      (既定 "rooms")
      - roomname: str        (前方一致)
      - category: int|str    (フロントは数値。DBが数値/ラベルどちらでもヒットするよう 'in' を使用)
      - limit: int           (既定 20, 上限 100)
      - start_after_id: str  (ページネーション)
    """
    if not db:
        return {"status": "error", "message": "Firestore is not initialized"}, 500

    collection = params.get("collection", "rooms")
    roomname: Optional[str] = params.get("roomname")
    category_raw = params.get("category")
    start_after_id: Optional[str] = params.get("start_after_id")
    limit = _normalize_limit(params.get("limit"))

    q = db.collection(collection)

    # --- カテゴリ条件（DBが数値 or ラベルのどちらでも当たるように） ---
    if category_raw not in (None, ""):
        vals: List[Any] = []
        try:
            k = int(category_raw)
            vals.append(k)
            if k in CATEGORY_MAP:
                vals.append(CATEGORY_MAP[k])
        except Exception:
            # 数値化できない場合は無効
            return {"status": "error", "message": "Category must be an integer key."}, 400

        # Firestore の 'in' は最大30要素。ここでは最大2要素なので安全。
        q = q.where(filter=FieldFilter("category", "in", vals))

    # --- ルーム名 前方一致 ---
    ordered = False
    if roomname not in (None, ""):
        q = q.order_by(ROOM_NAME_FIELD, direction=gcf.Query.ASCENDING)
        q = q.start_at([roomname]).end_at([roomname + "\uf8ff"])
        ordered = True

    # 名前条件が無いときの既定ソート（任意）
    if not ordered:
        q = q.order_by("updatedAt", direction=gcf.Query.DESCENDING)

    # --- ページネーション ---
    if start_after_id:
        snap = db.collection(collection).document(start_after_id).get()
        if snap.exists:
            q = q.start_after(snap)

    q = q.limit(limit)

    try:
        docs = list(q.stream())
        items = [{"id": d.id, **(d.to_dict() or {})} for d in docs]
        next_cursor = docs[-1].id if len(docs) == limit else None

        res: Dict[str, Any] = {"status": "success", "items": items}
        if next_cursor:
            res["nextPage"] = {"start_after_id": next_cursor}
        return res, 200

    except FailedPrecondition as e:
        # 複合インデックス不足など
        return {
            "status": "error",
            "message": "Missing composite index. Open the link shown in the error to create it in Firestore console.",
            "detail": str(e),
        }, 400
    except Exception as e:
        return {"status": "error", "message": str(e)}, 500
