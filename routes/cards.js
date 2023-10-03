const router = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

const cardsPath = path.join(__dirname, '../data/cards.json');

router.get('/cards', (req, res) => {
  fsPromises.readFile(cardsPath, { encoding: 'utf8' })
    .then((cards) => {
      res.send({ data: JSON.parse(cards) });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
