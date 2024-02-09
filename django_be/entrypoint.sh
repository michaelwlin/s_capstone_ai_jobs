#!/bin/sh

#change directory to /app/matchiq_api directory
cd /app/matchiq_api

echo "Apply database migrations"
python manage.py migrate

# Start Django application
echo "Starting Django application"
exec "$@"
