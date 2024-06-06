
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Apply specific modification to passlib
RUN sed -i 's/__about__\.//g' /usr/local/lib/python3.10/site-packages/passlib/handlers/bcrypt.py

COPY . .

RUN mkdir -p images

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]