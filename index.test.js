const request = require('supertest');
// const Enzyme = require('enzyme');

describe('system', () => {
    let expressApp, expressServer;

    beforeAll(() => {
        const {app, server} = require('./index');
        expressApp = app;
        expressServer = server;
    });

    afterAll(function (done) {
        if (expressServer) {
            expressServer.on('close', () => {
                done();
            });

            expressServer.close(() => {
                expressServer.unref();
            });
        }
    });

    test('runs tests', () => {
        expect(1).toEqual(1);
    });

    it('returns an empty message history', done => {
        request(expressApp)
            .get('/')
            .expect(200)
            .end((err, res) => {
                expect(res.body).toEqual([]);
                done();
            });
    });
});
