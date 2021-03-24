# Tracking System

Basic tracking system implemented in Node.js (Express), MongoDb and Redis. Tracking system consists of:

- [Tracking System](#tracking-system)
  - [Tracking service](#tracking-service)
  - [MongoDb database](#mongodb-database)
  - [Publish/subscribe system](#publishsubscribe-system)
  - [Client CLI](#client-cli)
  - [Load test CLI](#load-test-cli)

Tracking service, database and publish/subscribe system are containerized with docker-compose, while client CLI and load test CLI are separated from the container and can be run independently.

Running docker container:

    docker-compose up --build

Stopping docker container:

    docker-compose down

Running tests:

    docker-compose up -f docker-compose.test.yml --build

## Tracking service

Implemented in Node.js using Express library and contained in docker container. Provides basic API for publishing account events. Events should be published to the API by GET request in the following format:

    API_URL/accountId?data=eventData

If request query includes data key, API will check the database for accountId. If account is found and is active, API will respond OK and event will be passed to the publish/subscribe system, consisting of account ID, timestamp and event data. Otherwise API will respond with different status code.

All accounts persisted in database can be accessed by the route:

    API_URL/accounts

Connection to the database is made with mongoose library, connection to the publish/subscribe system is made with redis client library.

Tests are located in tracking-service/tests folder. Tests are implemented with mocha and chai, covering basic API requests and connection to the database.

## MongoDb database

Database is populated by dummy accounts, each account consisting of \_id, accountName and isActive properties.

Database is populated by another docker container called mongo-seed, which is run on build and populates initial dummy data from init.json.

## Publish/subscribe system

Implemented with docker-compose, using redis image from docker hub. Running on default port 6379. Tracking service is publishing events to tracking-data channel.

## Client CLI

Client CLI is implemented with Node.js and is not dockerized in the same container as tracking service and publish/subscribe system, just to show that it can receive events from redis over network. It uses commander library for parsing CLI arguments. If connection to redis server drops, client tries to reconnect. When redis server is reachable, connection reestablishes automatically.

Before using client CLI, you should run npm install.

    Usage: node app.js [options]

    Options:

    -a, --address <string>  Redis server address (default: "localhost")
    -p, --port <number>     Redis server port (default: 6379)
    -c, --channel <string>  Redis server port (default: "tracking-data")
    -f, --filter <id...>    Filter messages by account IDs (default: [])
    -h, --help              display help for command

Client is subscribed to tracking-data channel by default. Events can be filtered by account ID, user can specify one or more IDs.

## Load test CLI

This CLI is intended to test the load capabilities of the tracking service. First it creates GET request to the tracking API to get accounts and finds active account's ID to use it for generated requests. For load testing, loadtest library is used.

Before using load test CLI, you should run npm install.

    Usage: node app.js [options]

    Options:

    -a, --address <string>      API address (default: "localhost")
    -p, --port <number>         API port (default: 8000)
    -r, --requests <number>     Number of requests (default: 3000)
    -c, --concurrency <number>  Concurrent connections (default: 20)
    -d, --data <string>         Data string (default: "helloworld")
    -h, --help                  display help for command

loadtest can be also used as standalone command, documentation is available on https://www.npmjs.com/package/loadtest.

Usual tracking service throughput is around 900 req/s for publishing active account events and higher for publishing non valid requests.
