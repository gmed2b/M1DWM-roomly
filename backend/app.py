from app import create_app

app = create_app()

if __name__ == '__main__':
    # Check if we're running in production (Docker/Cloud)
    is_production = os.environ.get('FLASK_ENV') == 'production'
    
    if is_production:
        app.run(host='0.0.0.0', port=8080)
    else:
        app.run(debug=True)