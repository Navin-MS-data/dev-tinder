import express from 'express';
import { adminAuth, userAuth } from './middlewares/auth.js';

const app = express();

//handle auth middleware for all requests to /admin
app.use('/admin', adminAuth);

app.get('/admin/getAllData', (req, res) => {
    res.send('All Data sent successfully');
});

app.delete('/admin/deleteUser', (req, res) => {
    res.send('User deleted successfully');
});

app.post('/user/login', (req, res) => {
    res.send('User logged in successfully');
});

app.get('/user', userAuth, (req, res) => {
    res.send('User data sent successfully');
});

app.listen(3000, () => {
    console.log('Server is running on PORT 3000');
});
