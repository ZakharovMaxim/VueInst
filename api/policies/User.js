const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const Image = require('../models/Image');
const Like = require('../models/Like');
exports.isAuth = (req, res, next) => {
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === "JWT") {
    let key = fs.readFileSync(path.resolve(__dirname, '..', 'private.key'), 'utf8');
    key = key ? key : "defaultKey";
    jwt.verify(req.headers.authorization.split(' ')[1], key, (err, decode) => {
      if(err) return res.status(401).send("Не авторизирован");
      req.user = decode;
      return next();
    });
  } else {
    return res.status(401).send("Не авторизирован");
  }
}

exports.isHis = (req, res, next) => {
  let type = req.body.type;
  if(!type) return res.status(403).send({
    status: 403,
    message: 'Это не твой пост, брат'
  });
  const id = req.body.post_id;
  switch(type) {
    case "post": {
      Image.findOne({_id: id, user_id: req.user.id}).exec().then(img => {
        if(!img) return res.status(403).send({
          status: 403,
          message: 'Это не твой пост, брат'
        });
        next();
      })
      break;
    }
    case "like": {
      break;
    }
    case "comment": {

      break;
    }
    default: next();
  }
}
