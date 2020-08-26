import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'

import Task from '../models/Task'

export const createTask = async (request: Request, h: ResponseToolkit):
    Promise<ResponseObject> => {
    try {
        const task = new Task(request.payload);
        const taskSaved = await task.save();
        await Task.findByIdAndUpdate(
            { _id: taskSaved._id },
            { user: request.params.id },
            { new: true }
        );
        return h.response(taskSaved);
    } catch (error) {
        return h.response({
            status: 'error',
            message: error.message
        }).code(500);
    }
}

export const getTasks = async (request: Request, h: ResponseToolkit):
    Promise<ResponseObject> => {
    try {
        const findObj: any = {};
        const queryObj = { ...request.query };

        if (queryObj.name) findObj.name = queryObj.name;
        if (queryObj.user) findObj.user = { $in: (queryObj.user as string).split(',') };
        if (queryObj.description) findObj.description = queryObj.description;
        if (queryObj.mark) findObj.mark = { $gte: queryObj.mark };
        if (queryObj.status) findObj.status = { $in: (queryObj.status as string).split(',') };

        const tasks = await Task.find(findObj);

        return h.response({
            status: 'success',
            data: {
                avgMarksOfCompletedTasks: await getTaskStats().then(s => s.avgMarks),
                tasks
            }
        });
    } catch (error) {
        return h.response({
            status: 'error',
            message: error.message
        }).code(500);
    }
}

export const getTaskStats = async ():
    Promise<any> => {
    try {
        const stats = await Task.aggregate([
            {
                $match: {
                    status: { $eq: 'completed' }
                }
            },
            {
                $group: {
                    _id: '$cust_id',
                    avgMarks: { $avg: '$mark' },
                    sumMarks: { $sum: '$mark' },
                }
            }
        ]);

        return !stats[0] ? { avgMarks: 'No completed' } : stats[0];
    } catch (error) {
        return error;
    }
}
