import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'

import Project from '../models/Project'

export const createProject = async (request: Request, h: ResponseToolkit):
    Promise<ResponseObject> => {
    try {
        const project = new Project(request.payload);
        const projectSaved = await project.save();
        await Project.findByIdAndUpdate(
            { _id: projectSaved._id },
            { user: request.params.id },
            { new: true }
        );

        return h.response(projectSaved);
    } catch (error) {
        return h.response({
            status: 'error',
            message: error.message
        }).code(500);
    }
}

export const getProjects = async (request: Request, h: ResponseToolkit):
    Promise<ResponseObject> => {
    try {
        const findObj: any = {};
        const queryObj = { ...request.query };

        if (queryObj.name) findObj.name = queryObj.name;
        if (queryObj.user) findObj.user = { $in: (queryObj.user as string).split(',') };
        if (queryObj.body) findObj.body = queryObj.body;
        if (queryObj.status) findObj.status = { $in: (queryObj.status as string).split(',') };

        const projects = await Project.find(findObj);
        return h.response(projects);
    } catch (error) {
        return h.response({
            status: 'error',
            message: error.message
        }).code(500);
    }
}
