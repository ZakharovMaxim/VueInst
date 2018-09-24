const mongoose = require('mongoose');
const LikeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    photo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image'
    },
    saw: {
      type: Boolean,
      default: false
    }
});

module.exports = mongoose.model('Like', LikeSchema);
