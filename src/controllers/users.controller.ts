import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'

import User from '../models/User'

export const createUser = async (request: Request, h: ResponseToolkit):
    Promise<ResponseObject> => {
    try {
        const user = new User(request.payload);
        const userSaved = await user.save();
        return h.response(userSaved);
    } catch (error) {
        return h.response({
            status: 'error',
            message: error.message
        }).code(500);
    }
}

export const getUsers = async (request: Request, h: ResponseToolkit):
    Promise<ResponseObject> => {
    try {
        const queryObj = { ...request.query };        
        const users = await User.find(queryObj);
        return h.response(users);
    } catch (error) {
        return h.response({
            status: 'error',
            message: error.message
        }).code(500);
    }
}
