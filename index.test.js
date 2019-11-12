const request = require('supertest');
// const Enzyme = require('enzyme');
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

    test('should return empty message history when no messages', done => {
        request(expressApp)
            .get('/message')
            .expect(200)
            .end((err, res) => {
                expect(res.body).toEqual([]);
                done();
            });
    });

    test('should return populated message history when messages', done => {
        const expectedHistory = [
            chance.string()
        ];

        request(expressApp)
            .post('/message')
            .send({"message": expectedHistory[0]})
            .expect(200)
            .end((err, res) => {
                expect(res.body).toEqual({});
            });

        request(expressApp)
            .get('/message')
            .expect(200)
            .end((err, res) => {
                expect(res.body).toEqual(expectedHistory);
                done();
            });
    });
});
