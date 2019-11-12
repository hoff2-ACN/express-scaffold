const request = require('supertest');
const WebSocket = require("ws");
const Chance = require('chance');

describe('system', () => {
    const chance = new Chance();
    let wsClient, expressServer;

    beforeEach(() => {
        const {server} = require('./index');
        expressServer = server;
        wsClient = new WebSocket('ws://localhost:3000/', [], {});
    });

    afterEach(() => {
        wsClient.close(undefined, () => {});
    });

    afterAll((done) => {
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
        wsClient.on('open', () => {
            done();
        });
    });

    test("should echo sent messages", (done) => {
        const expectedMessage = chance.string();
        wsClient.on("open", () => {
            wsClient.send(expectedMessage);
        });
        wsClient.on('message', (event) => {
            expect(event).toEqual(expectedMessage);
            done();
        });
    });

    // test("should send message history upon connecting", (done) => {
    //     const expectedHistory = [];
    //     const wsClient = new WebSocket("ws://localhost:3000", [], {});
    //     // wsClient.on("open", () => {
    //     //     wsClient.send(expectedMessage);
    //     // });
    //     wsClient.on('message', (event) => {
    //         expect(event).toEqual(expectedHistory);
    //         wsClient.close(undefined, () => {});
    //         done();
    //     });
    // });
});
