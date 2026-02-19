from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from models import (
    db,
    User,
    Child,
    ChildVaccine,
    Hospital,
    HospitalVaccine
)

admin_bp = Blueprint("admin", __name__)


# =====================================================
# 📊 ADMIN DASHBOARD
# =====================================================
@admin_bp.route("/dashboard", methods=["GET", "OPTIONS"])
def admin_dashboard():
    # Allow preflight
    if request.method == "OPTIONS":
        return "", 200

    # Protect only GET
    from flask_jwt_extended import verify_jwt_in_request
    verify_jwt_in_request()

    parents = User.query.filter_by(role="parent").count()
    children = Child.query.count()

    completed = ChildVaccine.query.filter_by(status="Completed").count()
    pending = ChildVaccine.query.filter_by(status="Pending").count()

    return jsonify({
        "parents": parents,
        "children": children,
        "completed": completed,
        "pending": pending
    }), 200




# =====================================================
# 👶 ADMIN VIEW ALL CHILDREN
# =====================================================
@admin_bp.route("/children", methods=["GET"])
@jwt_required()
def admin_children():
    children = Child.query.all()

    result = []
    for c in children:
        result.append({
            "id": c.id,
            "name": c.name,
            "dob": c.dob,
            "parent": c.parent.name if c.parent else "N/A"
        })

    return jsonify(result), 200


# =====================================================
# 🏥 ADMIN ADD HOSPITAL
# =====================================================
@admin_bp.route("/hospitals", methods=["POST"])
@jwt_required()
def add_hospital():
    data = request.get_json()

    hospital = Hospital(
        name=data["name"],
        address=data["address"],
        opening_time=data.get("opening_time"),
        closing_time=data.get("closing_time"),
        status=data.get("status", "Open")
    )

    db.session.add(hospital)
    db.session.commit()

    return jsonify({"message": "Hospital added successfully"}), 201


# =====================================================
# 🏥 ADMIN GET ALL HOSPITALS
# =====================================================
@admin_bp.route("/hospitals", methods=["GET"])
@jwt_required()
def get_all_hospitals():
    hospitals = Hospital.query.all()

    return jsonify([
        {
            "id": h.id,
            "name": h.name,
            "address": h.address,
            "opening_time": h.opening_time,
            "closing_time": h.closing_time,
            "status": h.status
        } for h in hospitals
    ]), 200


# =====================================================
# ✏️ ADMIN UPDATE HOSPITAL
# =====================================================
@admin_bp.route("/hospital/<int:id>", methods=["PUT"])
@jwt_required()
def update_hospital(id):
    hospital = Hospital.query.get_or_404(id)
    data = request.get_json()

    hospital.name = data["name"]
    hospital.address = data["address"]
    hospital.opening_time = data.get("opening_time")
    hospital.closing_time = data.get("closing_time")
    hospital.status = data["status"]

    db.session.commit()

    return jsonify({"message": "Hospital updated successfully"}), 200


# =====================================================
# ❌ ADMIN DELETE HOSPITAL
# =====================================================
@admin_bp.route("/hospital/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_hospital(id):
    hospital = Hospital.query.get_or_404(id)

    db.session.delete(hospital)
    db.session.commit()

    return jsonify({"message": "Hospital deleted successfully"}), 200


# =====================================================
# 💉 ADD VACCINE TO HOSPITAL
# =====================================================
@admin_bp.route("/hospital/<int:id>/vaccine", methods=["POST"])
@jwt_required()
def add_hospital_vaccine(id):
    data = request.get_json()

    hv = HospitalVaccine(
        hospital_id=id,
        vaccine_id=data["vaccine_id"]
    )

    db.session.add(hv)
    db.session.commit()

    return jsonify({"message": "Vaccine added to hospital"}), 201

# =====================================================
# 📊 ADMIN REPORT
# =====================================================
@admin_bp.route("/report", methods=["GET"])
@jwt_required()
def admin_report():
    vaccines = ChildVaccine.query.all()

    result = []

    for v in vaccines:
        result.append({
            "child_name": v.child.name if v.child else "N/A",
            "vaccine_name": v.vaccine.name if hasattr(v, "vaccine") and v.vaccine else "N/A",
            "status": v.status,
            "due_date": str(v.due_date) if v.due_date else ""
        })

    return jsonify(result), 200
