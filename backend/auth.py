from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from models import db, User
import re
auth = Blueprint("auth", __name__)



# 🔐 REGISTER
@auth.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    # ✅ Validate required fields
    required_fields = ["name", "email", "password", "confirm_password", "role"]

    for field in required_fields:
        if not data.get(field):
            return jsonify({"message": f"{field} is required"}), 400

    password = data["password"]

    # ✅ Strong Password Validation
    password_pattern = re.compile(
        r"(?=.*[@$!%*?&])"   # at least one special character
        r"[A-Za-z\d@$!%*?&]{8,}$"  # minimum 8 characters
    )

    if not password_pattern.match(password):
        return jsonify({
            "message": "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
        }), 400

    # ✅ Check if user already exists
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "User already exists"}), 400

    # ✅ Check password match
    if password != data["confirm_password"]:
        return jsonify({"message": "Passwords do not match"}), 400

    # ✅ Create new user
    new_user = User(
        name=data["name"],
        email=data["email"],
        password=generate_password_hash(password),
        role=data["role"]
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201




# 🔐 LOGIN (FINAL + SAFE)
@auth.route("/login", methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(email=data["email"]).first()

    if not user:
        return jsonify({"message": "User not found"}), 401

    if not check_password_hash(user.password, data["password"]):
        return jsonify({"message": "Invalid password"}), 401

    # ✅ IMPORTANT: identity MUST be STRING
    token = create_access_token(identity=str(user.id))

    return jsonify({
        "token": token,
        "role": user.role,
        "name": user.name
    }), 200
