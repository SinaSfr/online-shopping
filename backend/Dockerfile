FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements/dev.txt requirements/dev.txt 
COPY requirements/base.txt requirements/base.txt
COPY requirements/prod.txt requirements/prod.txt

RUN pip install --no-cache-dir -r requirements/dev.txt

COPY app app

CMD ["uvicorn","app.main:app","--host","0.0.0.0","--port","8000","--reload"]