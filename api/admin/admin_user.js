/* 管理员接口 */
const express = require('express');
const router = express.Router();
const hash = require('../../lib/hash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const AdminUserModel = require('../../models/admin-user');

/**
 * @apiDefine GroupAdminUser 管理员
 */

/**
 * @apiDefine STATUS
 * @apiSuccess {string} message 文本信息
 */
router.route('/adminusers')
  /**
   * @api {get} /adminusers 获取管理员列表
   * @apiName getAdmins
   * @apiDescription 获取管理员列表
   * @apiGroup GroupAdminUser
   * @apiVersion 1.0.0
   *
   * @apiUse STATUS
   * @apiSuccess {json} data
   * @apiSuccess {string} data.name 管理员用户名
   * @apiSuccess {number} total 总条数
   */
  .get( (req, res) => {
    const page = +req.query.page || 1;
    const pageSize = +req.query.pageSize || 5;
    const result = {};
    // 取管理员列表
    const adminUserQuery = AdminUserModel.AdminUser.find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({_id: -1})
      .exec()
      .then(users => {
        result.users = users;
      }, err => {
        return re.r404(err, lang.NOT_FOUND, res);
      });
    // 取文档总数
    const adminUserCountQuery = AdminUserModel.AdminUser.count()
      .exec()
      .then(count => {
        result.total = count;
      }, err => {
        return re.r404(err, lang.NOT_FOUND, res);
      });

    Promise.all([adminUserQuery, adminUserCountQuery])
      .then(() => {
        return re.r200(result.users, lang.OK, result.total, res);
      })
  })

  /**
   * @api {post} /adminusers 新增管理员
   * @apiName creatAdmin
   * @apiDescription 新增管理员
   * @apiGroup GroupAdminUser
   * @apiVersion 1.0.0
   * 
   * @apiUse STATUS
   * @apiSuccess {json} data 
   * @apiSuccess {string} data.name 管理员名
   * @apiSuccess {string} data.isBan 管理员是否禁用 true: 禁用，false: 启用
   */
  .post( (req, res) => {
    const adminName = req.body.adminName;
    let password = req.body.password;
    const salt = hash.setSalt(32);
    password = hash.buildPwd(password, salt);
    const newAdminUser = new AdminUserModel.AdminUser({
      name: adminName,
      password: password,
      salt: salt,
      createDate: new Date().getTime(),
      lastLogin: 0,
      isBan: false
    });

    newAdminUser.save()
      .then(data => {
        delete data.password;
        delete data.salt;
        delete data.createDate;
        delete data.lastLogin;
        return re.r201(data, lang.CREATE_OK, res);
      }, err => {
        return re.r104(err, lang.DUPLICATE, res);
      })

      .put( (req, res) => {
        const id = req.params.id;
      })

  });



module.exports = router;