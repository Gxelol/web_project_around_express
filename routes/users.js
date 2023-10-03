const router = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

const userPath = path.join(__dirname, '../data/users.json');

router.get('/users', (req, res) => {
  fsPromises.readFile(userPath, { encoding: 'utf8' })
    .then((users) => {
      res.send({ data: JSON.parse(users) });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/users/:id', (req, res) => {
  fsPromises.readFile(userPath, { encoding: 'utf8' })
    .then((users) => {
      const parsedUsersData = JSON.parse(users);
      const user = parsedUsersData.find((user) => user._id === req.params.id);
      if (!user) {
        res.status(404).send({ message: 'Usuário não encontrado' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
