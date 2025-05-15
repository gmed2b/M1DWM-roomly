from app import create_app
from monitoring import setup_monitoring
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create the Flask application
app = create_app()

# Setup monitoring in production
setup_monitoring(app)

# This file is specifically for production use with Gunicorn
# The app object will be used by Gunicorn to serve the application 