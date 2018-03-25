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
 * @apiDefine AdminGroup 管理组
 */

/**
 * @apiDefine STATUS
 * @apiSuccess {string} message 文本信息
 */
router.route('/admingroups')
  /**
   * @api {get} /admingroups 获取管理组列表
   * @apiName getAdminGroups
   * @apiDescription 获取管理组列表
   * @apiGroup AdminGroup
   * @apiVersion 1.0.0
   *
   * @apiUse STATUS
   * @apiSuccess {json} data
   * @apiSuccess {string} data.name 管理组名称
   * @apiSuccess {json} data._auth 管理组权限
   * 
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *    {
   *         "status": 200,
   *         "message": "操作成功",
   *         "data": [
   *             {
   *                 "_id": "5a6c63ad2a092f4e817dd9fb",
   *                 "name": "group1",
   *                 "_auth": {
   *                     {
   *                         "_id": "5a6c63ad2a092f4e817dd9fb",
   *                         "name": "文章列表",
   *                         "category": "文章"
   *                     }
   *                 }
   *             }
   *         ],
   *         "total": -1
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
   * @api {post} /admingroups 新增管理组
   * @apiName createAdminGroup
   * @apiDescription 新增管理组
   * @apiGroup AdminGroup
   * @apiVersion 1.0.0
   * 
   * @apiParam {string} groupname 管理组名称
   * @apiParam {string} auth 权限（json数组字符串）
   * @apiUse STATUS
   * @apiSuccess {json} data 
   * @apiSuccess {string} data.name 管理组名
   * @apiSuccess {string} data._auth 权限
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
   * @api {put} /admingroups/:id 修改指定管理组
   * @apiName updateAdminGroup
   * @apiDescription 修改指定管理组
   * @apiGroup AdminGroup
   * @apiVersion 1.0.0
   * 
   * @apiParam {string} :id 管理组id(如果不由path传递，则写在body中)
   * @apiParam {string} groupname 新的管理组名
   * @apiParam {string} auth 新的权限
   * @apiUse STATUS
   * @apiSuccess {json} data 
   * @apiSuccess {string} data.name 管理组名
   * @apiSuccess {string} data._auth 管理组权限
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
   * @api {delete} /admingroups/:id 删除指定管理组
   * @apiName deleteAdminGroup
   * @apiDescription 删除指定管理组
   * @apiGroup AdminGroup
   * @apiVersion 1.0.0
   * 
   * @apiParam {string} :id 管理组id 
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
  /**
   * @api {get} /adminauth 获取管理权限列表
   * @apiName getAdminAuth
   * @apiDescription 获取管理权限列表
   * @apiGroup AdminGroup
   * @apiVersion 1.0.0
   *
   * @apiUse STATUS
   * @apiSuccess {json} data
   * @apiSuccess {string} data.name 权限名称
   * @apiSuccess {string} data.category 权限分类名称
   */
  .get( (req, res) => {
    AdminAuthModel.AdminAuth.getAdminAuth()
      .then(data => {
        return re.r200(data, lang.OK, -1, res);
      }, err => {
        return re.r404(err, lang.NOT_FOUND, res);
      })
  });
  
module.exports = router;