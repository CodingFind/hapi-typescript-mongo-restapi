'use strict';
import { Server } from '@hapi/hapi'

import { userRoutes } from './routes/user.routes'
import { projectRoutes } from './routes/project.routes'
import { taskRoutes } from './routes/task.routes'


const server = new Server({
    port: 3000,
    host: 'localhost'
});

userRoutes(server);
projectRoutes(server);
taskRoutes(server);

export const init = async () => {
    await server.initialize();
    return server;
};

export const start = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});