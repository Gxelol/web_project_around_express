const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

app.use('/', userRouter, cardRouter);

app.listen(PORT, () => {
  console.log(`O App está escutando na porta ${PORT}`);
});
