# NodeJS Backend Scaffold

This scaffold is a starting point for prototyping projects that
require a backend that supplies REST endpoints and/or websocket endpoints.

## Description

ExpressJS has been used to achieve simplicity and express-ws has been
used to provide a convenient abstraction for a websocket implementation.

The scaffold implements a simple chat server.  Users can use a POST endpoint
to send a message and a GET endpoint to retrieve the history of messages
sent.  It does not implement identity or timestamps when storing messages.

Users can also connect via websocket.  When they connect they will receive
the current history of messages previously sent.  When they send a message
then it is stored in the history and sent to all connected users.

## Installation

`npm install`.

## Running

`node index.js`

Interact with it using something like Postman for the REST stuff, and
websocat (`brew install websocat`) for the websocket endpoint.

## Testing

Since so much of the functionality in Express apps is provided by the
framework itself and we're essentially just configuring it, choosing
an appropriate level of the test pyramid involves asking, "Are we testing
our code or the framework?"

Since we don't have much functional business logic, it doesn't make sense
to unit test.  We could have done integration testing but it would have
been indistinguishable from e2e tests.

So, only "e2e" tests for the chat server are provided.  For prototyping,
they are reasonable since we care that our configuration of Express 
results in well-behaved backend.

We've implemented this with Jest and supertest for the REST endpoints,
and Jest and the websocket client library for the websocket endpoint.

If you add business logic, then it would be reasonable to drive that
with unit tests.  Dependencies have been provided for Jest, Chai, and Enzyme
for your convenience.
