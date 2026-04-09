import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    age: { type: Number },
    gender: { type: String },
});

export const User = mongoose.model('User', userSchema);
