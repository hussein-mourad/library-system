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
docker build -t lms-server .
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

Activate the environment

On unix-based systems

```bash
source venv/bin/activate
```

On Windows

> Make sure you are allowed to execute scripts on windows

```cmd
.\venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create the database

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

> Open the api dashboard in the browser

```bash
http://localhost:8000/api/
```

> Open the admin dashboard in the browser

```bash
http://localhost:8000/admin/
```

### Generate testing data

Drop the database

```bash
python manage.py flush
```

Generate random users

```bash
python manage.py populate_users
```

Generate random library data

```bash
python manage.py populate_library
```
