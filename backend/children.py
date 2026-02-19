from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Child

children = Blueprint("children", __name__)

# -------------------------------
# 👶 ADD CHILD (Parent)
# -------------------------------
@children.route("/child", methods=["POST"])
@jwt_required()
def add_child():
    user_id = int(get_jwt_identity())

    child = Child(
        name=request.json["name"],
        dob=request.json["dob"],
        parent_id=user_id   # SAVE AS STRING
    )

    db.session.add(child)
    db.session.commit()

    return jsonify({"message": "Child added"}), 201


# -------------------------------
# 👶 VIEW CHILDREN (Parent)
# -------------------------------
@children.route("/children", methods=["GET"])
@jwt_required()
def get_children():
    user_id = get_jwt_identity()

    print("JWT USER ID:", user_id)

    children = Child.query.filter_by(parent_id=user_id).all()

    print("CHILD COUNT:", len(children))
    for c in children:
        print(c.id, c.name, c.parent_id)

    return jsonify([
        {"id": c.id, "name": c.name, "dob": c.dob}
        for c in children
    ])



# -------------------------------
# 👶 VIEW ALL CHILDREN (Admin)
# -------------------------------
@children.route("/admin/children", methods=["GET"])
@jwt_required()
def admin_get_children():
    children_list = Child.query.all()

    return jsonify([
        {
            "id": c.id,
            "name": c.name,
            "dob": c.dob,
            "parent_id": c.parent_id
        }
        for c in children_list
    ])
