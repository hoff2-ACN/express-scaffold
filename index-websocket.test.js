const WebSocket = require("ws");
const Chance = require('chance');

describe('system', () => {
    const chance = new Chance();
    let wsClient, wsClient2, expressServer;

    beforeEach(() => {
        const {server} = require('./index');
        expressServer = server;
        wsClient = new WebSocket('ws://localhost:3000/', [], {});
    });

    afterEach(() => {
        wsClient.close(undefined, () => {
        });
        if (wsClient2) {
            wsClient2.close(undefined, () => {});
        }
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

    describe("send and receiving messages", () => {
        let expectedMessage, responses;

        beforeEach(() => {
            expectedMessage = chance.string();
            responses = [];
        });

        test("should echo messages from clients", (done) => {
            sendMessageWhenOpen(wsClient, expectedMessage);
            expectHistoryThenMessage(wsClient, expectedMessage, done);
        });

        test("should send received message to all clients", (done) => {
            wsClient2 = new WebSocket('ws://localhost:3000/', [], {});
            sendMessageWhenOpen(wsClient, expectedMessage);
            expectHistoryThenMessage(wsClient2, expectedMessage, done);
        });

        const sendMessageWhenOpen = (wsClient, message) => {
            wsClient.on("open", () => {
                wsClient.send(message);
            });
        };

        const expectHistoryThenMessage = (wsClient, message, done) => {
            wsClient.on('message', (event) => {
                responses.push(event);
                if (responses.length > 1) {
                    expect(responses).toContain(message);
                    done();
                }
            });
        };
    });

    test("should send message history upon connecting", (done) => {
        wsClient.on('message', (event) => {
            const history = JSON.parse(event);
            expect(Array.isArray(history)).toEqual(true);
            done();
        });
    });

    test("adds messages from clients to the message history", (done) => {
        const expectedMessage = chance.string();
        wsClient.on("open", () => {
            wsClient.send(expectedMessage);

            wsClient2 = new WebSocket('ws://localhost:3000/', [], {});
            wsClient2.on('message', (event) => {
                const history = JSON.parse(event);
                expect(history).toContain(expectedMessage);
                wsClient2.close(undefined, () => {});
                done();
            });
        });
    });
});

