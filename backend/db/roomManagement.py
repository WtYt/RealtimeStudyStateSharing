from . import databaseCRUD as db

def create_room(data):
    """
    Creates a new room in the 'rooms' collection.
    Wrapper for databaseCRUD.create_document.
    Expects 'category' and 'name' in data.
    """
    room_data = {
        "collection": "rooms",
        "data": {
            "category": data.get('category'),
            "name": data.get('name'),
            "in_room_users": []
        }
    }
    return db.create_document(room_data)

def delete_room(params):
    """
    Deletes a room from the 'rooms' collection.
    Wrapper for databaseCRUD.delete_document.
    Expects 'doc_id' in params.
    """
    delete_params = {
        "collection": "rooms",
        "doc_id": params.get('doc_id')
    }
    return db.delete_document(delete_params)

def add_user(data):
    """
    Adds a user to a room's in_room_users array.
    Wrapper for databaseCRUD.add_to_array.
    Expects 'doc_id' and 'user_id' in data.
    """
    array_data = {
        "collection": "rooms",
        "doc_id": data.get('doc_id'),
        "field": "in_room_users",
        "values": [data.get('user_id')]
    }
    return db.add_to_array(array_data)

def remove_user(data):
    """
    Removes a user from a room's in_room_users array.
    Wrapper for databaseCRUD.remove_from_array.
    Expects 'doc_id' and 'user_id' in data.
    """
    array_data = {
        "collection": "rooms",
        "doc_id": data.get('doc_id'),
        "field": "in_room_users",
        "values": [data.get('user_id')]
    }
    return db.remove_from_array(array_data)
