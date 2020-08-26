import { Server } from '@hapi/hapi'

import {
    createTask,
    getTasks,
    getTaskStats
} from '../controllers/tasks.controller';

const basePath = '/api/tasks';

export const taskRoutes = (server: Server) => {

    server.route({
        method: 'POST',
        path: basePath + '/{id}',
        handler: createTask
    });

    server.route({
        method: 'GET',
        path: basePath,
        handler: getTasks
    });

    server.route({
        method: 'GET',
        path: basePath + '/stats',
        handler: getTaskStats
    });
}