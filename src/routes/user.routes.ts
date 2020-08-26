import { Server } from '@hapi/hapi'

import { createUser, getUsers } from '../controllers/users.controller';

const basePath = '/api/users';

export const userRoutes = (server: Server) => {
    server.route({
        method: 'POST',
        path: basePath,
        handler: createUser
    });

    server.route({
        method: 'GET',
        path: basePath,
        handler: getUsers
    });
}