const mongoose = require('mongoose');
const service = require('../services/Image');
const Comment = new mongoose.Schema({ 
  text: 'string', 
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {type: Date, default: new Date()} });

const ImageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    src: String,
    description: String,
    date: Date,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    isProfile: {
      type: Boolean,
      default: false
    },
    comments: [Comment],
    likes: [String]
});

ImageSchema.statics.getAllByUser = function (user_id,host, cb) { // user = id
  let res;
  return this.find({'user_id': user_id, isProfile: false}).populate('comments.user_id').populate('user_id', {password: 0, __v: 0}).then(posts => {
    res = JSON.parse(JSON.stringify(posts));
    res.forEach(post => {
      post.src = 'http://' + host + '/' + post.src;
      post.user_id.poster = 'http://' + host + '/' + post.poster;
    })
    return res;
  })
}
ImageSchema.statics.getAll = function (users, host, cb) { //user = Array
  let res;
  return this.find({user_id: users, isProfile: false}, {__v: 0, password: 0}).populate('comments.user_id').populate('user_id', {password: 0, __v: 0}).populate('poster').then(posts => {
    console.log(posts);
    res = JSON.parse(JSON.stringify(posts));
    res.forEach(post => {
      post.src = 'http://' + host + '/' + post.src;
      post.user_id.poster = 'http://' + host + '/' + post.user_id.poster;
    })
    return res;
  })
  //return this.where('user_id', users).populate('user_id').exec(cb);
}


ImageSchema.pre('remove', () => {
  console.log(24124124);
  service.deleteImage(this.src);
});
const model = mongoose.model('Image', ImageSchema);
module.exports = model;
