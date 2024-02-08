FROM python:3.11.2

WORKDIR /app

# Copy .env file
COPY .env .

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install pip
RUN pip install --upgrade pip

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . /app

# Add permissions for entrypoint
RUN chmod +x ./entrypoint.sh

# Install cron
RUN apt-get update && apt-get install -y cron

# ADD CRON JOB
COPY ./docker_scripts/scheduler.txt /etc/cron.d/scheduler
RUN chmod 0644 /etc/cron.d/scheduler
RUN crontab /etc/cron.d/scheduler

EXPOSE 8000

# Start the application
ENTRYPOINT ["sh", "./entrypoint.sh"]
CMD ["sh", "-c", "python manage.py runserver 0.0.0.0:8000 & cron -f"]