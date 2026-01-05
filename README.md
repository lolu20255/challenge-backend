# Event Management System (Fastify)

Node.js + Fastify service that aggregates users/events from external APIs and allows scheduling new events.

## Tech Stack

- Node.js
- Fastify
- MSW

## How to run

- npm install
- npm run dev

## API Endpoints

`GET /getUsers`
Returns all users from the mock API
```bash
curl --location --request POST 'http://localhost:3000/addEvent' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "hello",
    "userId": "3"
}'
```

`POST /addEvent`
Schedules a new event
```bash
curl --location --request POST 'http://localhost:3000/addEvent' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "test event",
    "userId": "1"
}'
```

`GET /getEvents`
Returns all events
```bash
curl --location 'http://localhost:3000/getEvents'
```

`GET /getEventsByUserId/:id`
Returns events for a specific user
```bash
curl --location 'http://localhost:3000/getEventsByUserId/1'
```

___

# Documentation

## Task One

- Fix: If you run the app using MSW version v2.7.3 the app will not work because ES Module compatibility issue. To fix this issue you need to update your package.json file to use "type": "module". Then, update code syntax in cases like "import" and "module.export" issues.
- Feature: Added .gitignore file to exclude node_modules, environment files, and log files.
- Feature: Added environment variable configuration with .env file and dotenv package
- Feature: Added health check endpoint at /health
- Feature: Added development server with nodemon for auto-restart during development
- Feature: Added ESLint configuration for code quality
- Feature: Documented API endpoints with curl examples
