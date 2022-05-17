# Storefront Backend Project
### The backend of a storefront project, using node.js, express, typescript and postgres database. Fully made from the API endpoints to interacting with the database.
Uses: 
- Postgres for the database.
- Node/Express for the application logic.
- dotenv from npm for managing environment variables.
- db-migrate from npm for migrations.
- jsonwebtoken from npm for working with JWTs.
- jasmine from npm for testing.
- bcrypt for password hashing.

## Features
- Databases for Users, Products, Orders and Order_Products, with migrations.
 - Fully scalable project architecture and can be easily extended, separating handlers, models, routes, tests, middlewares, etc. into their own folder.
 - Extensive unit testing on all API endpoints, and on all models' methods and database actions.
 - User Authentication & password hashing before storing in the database.
 - Validation on data inputs for all endpoints, and proper error handling.

  
## Getting Started

### Available NPM scripts

- npm run start // Compiles to Javascript and runs the project

- npm run watch // Watches for changes and compiles Typescript

- npm run test // Compiles to Javascript and runs the tests

- npm run tsc // Compiles to Javascript

### Installation
The project runs on port 3030 for development, and 8060 for testing.
- Create the required databases, as specified in database.js and .env file.

- Run the script `npx db-migrate up` to run all the migrations.

- Now you are ready to start. Run `npm run start`.

- To run the unit tests, run `npm run test`.

