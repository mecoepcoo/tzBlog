const jwt = require('jwt-simple');
const lang = require('../../config/lang');
const AdminUserModel = require('../../models/admin-user');
const AdminAuthModel = require('../../models/admin-auth');
const re = require('../../lib/response');
const _ = require('lodash');

function AuthCheck () {
  
}

AuthCheck.prototype = {
  constructor: AuthCheck,

  checkAuth: function (req, auth) {
    let token = req.headers['x-access-token'] || req.body.token || req.query.token;
    if (token === 'undefined' || token === 'null' || token === '' || token === undefined) {
      return false;
    }
    token = jwt.decode(token, lang.jwtSecret);
    if (token.time < new Date().getTime()) {
      return false;
    }
    let authId = '';
    return AdminAuthModel.AdminAuth.findOne({ name: auth })
      .then(authDate => {
        authId = authDate._id;
        return AdminUserModel.AdminUser.findOne({ name: token.username })
        .populate([
          {
            path: '_group',
          },
        ])
      })
      .then(data => {
        let pass = false;
        _.forEach(data._group._auth, _auth => {
          if ('' + _auth === '' + authId) {
            pass = true;
          }
        })
        return pass;
      })
  },
  postList: function (req, res, next) {
    AuthCheck.prototype.checkAuth(req, '文章列表')
      .then(pass => {
        if (pass) {
          next();
        } else {
          return re.r401('err', '权限不足', res);
        }
      });
  }
}
const check = new AuthCheck();

module.exports = check;