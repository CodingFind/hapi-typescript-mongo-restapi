import { Server } from '@hapi/hapi'
import * as Lab from '@hapi/lab';
import { expect } from '@hapi/code';
const lab = Lab.script();
const { describe, it, beforeEach, afterEach } = lab;
export { lab };

import { init } from '../server'

describe('Method GET ', () => {
    let server: Server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200, to.be.object, to.include', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/api/tasks'
        });

        expect(res.statusCode).to.equal(200);
        expect(res.payload.toString).to.include('status');
        expect(res.payload).to.be.object();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/api/tasks?description=Task description_Task description' +
                '_Task description_Task description_Task description_&mark=10&status=active,' +
                'completed&name=Task_3&user=5f43a2cc5b1f8b071421f21d,5f4395850a6b900654362c27'
        });
        expect(res.statusCode).to.equal(200);
    });

});