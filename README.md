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
### Database Setup
1- Create the dev and test databases
```sql
CREATE DATABASE store_project;
CREATE DATABASE store_project_test;
```
2- Create the user for the application
```sql
CREATE USER app_user WITH PASSWORD '1234';
```
3- Grant privileges on databases to user
```sql
GRANT ALL PRIVILEGES ON DATABASE store_project TO app_user;
GRANT ALL PRIVILEGES ON DATABASE store_project_test TO app_user;
```
4- You are set. Now run the migrations with `npx db-migrate up`

### Environment File Setup
Create a .env file at the root of the project, with the following data:
```d
DB_HOST = 'localhost'
DB_NAME = 'store_project'
DB_TEST_NAME = 'store_project_test'
DB_USER = 'app_user'
DB_PASS = '1234'
ENV = 'dev'
BCRYPT_PEPPER = 'additional-security'
SALT_ROUNDS = 10
TOKEN_SECRET = 'unprecedented-secret'
```

### Installation
The project runs on port 3030 for development, and 8060 for testing.
- Setup the required databases.

- Run the script `npx db-migrate up` to run all the migrations.

- Now you are ready to start. Run `npm run start`.

- To run the unit tests, run `npm run test`.

