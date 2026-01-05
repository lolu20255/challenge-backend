# Event Management System (Fastify)

Node.js + Fastify service that aggregates users/events from external APIs and allows scheduling new events.

## Tech Stack

- Node.js
- Fastify
- MSW

## How to run

- npm install
- npm run start

## API Endpoints

- GET /getUsers
- POST /addEvent
- GET /getEvents
- GET /getEventsByUserId/:id

___

# Documentation

## Task One

- Fix: If you run the app using MSW version v2.7.3 the app will not work because ES Module compatibility issue. To fix this issue you need to update your package.json file to use "type": "module". Then, update code syntax in cases like "import" and "module.export" issues.
- Feature: Added .gitignore file to exclude node_modules, environment files, and log files.
- Feature: Added environment variable configuration with .env file and dotenv package
