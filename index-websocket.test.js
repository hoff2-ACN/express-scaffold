const request = require('supertest');
const WebSocket = require("ws");
const Chance = require('chance');

describe('system', () => {
    const chance = new Chance();

    let expressApp, expressServer;

    beforeEach(() => {
        const {app, server} = require('./index');
        expressApp = app;
        expressServer = server;
    });

    afterEach(function (done) {
        if (expressServer) {
            expressServer.on('close', () => {
                done();
            });

            expressServer.close(() => {
                expressServer.unref();
            });
        }
    });

    test('should accept client connection', (done) => {
        const wsClient = new WebSocket('ws://localhost:3000/', [], {});
        wsClient.on('open', () => {
            wsClient.close(undefined, () => {});
            done();
        });
    });

    test("should echo sent messages", (done) => {
        const expectedMessage = chance.string();
        const wsClient = new WebSocket("ws://localhost:3000", [], {});
        wsClient.on("open", () => {
            wsClient.send(expectedMessage);
        });
        wsClient.on('message', (event) => {
            expect(event).toEqual(expectedMessage);
            wsClient.close(undefined, () => {});
            done();
        });
    });
});
