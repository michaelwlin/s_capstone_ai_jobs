#!/bin/sh

#change directory to /app/matchiq_api directory
cd /app

echo "Apply database migrations"
python manage.py migrate

# Start Django application
echo "Starting Django application"
gunicorn matchiq_api.wsgi:application --bind 0.0.0.0:PORT &

# Start cron daemon
cron -f