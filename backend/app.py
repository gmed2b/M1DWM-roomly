from app import create_app
from monitoring import setup_monitoring
import os
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

app = create_app()
# setup_monitoring(app)

if __name__ == "__main__":
    # Check if we're running in production (Docker/Cloud)
    port = int(os.environ.get("PORT", 8080))
    is_production = os.getenv("FLASK_ENV") == "production"
    print(f"Running in {'production' if is_production else 'development'} mode")

    if is_production:
        app.run(host="0.0.0.0", port=port)
    else:
        app.run(host="localhost", debug=True, port=port)
