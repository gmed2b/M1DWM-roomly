from flask import Flask, jsonify, request
import os
from monitoring import setup_monitoring

app = Flask(__name__)
setup_monitoring(app)

@app.route('/api/hello', methods=['GET'])
def hello():
    is_production = os.environ.get('FLASK_ENV') == 'production'
    if is_production:
        return jsonify({
            'message': 'Hello from Production!',
            'environment': 'production',
            'url': 'https://roomly-backend-178182914223.europe-west1.run.app'
        })
    else:
        return jsonify({
            'message': 'Hello from Local Development!',
            'environment': 'development',
            'url': 'http://localhost:8080'
        })

if __name__ == '__main__':
    # Check if we're running in production (Docker/Cloud)
    is_production = os.environ.get('FLASK_ENV') == 'production'
    
    if is_production:
        app.run(host='0.0.0.0', port=8080)
    else:
        app.run(debug=True)