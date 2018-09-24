const mongoose = require('mongoose');
const SubscribeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    who: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    whom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
});

module.exports = mongoose.model('Subscribe', SubscribeSchema);
