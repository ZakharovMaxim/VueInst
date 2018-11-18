const bcrypt = require('bcrypt-nodejs');
const multiparty = require('multiparty');
const service = require('../services/Image')
const dateformat = require('dateformat');
const path = require('path');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const fs = require('fs');
const Image = require('../models/Image');
const Subscribe = require('../models/Subscribe');

exports.getUser = (req, res, next) => {
  let user = {
    subscribersCount: 0,
    subscribesCount: 0
  };
  let id;
  const login = req.query.login;
  User.findOne({login}, {password: 0, __v: 0}).then(found => {
    if(!found) throw {
      status: 404,
      message: 'Пользователь не найден'
    }
    Object.assign(user, found._doc);
    id = user._id;
    return Image.getAllByUser(id, req.headers.host);

  }).then(posts => {
    user.posts = posts;
    return Subscribe.find({$or: [{who: id}, {whom: id}]}
    , {__v: 0, _id: 0});
  }).then(subs => {
    subs.forEach(sub => {
      if(sub.who.toString() == id) {
        user.subscribesCount++;
      } else {
        user.subscribersCount++;
      }
      if(req.user.id.toString() === sub.who.toString()) {
        user.subscriber = true;
      }
    })
    //user.subs = subs;
    return Image.findOne({_id: user.poster})
  }).then(poster => {
    if(poster) user.poster = {src: 'http://' + req.headers.host + '/' + poster.src};
    return res.send(user);
  }).catch(e => {
    console.log(e)
    return res.status(e.status || 500).send(e);
  })
};

exports.login = (req, res, next) => {
  let err = { data: {message: 'Неверные данные'} };
  let user = {};
  User.findOne( {$or: [{mail: req.body.login}, {login: req.body.login}]}).populate('poster')
      .then(found => {
        if(!found) {
          return res.status(401).send(err);
        }
        
        if(!found.comparePassword(req.body.password)) return res.status(401).send(err);
        let key = fs.readFileSync(path.resolve(__dirname, '..', 'private.key'), 'utf8');
        key = key ? key : "defaultKey";
        Object.assign(user, found._doc);
        user.id = user._id;
        const obj = {
          id: user._id, name: user.name, mail: user.mail, login: user.login
        }
        if(user.poster) obj.poster = 'http://' + req.headers.host + '/' + user.poster.src;
        res.status(200).json({ 
          token: jwt.sign(obj, key),
          user: obj
        })
      }).catch(e => {
        res.send(e);
      })
};

exports.logout = (req, res) => {
  let key = fs.readFileSync(path.resolve(__dirname, '..', 'private.key'), 'utf8');
  key = key ? key : "defaultKey";
  jwt.sign({}, key, {expiresIn: 0});
  req.user = null;
  res.sendStatus(200);
};

exports.registration = (req, res, next) => {
    const hash = bcrypt.hashSync(req.body.password);
    const user = new User({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      mail: req.body.mail,
      password: hash,
      login: req.body.login,
    });
    user.save().then(() => {
      res.sendStatus(200);
    }).catch(e => {
      if(e) return next(e);
    });
}


exports.changeInfo = (req, res, next) => {
  if(Object.keys(req.err).length) return res.status(500).send(req.err);
  let key, token;
  User.update({_id: req.user.id}, req.body).then(r => {
    return User.findOne({_id: req.user.id})
  }).then(user => {
    if(!user) throw {
      status: 404,
      message: 'Пользователь не найден'
    }
    key = fs.readFileSync(path.resolve(__dirname, '..', 'private.key'), 'utf8');
    key = key ? key : "defaultKey";
    token = jwt.sign({ id: user._id, name: user.name, mail: user.mail, login: user.login}, key);
    res.send({token, user});
  }).catch(e => {
    console.log(e);
    return res.status(e.status || 500).send(e);
  })
}

exports.changePassword = (req, res, next) => {
  const password = JSON.parse(JSON.stringify(req.body)).password;
  const newPassword = JSON.parse(JSON.stringify(req.body)).newPassword;
  if(newPassword.length < 6) return res.status(401).send({ message: "Длина пароля должна быть больше 6-и символов"})
  User.findById(req.user.id).then(user => {
    if(!user) throw {
      status: 404,
      message: 'Пользователь не найден'
    }
    if(!user.comparePassword(password)) throw {
      status: 422,
      message: 'Вы ввели неверный пароль'
    }
    return new Promise((resolve, reject) => {
      resolve(bcrypt.hashSync(req.body.newPassword));
    })
    
  }).then(hash => {
    return User.update({_id: req.user.id}, {password: hash})
  }).then(() => {
    res.send("OK");
  }).catch(e => {
    console.log(e);
    next(e);
  })
}

