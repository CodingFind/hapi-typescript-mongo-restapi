import { Schema, model } from 'mongoose'

const taskSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A task must have a name'],
        unique: true,
        maxlength: [40, 'A task name must have less or equal then 40 characters'],
        minlength: [5, 'A task name must have more or equal then 5 characters']
    },
    description: {
        type: String,
        maxlength: [100, 'A task description must have less or equal then 100 characters'],
        minlength: [10, 'A task description must have more or equal then 10 characters']

    },
    mark: {
        type: Number,
        min: [3, 'A mark must be less or equal then 3'],
        max: [10, 'A mark must be more or equal then 10']
    },
    status: {
        type: String,
        required: [true, 'A task must have a status'],
        enum: {
            values: ['active', 'inactive', 'diclined', 'completed'],
            message: 'Status is either: active, inactive, diclined, completed'
        },
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    user:
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

export default model('Task', taskSchema);

