FROM python:3.11.2

WORKDIR /app

# Copy .env file
COPY .env .

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Install cron
RUN apt-get update && apt-get install -y cron

# ADD CRON JOB
COPY ./docker_scripts/scheduler.txt /etc/cron.d/scheduler
RUN chmod 0644 /etc/cron.d/scheduler
RUN crontab /etc/cron.d/scheduler

EXPOSE 8000

CMD ["cron", "-f"]