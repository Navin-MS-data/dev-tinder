import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 4,
            maxLength: 50,
        },
        lastName: { type: String },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: { type: String, required: true },
        age: { type: Number, min: 18 },
        gender: {
            type: String,
            validate(value) {
                if (!['male', 'female', 'other'].includes(value)) {
                    throw new Error(
                        'Gender must be one of: male, female, other',
                    );
                }
            },
        },
        photoUrl: {
            type: String,
            default: 'https://geographyandyou.com/images/user-profile.png',
        },
        about: {
            type: String,
            default: 'This is a default about of the user!',
        },
        skills: {
            type: [String],
        },
    },
    { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
