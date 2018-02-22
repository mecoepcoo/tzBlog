/* 管理员登录接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
var jwt = require('jwt-simple');
const hash = require('../../lib/hash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const getCaptcha = require('../../lib/captcha').getCaptcha;
const AdminUserModel = require('../../models/admin-user');

router.route('/login')
  .post( (req, res) => {
    let username = req.body.username || '';
    let password = req.body.password || '';
    const captcha = req.body.captcha || '';
    username = username.replace(/\$/g, '');

    if (captcha === '' || captcha != req.session.captcha) {
      req.session.captcha = '';
      return re.r401(captcha, `${lang.UNAUTHORIZED},验证码错误`, res);
    }

    // 参数校验
    try {
      if (!username.length) {
        throw new Error('用户名未填写');
      }
      if (!password.length) {
        throw new Error('密码未填写');
      }
    } catch (e) {
      req.session.captcha = '';
      return re.r400(e, e.message, res);
    }

    const userQuery = AdminUserModel.AdminUser.findOne()
      .where({
        name: username,
        isBan: {
          $ne: true
        }
      })
      .then(userInfo => {
        const salt = userInfo.salt;
        password = hash.buildPwd(password, salt);
        if (userInfo.password === password) {
          const token = jwt.encode(
            {
              username: username,
              time: new Date().getTime()
            },
            lang.jwtSecret
          );
          return res.status(200).json({
            status: 1,
            message: lang.OK,
            data: {
              username: username,
              token: token
            }
          });
        } else {
          req.session.captcha = '';
          return re.r401({ username: username }, `${lang.UNAUTHORIZED},用户名或密码错误`, res);
        }
      }, err => {
        return re.r401({ username: username }, `${lang.UNAUTHORIZED},用户名或密码错误`, res);
      });
  });

router.route('/captcha')
  /**
   * @api {get} /captcha 获取验证码
   * @apiName getCaptcha
   * @apiDescription 获取验证码接口，客户端需要支持cookie
   * @apiGroup GroupUser
   * @apiVersion 1.0.0
   * 
   * @apiUse STATUS
   * @apiSuccess {string} data svg字符串
   * @apiSuccessExample {json} Success-Example:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": 200,
   *       "message": "操作成功",
   *       "data": "<svg>...</svg>"
   *     }
   */
  .get(function (req, res) {
    try {
      const captchaCode = getCaptcha();
      req.session.captcha = captchaCode.text;

      res.type('svg');
      return re.r200mes(captchaCode.data, lang.OK, res);
    } catch (e) {
      console.error(e);
    }
  });

router.route('/logout')
  /**
   * @api {get} /user/logout 退出登录
   * @apiName logout
   * @apiDescription 退出登录接口，请求成功后清空登录session和cookie信息
   * @apiGroup GroupUser
   * @apiVersion 1.0.0
   * 
   * @apiUse STATUS
   * @apiSuccessExample {json} Success-Example:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": 1,
   *       "message": "操作成功",
   *     }
   */
  .get(function (req, res) {
      req.session.captcha = '';
      res.clearCookie('login');
      return re.r200mes([], lang.OK, res);
  });

module.exports = router;