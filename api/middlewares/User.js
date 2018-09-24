const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');
exports.registration = (req, res, next) => {
  const err = {};
  const data = req.body;
  let promise = new Promise((resolve, reject) => {
    if(!data) reject({ message: 'Нет данных' });
    resolve();
  });
  promise.then(() => {
    if(!data.login || !data.login.length) {
      err['login'] = { message: "Логин не может быть пустым" };
    } else if(data.login.length < 6) {
      err['login'] = { message: "Логин не может быть меньше 6-и символов" };
    } else if(data.login.length > 20) {
      err['login'] = { message: "Логин не может быть больше 20-и символов" };
      return [];
    } else {
      return User.find({ login: data.login}).exec();
    }
  }).then(doc => {
    if(doc && doc.length) err['login'] = { message: "Логин занят" };
    if(!data.mail || !data.mail.length) {
      err['mail'] = { message: "Почта не может быть пуста" };
    } else if(data.mail.length < 6) {
      err['mail'] = { message: "Почта не может быть меньше 6-и символов" };
    } else if(data.mail.length > 255) {
      err['mail'] = { message: "Почта не может быть больше 255-и символов" };
      return [];
    } else return User.find({ mail: data.mail}).exec()
  }).then(doc => {
    if(doc && doc.length) err['mail'] = { message: "Почта занята" };
    if(!data.name.length) err['name'] = { message: "Не заполнено имя" };
    else if(data.name.length < 2) err['name'] = { message: "Слишком короткое имя" };
    else if(data.name.length > 40) err['name'] = { message: "Слишком длинное имя" };
    if(!data.password.length) err['password'] = { message: "Не заполнено поле" };
    else if(data.password.length < 6) err['password'] = { message: "Слишком короткий пароль" };
    else if(data.password.length > 40) err['password'] = { message: "Слишком длинный пароль" };
    if(Object.keys(err).length) {
      res.status(422)
      return res.send(err);
    }
    return next();
  }).catch(e => {
    console.log(e);
    res.send(e);
  })
}

exports.changeInfo = (req, res, next) => {
  const err = {};
  const data = req.body;
  if(data.login !== undefined) {
    if(!data.login.length) {
      err['login'] = { message: "Логин не может быть пустым" };
    } else if(data.login.length < 6) {
      err['login'] = { message: "Логин не может быть меньше 6-и символов" };
    } else if(data.login.length > 20) {
      err['login'] = { message: "Логин не может быть больше 20-и символов" };
    }
  }
  if(data.mail !== undefined) {
    if(!data.mail.length) {
      err['mail'] = { message: "Почта не может быть пуста" };
    } else if(data.mail.length < 6) {
      err['mail'] = { message: "Почта не может быть меньше 6-и символов" };
    } else if(data.mail.length > 255) {
      err['mail'] = { message: "Почта не может быть больше 255-и символов" };
    }
  }
  if(data.name !== undefined) {
    if(!data.name.length) err['name'] = { message: "Не заполнено имя" };
    else if(data.name.length < 2) err['name'] = { message: "Слишком короткое имя" };
    else if(data.name.length > 40) err['name'] = { message: "Слишком длинное имя" };
  }
    User.findOne({mail: data.mail, _id: {$ne: req.user.id}}).exec().then(user => {
      if(user) {
        err['mail'] = { message: "Почта занята"};
      }
      if(data.login !== undefined) return User.findOne({login: data.login, _id: {$ne: req.user.id}})
    }).then(user => {
      if(user) {
        err['login'] = { message: "Логин занят"};
      }
      req.err = err;
      if(Object.keys(err).length) {
        res.status(422)
        return res.send(err);
      }
      next();
    }).catch(e => {
      console.log(e);
      res.send(e);
    })

}

exports.login = (req, res, next) => {
  const err = {};
  if(!req.body.login || !req.body.login.length) {
    err['login'] = { message: "Пустой логин"};
  }
  if(!req.body.password || !req.body.password.length) {
    err['password'] = { message: "Пустой пароль"};
  }
  if(Object.keys(err).length) return res.status(401).send(err);
  return next();
}
