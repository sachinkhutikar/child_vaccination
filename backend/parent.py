from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Child, ChildVaccine
from datetime import date

parent = Blueprint("parent", __name__)

@parent.route("/parent/dashboard", methods=["GET"])
@jwt_required()
def parent_dashboard():
    user_id = int(get_jwt_identity())
    today = date.today()

    children = Child.query.filter_by(parent_id=user_id).all()

    if not children:
        return jsonify({
            "children": 0,
            "upcoming": 0,
            "overdue": 0,
            "child_summary": []
        })

    child_ids = [child.id for child in children]

    # 🔹 Overall Upcoming
    upcoming = ChildVaccine.query.filter(
        ChildVaccine.child_id.in_(child_ids),
        ChildVaccine.status == "Pending",
        ChildVaccine.due_date >= today
    ).count()

    # 🔹 Overall Overdue
    overdue = ChildVaccine.query.filter(
        ChildVaccine.child_id.in_(child_ids),
        ChildVaccine.status == "Pending",
        ChildVaccine.due_date < today
    ).count()

    # 🔹 Per Child Summary
    child_summary = []

    for child in children:
        completed = ChildVaccine.query.filter_by(
            child_id=child.id,
            status="Completed"
        ).count()

        pending = ChildVaccine.query.filter_by(
            child_id=child.id,
            status="Pending"
        ).count()

        child_summary.append({
            "child_id": child.id,
            "child_name": child.name,
            "completed": completed,
            "pending": pending
        })

    return jsonify({
        "children": len(children),
        "upcoming": upcoming,
        "overdue": overdue,
        "child_summary": child_summary
    })
