from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import date
from models import ChildVaccine, Child, Vaccine

notifications_bp = Blueprint("notifications", __name__, url_prefix="/api")

@notifications_bp.route("/notifications", methods=["GET"])
@jwt_required()
def get_notifications():
    parent_id = int(get_jwt_identity())
    today = date.today()

    records = (
        ChildVaccine.query
        .filter_by(parent_id=parent_id, status="Pending")
        .join(Child)
        .join(Vaccine)
        .all()
    )

    result = []

    for r in records:
        days_left = (r.due_date - today).days

        # 🆕 NEWLY ASSIGNED (far future vaccine)
        if days_left > 7:
            result.append({
                "type": "assigned",
                "child": r.child.name,
                "vaccine": r.vaccine.name,
                "due_date": r.due_date.isoformat()
            })

        # ⏰ UPCOMING (within 7 days)
        elif 0 <= days_left <= 7:
            result.append({
                "type": "upcoming",
                "child": r.child.name,
                "vaccine": r.vaccine.name,
                "due_date": r.due_date.isoformat(),
                "days_left": days_left
            })

        # ⚠️ OVERDUE
        else:
            result.append({
                "type": "overdue",
                "child": r.child.name,
                "vaccine": r.vaccine.name,
                "due_date": r.due_date.isoformat(),
                "days_left": days_left
            })

    return jsonify(result), 200
