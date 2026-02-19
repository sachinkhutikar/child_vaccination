import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models import db
from auth import auth
from children import children
from vaccine import vaccine
from reports import reports_bp
from parent import parent
from dashboard import dashboard
from admin import admin_bp
from notifications import notifications_bp
from hospitals import hospitals_bp


# 📁 BASE DIR & DB PATH
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, "database.db")


def create_app(*args, **kwargs):
    app = Flask(__name__)

    # 🔥 DATABASE CONFIG
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_PATH}"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # 🔐 JWT CONFIG
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "super-secret-key")
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]
    app.config["JWT_HEADER_NAME"] = "Authorization"
    app.config["JWT_HEADER_TYPE"] = "Bearer"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 3600  # 1 hour

    # 🌍 CORS CONFIG (STRICT + SAFE)
    CORS(
    app,
    resources={r"/api/*": {
        "origins": [
            "http://localhost:3000",
            "https://child-vaccination-git-main-sachinkhutikars-projects.vercel.app"
        ]
    }},
    supports_credentials=True
)


    # 🔌 INIT EXTENSIONS
    db.init_app(app)
    JWTManager(app)

    # 🔥 GLOBAL PREFLIGHT HANDLER (FIXES ADMIN DASHBOARD ISSUE)
   
    # 🧩 REGISTER BLUEPRINTS
    app.register_blueprint(auth, url_prefix="/api")
    app.register_blueprint(children, url_prefix="/api")
    app.register_blueprint(vaccine, url_prefix="/api")
    app.register_blueprint(parent, url_prefix="/api")
    app.register_blueprint(dashboard, url_prefix="/api")
    app.register_blueprint(admin_bp, url_prefix="/api/admin")
    app.register_blueprint(reports_bp, url_prefix="/api")
    app.register_blueprint(notifications_bp, url_prefix="/api")
    app.register_blueprint(hospitals_bp, url_prefix="/api")

    # ✅ FORCE DB CREATION
    with app.app_context():
        print("📦 Creating database at:", DB_PATH)
        db.create_all()

    # 🏠 HOME ROUTE
    @app.route("/")
    def home():
        return jsonify({"message": "🚀 Firewall backend running successfully"})

    # ❌ GLOBAL ERROR HANDLERS
    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "Route not found"}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({"error": "Internal server error"}), 500

    return app

app = create_app()

# 🚀 RUN APP
if __name__ == "__main__":
    app.run(port=52451, debug=True)

