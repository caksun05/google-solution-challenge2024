# Base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements.txt
COPY requirements.txt requirements.txt

# Install dependencies
RUN pip install -r requirements.txt

# Copy app code
COPY . .

# Expose port for Flask app
EXPOSE 5000

# Set environment variable for OpenAI API key
ENV OPENAI_API_KEY=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

# Run the Flask app
CMD ["python", "app.py"]