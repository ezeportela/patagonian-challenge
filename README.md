# Challenge Resolution Overview

## Assumptions

- Columns may be unordered
- Columns are unique

## Design Decissions

To resolve this challenge I have chosen a Domain Driven Design (DDD), which a splits the solution into 3 layers.

The application, layer one, has the responsability to create the endpoint.

The second layer, is the domain layer, in this one we have the business logic.

Finally, the third layer is the infrastructure, it does the connections with other services like a database engine.

In addition of that, I also implemented a Test Driven Design (TDD), with the purpose of creating the solution beginning with tests, therefore code quality would always be a part of the development process.

In order to achieve the stretch goal, an in-memory database was used, but further work would be needed to make it production ready.

## Libraries

The main libraries that I have selected to create this solution are:

- config: Very simple library to get the configurations
- csv-batch: Efficient library to process a csv file.
- express: Standard library to create a microservice.
- lodash: Useful well-known functions
- mongodb: Standard driver to connect to mongodb
- mongodb-memory-server: In memory mongodb
- multer: Standard library in addition to express for multipart-forms
- randomstring: Quick way to generate random data
- store: Common place to save key-value pairs
- jest: Fast and safe test framework
- nodemon: Automatic hot reload for faster development

## Scripts

- npm start
- npm test
- npm run coverage
- npm run dev
