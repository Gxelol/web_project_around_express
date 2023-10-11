const router = require('express').Router();
const {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', deleteCardById);
router.post('/', createCard);
router.put('/:cardId', likeCard);
router.delete('/:cardId', dislikeCard);

module.exports = router;
