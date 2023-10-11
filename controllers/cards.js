const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({}).orFail(() => {
    const error = new Error('Nenhum cartão encontrado');
    error.status = 404;
    throw error;
  })
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(404).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const id = req.user._id;

  Card.create({ name, link, owner: id })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports.deleteCardById = (req, res) => {
  const userId = req.params.id;

  Card.findByIdAndRemove(userId).orFail(() => {
    const error = new Error('Nenhum cartão com este ID encontrado');
    error.status = 404;
    throw error;
  })
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(404).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(() => {
    const error = new Error('Nenhum cartão com este ID encontrado');
    error.status = 404;
    throw error;
  })
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(404).send({ message: err.message }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(() => {
    const error = new Error('Nenhum cartão com este ID encontrado');
    error.status = 404;
    throw error;
  })
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(404).send({ message: err.message }));
};
