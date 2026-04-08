export const adminAuth = (req, res, next) => {
    const token = 'xyz';
    const isAdminAuthorized = token === 'xyz';
    if (!isAdminAuthorized) {
        return res.status(401).send('Unauthorized request');
    }
    next();
};

export const userAuth = (req, res, next) => {
    const token = 'XYZ';
    const isUserAuthorized = token === 'XYZ';
    if (!isUserAuthorized) {
        return res.status(401).send('Unauthorized request');
    }
    next();
};
