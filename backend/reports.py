from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from models import ChildVaccine

reports_bp = Blueprint("reports", __name__, url_prefix="/api/admin")

@reports_bp.route("/report", methods=["GET"])
@jwt_required()
def admin_report():
    records = ChildVaccine.query.all()

    result = []

    for r in records:
        result.append({
            "child_name": r.child.name,
            "parent_id": r.parent_id,
            "vaccine_name": r.vaccine.name,
            "status": r.status,
            "due_date": r.due_date.strftime("%Y-%m-%d")
        })

    return jsonify(result)
