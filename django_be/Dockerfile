# Use an official Python runtime as a parent image
FROM python:3.11.2

# Set the working directory in the container
WORKDIR /app

# Environment variables to ensure Python runs in unbuffered mode and doesn't write .pyc files
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Upgrade pip and install the required Python dependencies
RUN pip install --upgrade pip
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /app

# Give execution rights on the entrypoint script
RUN chmod +x ./entrypoint.sh

# Install cron
RUN apt-get update && apt-get install -y cron

# Set up the cron job
COPY ./docker_scripts/scheduler.txt /etc/cron.d/scheduler
RUN chmod 0644 /etc/cron.d/scheduler
RUN crontab /etc/cron.d/scheduler

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define the entry point script
ENTRYPOINT ["sh", "./entrypoint.sh"]

# Start the application using Gunicorn, assuming your Django project is named 'your_project_name'
# Replace 'your_project_name' with the actual name of your Django project
CMD ["sh", "-c", "gunicorn your_project_name.wsgi:application --bind 0.0.0.0:8000 & cron -f"]