exports.subscribe = (req, res, next) => {
  const id = req.body.user_id;
  const data = {
    who: req.user.id,
    whom: id,
    _id: mongoose.Types.ObjectId()
  }
  if(req.user.id == id) return res.status(422).send('Вы не можете подписаться на себя');
  User.findOne({_id: id}).then(user => {
    if(!user) throw {
      status: 404,
      message: 'Пользователь не найден'
    }
    return Subscribe.find({who: req.user.id, whom: id});
  }).then(sub => {
    if(sub && sub.length) throw {
      status: 422,
      message: 'Вы уже подписаны'
    }
    let subscribe = new Subscribe(data);
    return subscribe.save();
  }).then(data => {
    res.send(data._id);
  }).catch(e => {
    console.log(e);
    return res.status(e.status || 500).send(e);
  })
}

exports.unsubscribe = (req, res, next) => {
  const id = req.body.user_id;
  Subscribe.remove({who: req.user.id, whom: id}).then(() => {
    res.send("OK");
  }).catch(e => {
    console.log(e);
    return next(e);
  });
}

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

exports.getUsers = (req, res) => {
  User.find().then(users => res.send(users))
}

exports.search = (req, res) => {
  const query = req.query.s;
  let results = [];
  if(!query) return res.send([]);
  const regexp = new RegExp(query, 'ig');
  User.find({$or: [{
    name: regexp
  }, {
    login: regexp
  }]
  }).populate('poster').then(data => {
    results = [].concat(data)
    results.forEach(user => {
      user.poster = user.poster ? 'http://' + req.headers.host + '/' + user.poster : '';
    })
    res.send(results);
  }).catch(e => {
    console.log(e);
    res.status(500).send(e)
  })
}
exports.changeAvatar = (req, res) => {
  const id = req.user.id;
  let src = '', user = {}, post_id;
  User.findById(id).then(found => {
    Object.assign(user, found._doc);
    if(user.poster) {
      return Image.remove({_id: user.poster._id});
    } else {
      return false;
    }
  }).then(data => {
    const form = new multiparty.Form();
    return new Promise ((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        const uploadFolder = path.resolve(
          __dirname,
          "../public/images/user/" + req.user.login
        );
        resolve(service.upload(files.image[0], uploadFolder));
      });
    })
    
    
  }).then(result => {
    if (result && result.status === 500) throw result;
    const data = {
      _id: mongoose.Types.ObjectId(),
      src: "images/user/" + req.user.login + "/" + result.name,
      date: new Date(),
      user_id: req.user.id,
      isProfile: true
    }
    post_id = data._id
    const img = new Image(data);
    src = 'http://' + req.headers.host + '/' + data.src;
    return img.save();
    
  }).then(data => {
    return User.update({login: req.user.login}, {poster: data._id})
  }).then(() => {
    let key = fs.readFileSync(path.resolve(__dirname, '..', 'private.key'), 'utf8');
    key = key ? key : "defaultKey";
    const obj = {
      id: user._id, name: user.name, mail: user.mail, login: user.login
    }
    obj.poster = src;
    res.status(200).json({ 
      token: jwt.sign(obj, key),
      src
    })
  }).catch(e => {
    console.log(e);
    res.status(e.status || 500).send(e)
  })

}

exports.removeAvatar = (req, res) => {
  const id = req.user.id;
  let src;
  let user = {};
  User.findById(id).then(found => {
    Object.assign(user, found._doc);
    src = found.poster;
    found.poster = null;
    return found.save();
  }).then(() => {
    return Image.remove({_id: src})
  }).then(() => {
    return service.deleteImage(src);
  }).then(d => {
    let key = fs.readFileSync(path.resolve(__dirname, '..', 'private.key'), 'utf8');
    key = key ? key : "defaultKey";
    const obj = {
      id: user._id, name: user.name, mail: user.mail, login: user.login, 
      poster: ''
    }
    res.status(200).json({ 
      token: jwt.sign(obj, key),
      src: ''
    })
  }).catch(e => {
    res.send(e)
  })
  
}

exports.getSubscribers = (req, res, next) => {
  returnUserList('whom', 'who', req, res, next)
}
exports.getSubscribes = (req, res, next) => {
  returnUserList('who', 'whom', req, res, next)
}
function returnUserList (obj, subj, req, res, next) {
  const login = req.query.userLogin;
  let list; 
  User.findOne({login})
    .then(user => {
      if (!user) throw {
        status: 404,
        message: 'User not found'
      }
      return Subscribe.find({[obj]: user._id}).populate({
        path: subj,
        populate: {
          path: "poster"
        }
      })
    }).then(subscribers => {
      list = [];
      subscribers.forEach(sub => {
        let res = {
          ...sub._doc[subj]._doc
        };
        if (res.poster) res.poster.src = 'http://' + req.headers.host + '/' + res.poster.src;
        list.push(res);
      })
      return Subscribe.find({who: req.user.id}, {password: 0, __v: 0})
    }).then(currentUserSubscribes => {
      list.forEach(item => {
        const index = currentUserSubscribes.findIndex(sub => {
          return sub.whom.toString() === item._id.toString()
        })
        if (~index) {
          item.subscribed = true
        }
      })
      res.send({list})
    }).catch(e => {
      
      next(e)
    })
}