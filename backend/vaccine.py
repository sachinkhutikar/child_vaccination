from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Vaccine, Child, ChildVaccine, db
from datetime import date, timedelta

vaccine = Blueprint("vaccine", __name__)

# -------------------------------
# Admin adds vaccine
# -------------------------------
@vaccine.route("/vaccine", methods=["POST"])
@jwt_required()
def add_vaccine():
    data = request.json

    new_vaccine = Vaccine(
        name=data["name"]
    )

    db.session.add(new_vaccine)
    db.session.commit()

    return jsonify({"message": "Vaccine added"}), 201



# -------------------------------
# View all vaccines
# -------------------------------
@vaccine.route("/vaccines", methods=["GET"])
@jwt_required()
def get_vaccines():
    vaccines = Vaccine.query.all()

    return jsonify([
        {
            "id": v.id,
            "name": v.name
        }
        for v in vaccines
    ])



# -------------------------------
# Admin assigns vaccine
# (ALL children or specific children)
# -------------------------------
from datetime import datetime, date
from flask import request, jsonify
from flask_jwt_extended import jwt_required
from models import db, Child, ChildVaccine

@vaccine.route("/assign-vaccine", methods=["POST"])
@jwt_required()
def assign_vaccine():
    data = request.json

    # REQUIRED FIELDS
    vaccine_id = data.get("vaccine_id")
    due_date_str = data.get("due_date")

    if not vaccine_id or not due_date_str:
        return jsonify({"error": "vaccine_id and due_date are required"}), 400

    due_date = datetime.strptime(due_date_str, "%Y-%m-%d").date()

    # 🔹 ASSIGN TO ALL CHILDREN
    if data.get("assign_to") == "ALL":
        children = Child.query.all()

        for child in children:
            exists = ChildVaccine.query.filter_by(
                child_id=child.id,
                vaccine_id=vaccine_id
            ).first()

            if not exists:
                db.session.add(
                    ChildVaccine(
                        child_id=child.id,
                        parent_id=child.parent_id,
                        vaccine_id=vaccine_id,
                        due_date=due_date,
                        status="Pending"
                    )
                )

        db.session.commit()
        return jsonify({"message": "Vaccine assigned to ALL children"}), 201

    # 🔹 ASSIGN TO SELECTED CHILDREN
    child_ids = data.get("child_ids", [])

    for child_id in child_ids:
        child = Child.query.get(child_id)
        if not child:
            continue

        exists = ChildVaccine.query.filter_by(
            child_id=child_id,
            vaccine_id=vaccine_id
        ).first()

        if not exists:
            db.session.add(
                ChildVaccine(
                    child_id=child_id,
                    parent_id=child.parent_id,
                    vaccine_id=vaccine_id,
                    due_date=due_date,
                    status="Pending"
                )
            )

    db.session.commit()
    return jsonify({"message": "Vaccine assigned successfully"}), 201




# -------------------------------
# View vaccines of a child
# -------------------------------
@vaccine.route("/child-vaccines/<int:child_id>", methods=["GET"])
@jwt_required()
def child_vaccines(child_id):
    records = ChildVaccine.query.filter_by(child_id=child_id).all()

    return jsonify([
        {
            "id": r.id,
            "vaccine": r.vaccine.name,
            "status": r.status,
            "due_date": r.due_date.isoformat()
        }
        for r in records
    ]), 200


# -------------------------------
# Mark vaccine as completed
# -------------------------------
@vaccine.route("/complete-vaccine/<int:cv_id>", methods=["PUT"])
@jwt_required()
def complete_vaccine(cv_id):
    record = ChildVaccine.query.get(cv_id)

    if not record:
        return jsonify({"message": "Record not found"}), 404

    record.status = "Completed"
    db.session.commit()

    return jsonify({"message": "Vaccine marked as completed"}), 200


# -------------------------------
# Due vaccines (reminder)
# -------------------------------
@vaccine.route("/due-vaccines/<int:child_id>", methods=["GET"])
@jwt_required()
def due_vaccines(child_id):
    today = date.today()

    records = ChildVaccine.query.filter(
        ChildVaccine.child_id == child_id,
        ChildVaccine.status == "Pending",
        ChildVaccine.due_date < today
    ).all()

    return jsonify([
        {
            "vaccine": r.vaccine.name,
            "due_date": r.due_date.isoformat()
        }
        for r in records
    ]), 200
