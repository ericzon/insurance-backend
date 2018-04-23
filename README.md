# Insurance backend

## Description

Backend in charge of serve insurance & clients information.

## Installation

```bash
$ npm i
```

## Environment

Before running the app, is necessary to set .env file:

Create .env empty file on the root path of the project, and paste this:

(These are development vars)
```
NODE_ENV='development'
PORT=4000
LOG_LEVEL='debug'

SECRET='supersecret'
EXPIRY_TIME_MINUTES=5

CLIENTS_URL='http://www.mocky.io/v2/5808862710000087232b75ac'
POLICIES_URL='http://www.mocky.io/v2/580891a4100000e8242b75c5'
```

## Running the app

```bash
# development
$ npm start

# watch mode
$ npm run start:dev

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
# First you need to start a server instance:
$ npm run start:dev

# After you will be able to run e2e tests in other console:
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
