<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

API Calculator that evaluates string mathematical expressions.

### Observations
* The API only works with +, -, *, /, (, ) operators.
* The API only works with positive numbers. If a result of an operation is negative, the API will return an error.

## Installation

1. Install Node and NPM from [here](https://nodejs.org/en/download/)
2. Execute the following commands in the root folder of the project:

```bash
#Install Nest CLI
$ npm install -g @nestjs/cli

#Install Yarn package manager
$ npm install --global yarn

#Install dependencies
$ yarn install
```


## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test many math expressions at once

```bash
# unit tests
$ yarn test
```

## Test Endpoint with [Postman](https://www.getpostman.com/)
After running the app, you can test the API with Postman. Import the file `calculator.postman_collection.json` in Postman and run the request.