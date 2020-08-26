import { Server } from '@hapi/hapi'
import { expect } from 'chai';
import 'mocha';
import { init } from '../server'

describe('Method GET ', () => {
    let server: Server;

    beforeEach(async function () {
        server = await init();
    });

    afterEach(async function () {
        await server.stop();
    });

    it('responds with 200, have.all.keys, to.be.an object', async () => {
        const injectOptions = {
            method: 'get',
            url: '/api/tasks'
        };
        await server.inject(injectOptions)
            .then(res => {
                expect(res.statusCode).to.equal(200);
                expect(res.payload).to.have.all.keys('name', 'user', 'description', 'mark', 'status');
                expect(res.payload).to.be.an('object');
            });
    });

    it('responds with 200, to.be.an object', async (done) => {
        const injectOptions = {
            method: 'get',
            url: '/api/tasks?description=Task description_Task description' +
                '_Task description_Task description_Task description_&mark=10&status=active,' +
                'completed&name=Task_3&user=5f43a2cc5b1f8b071421f21d,5f4395850a6b900654362c27'
        };
        const res = await server.inject(injectOptions);
        expect(res.statusCode).to.equal(200);
        expect(res.payload).to.be.an('object');

        done();
    });
})
