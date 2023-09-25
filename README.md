# Chat-App

This is a web application built with React and Next.js. The main features include user-friendly interface and efficient data fetching.

## Application Usage

To use the application:

1. Open the application in your browser.
2. Enter your name and the room you want to join.
3. Click the "Join" button.
4. To send a message, type your message in the input field and press "Enter".

## Setup

To set up the application:

1. Clone the repository: `git clone https://github.com/mavr1k/chat-app.git`
2. Navigate to the project directory: `cd chat-app`
3. Install dependencies: `npm install`
4. Set the `MONGODB_URI` environment variable. This should be the connection string to your MongoDB database.
5. Start the application: `npm run dev`

To set up MongoDB locally using Docker:

1. Install Docker: Follow the instructions at https://docs.docker.com/get-docker/
2. Pull the MongoDB Docker image: `docker pull mongo`
3. Run the MongoDB Docker container: `docker run -d -p 27017-27019:27017-27019 --name mongodb mongo`

Alternatively, you can use a Docker Compose file to set up MongoDB. Here is a sample Docker Compose file:

```yaml
version: "3"
services:
  mongodb:
    image: mongo
    ports:
      - 27017-27019:27017-27019
```

To run the Docker Compose file, use the command: `docker-compose up`

Remember to set the `MONGODB_URI` environment variable to `mongodb://localhost:27017` to connect to the local MongoDB instance.

## Contributing

We welcome contributions from the community. To contribute:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes in your branch.
4. Submit a pull request.
