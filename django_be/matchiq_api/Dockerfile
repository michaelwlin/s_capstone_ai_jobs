FROM python:3.11.4-alpine

RUN apk update && \
    apk add --no-cache build-base musl-dev python3-dev libffi-dev gcc libc-dev tzdata


WORKDIR /app
COPY . /app

#prevent python from writing .pyc files
ENV PYTHONDONTWRITEBYTECODE 1

# ensure python output is sent directly to terminal
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
COPY ./requirements.txt /app
RUN pip install -r requirements.txt

COPY ./entrypoint.sh /app/entrypoint.sh

COPY . /app

ENTRYPOINT ["/app/entrypoint.sh"]

