from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from models import Hospital


hospitals_bp = Blueprint("hospitals", __name__, url_prefix="/api")



@hospitals_bp.route("/hospitals", methods=["GET"])
@jwt_required()
def get_hospitals():
    hospitals = Hospital.query.filter_by(status="Open").all()

    return jsonify([
        {
            "id": h.id,
            "name": h.name,
            "address": h.address,
            "hours": f"{h.opening_time} - {h.closing_time}",
            "status": h.status
        }
        for h in hospitals
    ]), 200

