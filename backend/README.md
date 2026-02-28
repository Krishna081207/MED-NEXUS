# Backend Setup

This backend uses Django for database management and admin, and FastAPI for serving APIs and ML models.

## Structure
- `django_app/`: Django project for database and admin
- `fastapi_app/`: FastAPI project for APIs and ML models

## Shared Database
Both Django and FastAPI will use the same database (default: SQLite, can be changed to PostgreSQL/MySQL).

## Setup
1. Install Python 3.10+
2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

## Run Django
```
cd django_app
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Run FastAPI
```
cd fastapi_app
uvicorn main:app --reload
```

## Requirements
See `requirements.txt` for dependencies.
