/* 管理员接口 */
const express = require('express');
const router = express.Router();
const hash = require('../../lib/hash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const AdminUserModel = require('../../models/admin-user');

// todo api文档编写
router.route('/adminusers')
  .get( (req, res, next) => {
    const page = +req.query.page || 1;
    const pageSize = +req.query.pageSize || 5;
    console.log(page, pageSize)
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
        return re.r201(data, lang.CREATE_OK, res);
      }, err => {
        return re.r104(err, lang.DUPLICATE, res);
      })

    // todo 完成管理员接口推送master分支并新建分支
  });



module.exports = router;