FROM python:3.10-slim

WORKDIR /api

EXPOSE 5002

COPY ./requirements.txt /api/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /api/requirements.txt

COPY . /api

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "5002"]
