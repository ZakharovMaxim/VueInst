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
  let isProfile = false,
    data,
    update = false,
    id = "",
    description;
  let promise = new Promise((resolve, reject) => {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      if (fields.isProfile && !!+fields.isProfile[0]) isProfile = true;
      description = fields.description;
      resolve(files);
    });
  });
  promise
    .then(files => {
      const uploadFolder = path.resolve(
        __dirname,
        "../public/images/user/" + req.user.login
      );
      return service.upload(files.image[0], uploadFolder);
    })
    .then(result => {
      if (result.status === 500) throw result;
      data = {
        src: "images/user/" + req.user.login + "/" + result.name,
        date: new Date(),
        user_id: req.user.id,
        description,
        isProfile
      };
      if (!isProfile) {
        data._id = mongoose.Types.ObjectId();
        let image = new Image(data);
        return image.save();
      } else {
        update = true;
        return false;
      }
    })
    .then(data => {
      if (!data) {
        return Image.findOne({ user_id: req.user.id, isProfile: true });
      } else {
        id = data._id;
        return false;
      }
    })
    .then(img => {
      if (img) {
        return service.deleteImage(img.src);
      } else {
        return;
      }
    })
    .then(() => {
      if (update) {
        return Image.update({ user_id: req.user.id, isProfile: true }, data, {
          upsert: true
        });
      } else return;
    })
    .then(data => {
      if (data && data.upserted) {
        id = data.upserted[0]._id;
      }
      res.send(id);
    })
    .catch(err => {
      if (err) res.status(500).send(err);
    });
};
exports.removePost = (req, res, next) => {
  Image.remove({ _id: req.body.post_id })
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
    return res.send(posts);
  }).catch(e => {
    console.log(e);
    return res.status(500).send(e);
  })
}
exports.getAllPostsByUser = (req, res) => {
  
    
}