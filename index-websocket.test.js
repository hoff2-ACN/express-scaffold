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
        const responses = [];

        wsClient.on("open", () => {
            wsClient.send(expectedMessage);
        });
        wsClient.on('message', (event) => {
            responses.push(event);
            if (responses.length === 2) {
                expect(responses).toEqual(['[]', expectedMessage]);
                done();
            }
        });
    });

    test("should send message history upon connecting", (done) => {
        const expectedHistory = [];

        wsClient.on('message', (event) => {
            const history = JSON.parse(event);
            expect(history).toEqual(expectedHistory);
            wsClient.close(undefined, () => {});
            done();
        });
    });
});
