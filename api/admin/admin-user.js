/* 管理员接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const hash = require('../../lib/hash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const AdminUserModel = require('../../models/admin-user');

/**
 * @apiDefine AdminUser 管理员
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
   * @apiGroup AdminUser
   * @apiVersion 1.0.0
   *
   * @apiParam {number} page 页码
   * @apiParam {number} pageSize 每页条数
   * @apiUse STATUS
   * @apiSuccess {json} data
   * @apiSuccess {string} data.name 管理员用户名
   * @apiSuccess {number} data.createDate 管理员创建时间
   * @apiSuccess {number} total 总条数
   * @apiSuccess {boolean} isBan 是否被禁用, false: 启用，true: 禁用
   * 
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *    {
   *         "status": 200,
   *         "message": "操作成功",
   *         "data": [
   *             {
   *                 "_id": "5a6c63ad2a092f4e817dd9fb",
   *                 "name": "admin2",
   *                 "createDate": 1517052845840,
   *                 "isBan": false
   *             },
   *             {
   *                 "_id": "5a6c63a92a092f4e817dd9fa",
   *                 "name": "admin",
   *                 "createDate": 1517052841933,
   *                 "isBan": false
   *             }
   *         ],
   *         "total": 2
   *     }
   */
  .get( (req, res) => {
    const page = +req.query.page || 1;
    const pageSize = +req.query.pageSize || 5;
    const result = {};
    // 取管理员列表
    const adminUserQuery = AdminUserModel.AdminUser.find({}, '_id name createDate isBan')
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
   * @apiName createAdmin
   * @apiDescription 新增管理员
   * @apiGroup AdminUser
   * @apiVersion 1.0.0
   * 
   * @apiParam {string} adminName 管理员用户名
   * @apiParam {string} password 密码 
   * @apiUse STATUS
   * @apiSuccess {json} data 
   * @apiSuccess {string} data.name 管理员名
   * @apiSuccess {number} data.createDate 创建时间
   * @apiSuccess {string} data.isBan 管理员是否禁用 true: 禁用，false: 启用
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *     {
   *       "status": 201,
   *       "message": "插入成功",
   *       "data": {
   *         "__v": 0,
   *         "name": "admin",
   *         "createDate": 1517052248305,
   *         "isBan": false,
   *         "_id": "5a6c61582a092f4e817dd9f7"
   *        }
   *      }
   */
  .post( (req, res) => {
    const adminName = req.body.adminName || '';
    let password = req.body.password || '';

    // 参数校验
    try {
      if (!adminName.length) {
        throw new Error('用户名未填写');
      }
      if (!password.length) {
        throw new Error('密码未填写');
      }
    } catch (e) {
      return re.r400(e, e.message, res);
    }

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
        data = JSON.parse(JSON.stringify(data));
        data = _.omit(data, ['password', 'salt', 'lastLogin']);
        return re.r201(data, lang.CREATE_OK, res);
      }, err => {
        return re.r400(err, lang.DUPLICATE, res);
      })
  })

  /**
   * @api {delete} /adminusers 批量删除管理员
   * @apiName deleteAdmins
   * @apiDescription 批量删除管理员
   * @apiGroup AdminUser
   * @apiVersion 1.0.0
   * 
   * @apiParam {array} ids 管理员id数组
   * @apiUse STATUS
   * @apiSuccess {json} data 
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *     {
   *         "status": 204,
   *         "message": "删除成功",
   *         "data": []
   *     }
   */
  .delete( (req, res) => {
    let ids = req.body.ids;
    // 参数校验
    try {
      if (!_.isArrayLike(ids)) {
        throw new Error('参数必须是数组类型');
      } else {
        ids = JSON.parse(ids);
      }
    } catch (e) {
      return re.r400(e, e.message, res);
    }
    
    const adminUserQuery = AdminUserModel.AdminUser.find().where({
      '_id': {
        '$in': ids
      }
    }).remove();
    adminUserQuery.then(data => {
      return re.r204([], lang.NO_CONTENT, res);
    }, err => {
      return re.r400(err, lang.ERROR, res);
    })
  })


  

router.route('/adminusers/:id')
  /**
   * @api {put} /adminusers/:id 修改指定管理员
   * @apiName updateAdmin
   * @apiDescription 修改指定管理员
   * @apiGroup AdminUser
   * @apiVersion 1.0.0
   * 
   * @apiParam {string} id 管理员id(如果不由path传递，则写在body中)
   * @apiParam {string} adminName 新的管理员名
   * @apiParam {string} password 新的密码
   * @apiParam {boolean} isBan 是否禁用 true: 禁用，false: 启用
   * @apiUse STATUS
   * @apiSuccess {json} data 
   * @apiSuccess {string} data.name 管理员名
   * @apiSuccess {string} data.isBan 管理员是否禁用 true: 禁用，false: 启用
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *     {
   *       "status": 201,
   *       "message": "更新成功",
   *       "data": {
   *         "__v": 0,
   *         "name": "admin",
   *         "createDate": 1517052248305,
   *         "isBan": false,
   *         "_id": "5a6c61582a092f4e817dd9f7"
   *        }
   *      }
   */
  .put( (req, res) => {
    const id = req.params.id || req.body.id || '';
    const adminName = req.body.adminName || '';
    const isBan = req.body.isBan;
    let password = req.body.password || '';
    // 参数校验
    try {
      if (!id.length) {
        throw new Error('缺少参数id');
      }
      if (!adminName.length) {
        throw new Error('请填写用户名');
      }
      if (!password.length) {
        throw new Error('请填写密码');
      }
      if (isBan === undefined) {
        throw new Error('请选择禁用状态');
      }
    } catch (e) {
      return re.r400(e, e.message, res);
    }

    const salt = hash.setSalt(32);
    password = hash.buildPwd(password, salt);

    const adminUsersQuery = AdminUserModel.AdminUser.findOne().where({'_id': id}).exec()
    .then(adminUser => {
      adminUser.name = adminName;
      adminUser.password = password;
      adminUser.salt = salt;
      adminUser.isBan = isBan;
      return adminUser.save();
    }, err => {
      return re.r400(err, lang.ERROR, res);
    })
    .then(data => {
      data = JSON.parse(JSON.stringify(data));
      data = _.omit(data, ['password', 'salt', 'lastLogin']);
      return re.r201(data, lang.UPDATE_OK, res);
    }, err => {
      return re.r400(err, lang.DUPLICATE, res);
    })
  })
  
  /**
   * @api {delete} /adminusers/:id 删除指定管理员
   * @apiName deleteAdmin
   * @apiDescription 删除指定管理员
   * @apiGroup AdminUser
   * @apiVersion 1.0.0
   * 
   * @apiParam {string} id 管理员id 
   * @apiUse STATUS
   * @apiSuccess {json} data 
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *     {
   *         "status": 204,
   *         "message": "删除成功",
   *         "data": []
   *     }
   */
  .delete( (req, res) => {
    const id = req.params.id || req.body.id || '';
    try {
      if (!id.length) {
        throw new Error('缺少id参数');
      }
    } catch (e) {
      return re.r400(e, e.message, res);
    }
    const adminUsersQuery = AdminUserModel.AdminUser.findOne().where({'_id': id}).remove()
    .then(data => {
      return re.r204([], lang.NO_CONTENT, res);
    }, err => {
      return re.r400(err, lang.ERROR, res);
    })
  });
  
module.exports = router;