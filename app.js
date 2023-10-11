const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '6525d2283c0ae290f590eebc',
  };

  next();
});

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('/', (req, res) => {
  res.status(404).send({ message: 'A solicitação não foi encontrada' });
});

app.listen(PORT, () => {
  console.log(`O App está escutando na porta localhost:${PORT}`);
});
