const fs = require('fs');
const path = require('path');
var mkdirp = require('mkdirp');
exports.upload = (file, uploadFolder) => {
  const name = updateName(file.originalFilename, uploadFolder);
  const filepath = file.path;
  const verifyRes = verify(name, uploadFolder);
  return new Promise((resolve, reject) => {
    if(typeof verifyRes === 'object') reject(verifyRes);
    resolve();
  }).then(() => {
    return mkdirp(uploadFolder);
  }).then(err => {
    if(err) throw new Error(err);
    return fs.readFileSync(filepath);
  }).then((data, err) => {
    if(err) throw new Error(err);
    return fs.writeFileSync(uploadFolder + '/' + name, data);
  }).then(err => {
    if(err) throw new Error(err);
    return {
      status: 200,
      name
    }
  }).catch(err => {
    console.log(err);
    return {
      status: 500,
      message: err.message
    }
  })

}

function updateName(name) {
  return name.split(".")[0] + "(" + Date.now() + ")"+ "." + name.split(".")[1]
}

function verify(name) {
  let pathes = name.split('.');
  let formats = ["png", "jpg", "jpeg", "gif"];
  if(pathes.length > 2 || !~formats.indexOf(pathes[1].toLowerCase())) return {
    message: "Изображение имеет неверный формат",
    status: 500
  }
  return true;
}

exports.deleteImage = (src) => {
  new Promise((resolve, reject) => {
    resolve(fs.unlinkSync(__dirname + '../public/' + src))
  })
}
