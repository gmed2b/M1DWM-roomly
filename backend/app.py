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
    is_production = os.getenv("FLASK_ENV") == "production"
    print(f"Running in {'production' if is_production else 'development'} mode")

    if is_production:
        app.run(host="0.0.0.0", port=8080)
    else:
        app.run(debug=True)
