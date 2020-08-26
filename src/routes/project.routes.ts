import { Server } from '@hapi/hapi'

import { createProject, getProjects } from '../controllers/projects.controller';

const basePath = '/api/projects';

export const projectRoutes = (server: Server) => {

    server.route({
        method: 'POST',
        path: basePath + '/{id}',
        handler: createProject
    });

    server.route({
        method: 'GET',
        path: basePath,
        handler: getProjects
    });
}
