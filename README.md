# Event Management System (Fastify)

Node.js + Fastify service that aggregates users/events from external APIs and allows scheduling new events.

## Tech Stack

- Node.js
- Fastify
- MSW

## Project Structure

```
  challenge-backend/
  ├── services/
  │   ├── index.js           # Main entry point
  │   ├── config/
  │   │   └── env.js         # Environment config
  │   ├── routes/
  │   │   ├── health.js      # Health endpoint
  │   │   ├── users.js       # User endpoints
  │   │   └── events.js      # Event endpoints
  │   └── utils/
  │       └── apiClient.js   # API client wrapper
  ├── mock-server/
  │   └── index.js           # MSW mock server
  ├── .env                   # Environment variables
  └── package.json           # Dependencies & scripts
```

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
- Feature: Organized code into modular services and routes. When app grows we can scale it better with clear separation of concerns and maintainability. After endpoints starts to grow we should consider extracting business logic into separate service modules like controllers and data access layers.

## Task Two

- Discover: Identified performance bottleneck in `/getEventsByUserId` endpoint due to sequential API calls
- Fix: Implemented parallel API calls using Promise.all to improve performance
- Feature: Added error handling for individual API call failures while still returning successful results

## Task Three
- Discover: Identified resilience issue in `/addEvent` endpoint due to dependency on external service that can fail under load
- Feature: Added detailed documentation of the retry mechanism behavior
- Feature: Implemented rate limiting to prevent overwhelming the external service
- Feature: Added error counting and time-based reset logic for resilience
- Feature: Added retryAfter timestamp to track when the service can accept requests again
- Feature: Added comprehensive logging for retry and rate limiting events
- Feature: Added 429 status code with retry-after header for client guidance

## Notes
- For following development I would add unit tests to validate all endpoints and error scenarios
- I would also consider adding integration tests to verify the external service interactions, additionally, I would implement proper monitoring and alerting for the rate limiting and retry mechanisms.
- I also ran out of time to finalize the entire testing solution for the retry and rate limiting features
- It would be great to add typescript support and husky for code consistency and quality checks
