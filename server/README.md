# Server for library management system (lms)

## Run Locally

### Docker (Recommended)

Clone the project

```bash
git clone https://github.com:sp24sw/sp24sw-final-project-g3.git library-system
```

Go to the project directory

```bash
cd library-system/server
```

Build the image

```bash
docker build -t lms-server
```

Run the image

```bash
docker run --name lms-server -p 8000:8000 lms-server
```

Create superuser

```bash
docker exec -it lms-server python manage.py createsuperuser
```

### Manual Setup

Clone the project

```bash
git clone https://github.com:sp24sw/sp24sw-final-project-g3.git library-system
```

Go to the project directory

```bash
cd library-system/server
```

Setup virtual environment

```bash
python -m venv venv
```

Install dependencies

```bash
pip install -r requirements.txt
```

Make database

```bash
python manage.py makemigrations
python manage.py migrate
```

Create superuser

```bash
python manage.py createsuperuser
```

Start the server

```bash
python manage.py runserver
```

Open the api dashboard in web browser

```bash
http://localhost:8000/api/
```

Or

Open the admin dashboard in web browser

```bash
http://localhost:8000/admin/
```
