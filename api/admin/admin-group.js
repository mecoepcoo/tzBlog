/* 管理组接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const AdminGroupModel = require('../../models/admin-group');
const AdminUserModel = require('../../models/admin-user');
const AdminAuthModel = require('../../models/admin-auth');

/**
 * @apiDefine AdminUser 管理员
 */

/**
 * @apiDefine STATUS
 * @apiSuccess {string} message 文本信息
 */
router.route('/admingroups')
  /**
   * @api {get} /adminusers 获取管理员列表
   * @apiName getAdmins
   * @apiDescription 获取管理员列表
   * @apiGroup AdminUser
   * @apiVersion 1.0.0
   *
   * @apiParam {number} page=1 页码
   * @apiParam {number} pagesize=10 每页条数
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
    // 取管理组列表
    AdminGroupModel.AdminGroup.getAdminGroups()
      .then(data => {
        return re.r200(data, lang.OK, -1, res);
      }, err => {
        return re.r404(err, lang.NOT_FOUND, res);
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
    const groupName = req.body.groupname || '';
    const auth = req.body.auth || '';

    // 参数校验
    try {
      if (!groupName.length) {
        throw new Error('管理组名称未填写');
      }
      if (!JSON.parse(auth)) {
        throw new Error('权限格式不正确');
      }
    } catch (e) {
      return re.r400(e, e.message, res);
    }

    const newAdminGroup = new AdminGroupModel.AdminGroup({
      name: groupName,
      _auth: JSON.parse(auth)
    });

    newAdminGroup.save()
      .then(data => {
        return re.r201(data, lang.CREATE_OK, res);
      }, err => {
        return re.r400(err, lang.DUPLICATE, res);
      })
  });

router.route('/admingroups/:id')
  /**
   * @api {put} /adminusers/:id 修改指定管理员
   * @apiName updateAdmin
   * @apiDescription 修改指定管理员
   * @apiGroup AdminUser
   * @apiVersion 1.0.0
   * 
   * @apiParam {string} :id 管理员id(如果不由path传递，则写在body中)
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
    let id = req.params.id || req.body.id || '';
    id = id.replace(/\$/g, '');
    const groupName = req.body.groupname || '';
    const auth = req.body.auth || '';

    // 参数校验
    try {
      if (!id.length) {
        throw new Error('缺少参数id');
      }
      if (!groupName.length) {
        throw new Error('管理组名称未填写');
      }
      if (!JSON.parse(auth)) {
        throw new Error('权限格式不正确');
      }
    } catch (e) {
      return re.r400(e, e.message, res);
    }

    const adminGroupQuery = AdminGroupModel.AdminGroup.findOne().where({'_id': id})
      .then(adminGroup => {
        adminGroup.name = groupName;
        adminGroup._auth = JSON.parse(auth);
        return adminGroup.save();
      }, err => {
        return re.r400(err, lang.ERROR, res);
      })
      .then(data => {
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
   * @apiParam {string} :id 管理员id 
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
    let id = req.params.id || req.body.id || '';
    id = id.replace(/\$/g, '');
    try {
      if (!id.length) {
        throw new Error('缺少id参数');
      }
    } catch (e) {
      return re.r400(e, e.message, res);
    }
    const adminUserQuery = AdminUserModel.AdminUser.findOne().where({_group: id}).populate('_group')
      .then(data => {
        if (data) {
          return re.r400(data, '此管理组下有管理员，无法删除该组', res);
        } else {
          AdminGroupModel.AdminGroup.findOne().where({ '_id': id }).remove()
            .then(data => {
              return re.r204([], lang.NO_CONTENT, res);
            }, err => {
              return re.r400(err, lang.ERROR, res);
            })
        }
      })
  });

router.route('/adminauth')
  .get( (req, res) => {
    AdminAuthModel.AdminAuth.getAdminAuth()
      .then(data => {
        return re.r200(data, lang.OK, -1, res);
      }, err => {
        return re.r404(err, lang.NOT_FOUND, res);
      })
  });
  
module.exports = router;