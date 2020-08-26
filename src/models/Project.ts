import { Schema, model } from 'mongoose'

const projectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A project must have a name'],
        unique: true,
        maxlength: [40, 'A project name must have less or equal then 40 characters'],
        minlength: [5, 'A project name must have more or equal then 5 characters']

    },
    body: {
        type: String,
        maxlength: [100, 'A project body must have less or equal then 100 characters'],
        minlength: [10, 'A project body must have more or equal then 10 characters']
    },
    status: {
        type: String,
        required: [true, 'A project must have a status'],
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

export default model('Project', projectSchema);
