const mongoose = require('mongoose');

const urlPattern = /(https:\/\/|http:\/\/)(w{3}\.)?[/\S]+\/?[^\S]*[#]?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlPattern.test(v);
      },
      message: 'URL inválida!',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
