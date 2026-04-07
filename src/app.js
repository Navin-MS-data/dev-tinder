import express from 'express';

const app = express();

app.use('/', (req, res, next) => {
  res.send('Namaste Navin');
});

app.use('/hello', (req, res, next) => {
  res.send('Hello hello Hello');
});

app.use('/test', (req, res, next) => {
  res.send('Hello from the server!');
});

app.listen(3000, () => {
  console.log('Server is running on PORT 3000');
});