const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    login: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    mail: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    poster: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image'
    }
});
UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', UserSchema);
