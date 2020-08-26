import { Schema, model } from 'mongoose'
import validator from 'validator'

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        maxlength: [40, 'A user name must have less or equal then 40 characters'],
        minlength: [5, 'A user name must have more or equal then 5 characters']
    },
    surname: {
        type: String,
        required: [true, 'A user must have a surname'],
        unique: true,
        maxlength: [40, 'A user surname must have less or equal then 40 characters'],
        minlength: [5, 'A user surname must have more or equal then 5 characters']
    },
    email: {
        type: String,
        required: [true, 'A user must have a email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
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
    }
});

export default model('User', userSchema);
