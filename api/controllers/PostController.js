const bcrypt = require("bcrypt-nodejs");
const multiparty = require("multiparty");
const service = require("../services/Image");
const dateformat = require("dateformat");
const path = require("path");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fs = require("fs");
const Image = require("../models/Image");
const Subscribe = require("../models/Subscribe");
const Like = require("../models/Like");
exports.getPost = (req, res, next) => {
  const id = req.query.id;
  const foundImage = Image.findById(id)
    .then(data => {
      return res.send(data);
    })
    .catch(e => {
      console.log(e);
    });
};
exports.editPost = (req, res) => {
  const id = req.body.post_id;
  const description = req.body.description || "";
  Image.findOne({ _id: id })
    .then(image => {
      if (!image)
        throw {
          message: "Пост не найден",
          status: 404
        };
      image.description = description;
      return image.save();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(e => {
      res.status(e.status).send(e);
    });
};
exports.addPost = (req, res, next) => {
  const row = req.body.image.replace(/^data:image\/png;base64,/, "");
  const description = req.body.description;
  const dir = `public/images/user/${req.user.login}`;
  const fileName = `images/user/${req.user.login}/${+new Date()}.png`;
  
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  // write file
  //
  new Promise((resolve, reject) => {
    fs.writeFile(`./public/${fileName}`, row, 'base64', function(err) {
      if(err) reject(err);
      resolve()
    });
  }).then(() => {
    const image = new Image();
    image.description = description;
    image._id = mongoose.Types.ObjectId();
    image.src = fileName;
    image.user_id = req.user.id;
    return image.save();
  }).then(() => {
    res.send('ok')
  }).catch(e => {
    console.log(e);
    next(e)
  })
  };
exports.removePost = (req, res, next) => {
  Image.remove({ _id: req.params.id })
    .exec()
    .then(() => {
      res.status(200).send("ok");
    })
    .catch(e => {
      res.status(500).send("Ошибка сервера");
    });
};

exports.like = (req, res, next) => {
  const id = req.body.post_id;

  Image.findOne({ _id: id })
    .then(data => {
      if(~data.likes.indexOf(req.user.id)) throw {
        status: 422,
        message: 'Вы уже ставили лайк'
      }
      data.likes.push(req.user.id);
      return data.save();
      //return Image.findOne({_id: id});
      // console.log(data);
      // res.sendStatus(200);
    })
    .then(img => {
      res.sendStatus(200);
    })
    .catch(e => {
      console.log(e);
      return res.status(e.status || 500).send(e);
    });
};

exports.dislike = (req, res, next) => {
  const id = req.body.post_id;

  Image.findOne({ _id: id })
    .then(data => {
      const index = data.likes.indexOf(req.user.id);
      if(!~index) throw {
        status: 422,
        message: 'Вы не ставили лайк'
      }
      data.likes.splice(index, 1);
      return data.save();
      //return Image.findOne({_id: id});
      // console.log(data);
      // res.sendStatus(200);
    })
    .then(img => {
      res.sendStatus(200);
    })
    .catch(e => {
      console.log(e);
      return res.status(e.status || 500).send(e);
    });
};

exports.comment = (req, res, next) => {
  const id = req.body.post_id;
  const text = req.body.text;
  if (!text.length)
    return res.status(500).json({
      status: 500,
      message: "Текст пустой"
    });
  let comment = {
    text,
    user_id: req.user.id
  };
  Image.findOne({ _id: id })
    .then(image => {
      if (!image)
        throw {
          status: 404,
          message: "Пост не найден"
        };
      image.comments.push(comment);
      return image.save();
    })
    .then(r => {
      res.send(r.comments[r.comments.length - 1]._id);
    })
    .catch(e => {
      return res.status(e.status || 500).send(e);
    });
};

exports.removeComment = (req, res, next) => {
  const id = req.body.id;
  const postID = req.body.post_id;
  Image.findOne({ _id: postID })
    .then(img => {
      if (!img)
        throw {
          status: 404,
          message: "Пост не найден"
        };
      const comment = img.comments.id(id);
      if (!comment)
        throw {
          status: 404,
          message: "Комментарий не найден"
        };
        comment.remove();
      return img.save();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(e => {
      console.log(e);
      return res.status(e.status || 500).send(e);
    });
};

exports.getAllPosts = (req, res) => {
  const id = req.user.id;
  Subscribe.find({who: id}, {__v: 0, _id: 0}).then(subs => {
    const ids = subs.map(s => s.whom);
    return Image.getAll(ids, req.headers.host);
  }).then(posts => {
    setTimeout(() => {
      return res.send(posts);
    }, 5000)
  }).catch(e => {
    console.log(e);
    return res.status(500).send(e);
  })
}
exports.getAllPostsByUser = (req, res) => {
  
    
}