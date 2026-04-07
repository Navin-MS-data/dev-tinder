import express from 'express';

const app = express();
//This will handle GET requests to /user
app.get('/user', (req, res, next) => {
    res.send({ firstName: 'Navin', lastName: 'Kumar' });
});

//This will handle POST requests to /user
app.post('/user', (req, res, next) => {
    res.send('Data saved successfully');
});

app.delete('/user', (req, res) => {
    res.send('User deleted successfully');
});

//this will match all the HTTP method api calls to /test
app.use('/test', (req, res, next) => {
    res.send('Hello from the server!');
});

app.listen(3000, () => {
    console.log('Server is running on PORT 3000');
});
