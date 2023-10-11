const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({}).orFail(() => {
    const error = new Error('Nenhum usuário encontrado');
    error.status = 404;
    throw error;
  })
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(404).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  const userId = req.params.id;

  User.findById(userId).orFail(() => {
    const error = new Error('Nenhum usuário com este ID encontrado');
    error.status = 404;
    throw error;
  })
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(404).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }).orFail(() => {
    const error = new Error('Nenhum usuário com este ID encontrado');
    error.status = 404;
    throw error;
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(404).send({ message: err.message }));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }).orFail(() => {
    const error = new Error('Nenhum usuário com este ID encontrado');
    error.status = 404;
    throw error;
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(404).send({ message: err.message }));
};
