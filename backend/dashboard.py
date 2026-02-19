from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Child, ChildVaccine

dashboard = Blueprint("dashboard", __name__)

from datetime import date

@dashboard.route("/parent/dashboard", methods=["GET"])
@jwt_required()
def parent_dashboard():
    user_id = int(get_jwt_identity())
    today = date.today()

    children = Child.query.filter_by(parent_id=user_id).all()
    child_ids = [c.id for c in children]

    upcoming = ChildVaccine.query.filter(
        ChildVaccine.child_id.in_(child_ids),
        ChildVaccine.status == "Pending",
        ChildVaccine.due_date >= today
    ).count()

    overdue = ChildVaccine.query.filter(
        ChildVaccine.child_id.in_(child_ids),
        ChildVaccine.status == "Pending",
        ChildVaccine.due_date < today
    ).count()

    return jsonify({
        "children": len(children),
        "upcoming": upcoming,
        "overdue": overdue
    })


    # 2️⃣ Upcoming vaccines
    upcoming = ChildVaccine.query.filter(
        ChildVaccine.child_id.in_(child_ids),
        ChildVaccine.status == "Pending"
    ).count()

    # 3️⃣ Overdue vaccines
    overdue = ChildVaccine.query.filter(
        ChildVaccine.child_id.in_(child_ids),
        ChildVaccine.status == "Overdue"
    ).count()

    return jsonify({
        "children": len(children),
        "upcoming": upcoming,
        "overdue": overdue
    }), 200






    # 3️⃣ Upcoming vaccines
    upcoming = ChildVaccine.query.filter(
        ChildVaccine.child_id.in_(child_ids),
        ChildVaccine.status == "Pending"
    ).count()

    # 4️⃣ Overdue vaccines (if you use this status)
    overdue = ChildVaccine.query.filter(
        ChildVaccine.child_id.in_(child_ids),
        ChildVaccine.status == "Overdue"
    ).count()

    return jsonify({
        "children": children_count,
        "upcoming": upcoming,
        "overdue": overdue
    })
