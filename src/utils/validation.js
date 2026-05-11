import validator from 'validator';

export const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error('Name is not valid');
    } else if (!validator.isEmail(email)) {
        throw new Error('Email is not valid');
    } else if (!validator.isStrongPassword(password)) {
        throw new Error('Please Enter strong password');
    }
};

export const validateEditProfileData = (req) => {
    const allowedEditFields = [
        'firstName',
        'lastName',
        'email',
        'photoUrl',
        'gender',
        'age',
        'about',
        'skills',
    ];

    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field),
    );

    return isEditAllowed;
};
