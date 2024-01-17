# Stage 1: Build frontend
FROM node:14 as frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run dev

# Stage 2: Build backend
FROM python:3.8-slim as backend
WORKDIR /app/backend
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY backend .

# Stage 3: Final image with both frontend and backend
FROM python:3.8-slim
WORKDIR /app
COPY --from=frontend /app/frontend/build /app/frontend/build
COPY --from=backend /app/backend /app/backend

# Install gunicorn for running the Flask app
RUN pip install gunicorn

# Expose port
EXPOSE 5000

# Start the application
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]