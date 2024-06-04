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

# Expose the port that Gunicorn will run on
EXPOSE 8000

# Run Gunicorn
CMD ["bash", "-c", "gunicorn matchiq_api.wsgi:application --bind 0.0.0.0:$PORT"]