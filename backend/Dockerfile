# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get -y install gcc libpq-dev && \
    apt-get clean

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt


# Add main.py
COPY api/main.py /app/



# # Create a non-root user 'api-user' and switch to it
# RUN groupadd -r api-user && \
#     useradd -r -g api-user -d /app -s /bin/false api-user

# # Change ownership of the /app directory to 'api-user'
# RUN chown -R api-user:api-user /app

# # Switch to 'api-user'
# USER api-user


# Expose the port the app runs on
EXPOSE 8000


# Set default command, it could be overridden by docker run if necessary
CMD ["uvicorn", "app.main:app"]
#, "--host", "0.0.0.0", "--port", "8000"]
