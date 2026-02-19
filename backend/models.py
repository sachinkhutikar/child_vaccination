from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False)

    # ✅ ADD THIS
    children = db.relationship("Child", backref="parent")



class Child(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    dob = db.Column(db.String(20), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey("user.id"))



class Vaccine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)


class ChildVaccine(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    child_id = db.Column(db.Integer, db.ForeignKey("child.id"), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    vaccine_id = db.Column(db.Integer, db.ForeignKey("vaccine.id"), nullable=False)

    due_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), default="Pending")

    child = db.relationship("Child", backref="vaccines")
    vaccine = db.relationship("Vaccine")
    parent = db.relationship("User")

class Hospital(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(120), nullable=False)
    address = db.Column(db.String(200), nullable=False)

    opening_time = db.Column(db.String(20))
    closing_time = db.Column(db.String(20))

    status = db.Column(db.String(20), default="Open")


class HospitalVaccine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    hospital_id = db.Column(db.Integer, db.ForeignKey("hospital.id"))
    vaccine_id = db.Column(db.Integer, db.ForeignKey("vaccine.id"))

    hospital = db.relationship("Hospital", backref="vaccines")
    vaccine = db.relationship("Vaccine")


