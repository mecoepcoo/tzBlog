/* 友情链接接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const BlogrollModel = require('../../models/blogroll');

/**
 * @apiDefine Blogroll 友情链接
 */

/**
 * @apiDefine STATUS
 * @apiSuccess {string} message 文本信息
 */
router.route('/blogrolls')
  /**
   * @api {get} /blogrolls 获取友链列表
   * @apiName getBlogrolls
   * @apiDescription 获取友链列表
   * @apiGroup Blogroll
   * @apiVersion 1.0.0
   *
   * @apiUse STATUS
   * @apiSuccess {json} data
   * @apiSuccess {string} data.name 友链名称
   * @apiSuccess {string} data.url 链接
   * @apiSuccess {number} data.order 排序，数字越大则位序越前
   * @apiSuccess {number} total -1
   * 
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *     {
   *         "status": 200,
   *         "message": "操作成功",
   *         "data": [
   *             {
   *                 "_id": "5a708c1ef634623dc6d73770",
   *                 "name": "tianzhen",
   *                 "url": "http://www.tianzhen.tech",
   *                 "order": 2
   *             }
   *         ],
   *         "total": -1
   *     }
   */
  .get( (req, res) => {
    const blogrollQuery = BlogrollModel.Blogroll.find({}, '_id name url order')
      .sort({order: -1, _id: -1})
      .exec()
      .then(data => {
        return re.r200(data, lang.OK, -1, res);
      }, err => {
        return re.r404(err, lang.NOT_FOUND, res);
      })
  })

  /**
   * @api {post} /blogrolls 新增友链
   * @apiName createBlogroll
   * @apiDescription 新增友链
   * @apiGroup Blogroll
   * @apiVersion 1.0.0
   * 
   * @apiParam {string} name 友链名称
   * @apiParam {string} url 链接（包含协议）
   * @apiParam {number} order 排序，数字越大位序越前
   * @apiUse STATUS
   * @apiSuccess {json} data 插入成功的文档
   * @apiSuccess {string} data.name 友链名称
   * @apiSuccess {string} data.url 链接
   * @apiSuccess {number} data.order 排序
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *     {
   *         "status": 201,
   *         "message": "插入成功",
   *         "data": {
   *             "__v": 0,
   *             "name": "tianzhen",
   *             "url": "http://www.tianzhen.tech",
   *             "order": 2,
   *             "_id": "5a709b9e85631a519a57977a"
   *         }
   *     }
   */
  .post( (req, res) => {
    const name = req.body.name || '';
    const url = req.body.url || '';
    const order = +req.body.order || 1;
    // 参数校验
    try {
      if (!name.length) {
        throw new Error('请填写名称');
      }
      if (!url.length) {
        throw new Error('请填写链接地址');
      }
    } catch (e) {
      return re.r400(e, e.message, res);
    }

    const blogroll = new BlogrollModel.Blogroll({
      name: name,
      url: url,
      order: order
    });

    blogroll.save()
      .then(data => {
        return re.r201(data, lang.CREATE_OK, res);
      }, err => {
        return re.r400(err, lang.ERROR, res);
      })
  })

  /**
   * @api {delete} /blogrolls 批量删除友链
   * @apiName deleteBlogrolls
   * @apiDescription 批量删除友链
   * @apiGroup Blogroll
   * @apiVersion 1.0.0
   * 
   * @apiParam {array} ids 友链id数组
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
  .delete((req, res) => {
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

    const blogrollQuery = BlogrollModel.Blogroll.find().where({
      '_id': {
        '$in': ids
      }
    }).remove();
    blogrollQuery.then(data => {
      return re.r204([], lang.NO_CONTENT, res);
    }, err => {
      return re.r400(err, lang.ERROR, res);
    })
  })

router.route('/blogrolls/:id')
  /**
   * @api {put} /blogrolls/:id 修改指定友链
   * @apiName updateBlogroll
   * @apiDescription 修改指定友链
   * @apiGroup Blogroll
   * @apiVersion 1.0.0
   * 
   * @apiParam {string} :id 友链id(如果不由path传递，则写在body中)
   * @apiParam {string} name 新的友链名称
   * @apiParam {string} url 新的url
   * @apiParam {number} order 新的排序，默认为1
   * @apiUse STATUS
   * @apiSuccess {json} data 
   * @apiSuccess {string} data.name 友链名称
   * @apiSuccess {string} url url
   * @apiSuccess {string} order 排序
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *     {
   *         "status": 201,
   *         "message": "更新成功",
   *         "data": {
   *             "_id": "5a709b9e85631a519a57977a",
   *             "name": "tianzhen",
   *             "url": "http://www.tianzhen.tech",
   *             "order": 3,
   *             "__v": 0
   *         }
   *     }
   */
  .put( (req, res) => {
    let id = req.params.id || req.body.id || '';
    id = id.replace(/\$/g, '');
    const name = req.body.name || '';
    const url = req.body.url || '';
    const order = +req.body.order || 1;
    // 参数校验
    try {
      if (!id.length) {
        throw new Error('缺少id参数');
      }
      if (!name.length) {
        throw new Error('请填写名称');
      }
      if (!url.length) {
        throw new Error('请填写链接地址');
      }
    } catch (e) {
      return re.r400(e, e.message, res);
    }

    const blogrollQuery = BlogrollModel.Blogroll.findOne().where({'_id': id}).exec()
      .then(blogroll => {
        if (blogroll) {
          blogroll.name = name;
          blogroll.url = url;
          blogroll.order = order;
          return blogroll.save();
        } else {
          return re.r404({}, lang.NOT_FOUND, res);
        }
      }, err => {
        return re.r400(err, lang.ERROR, res);
      })
      .then(data => {
        return re.r201(data, lang.UPDATE_OK, res);
      }, err => {
        return re.r400(err, lang.ERROR, res);
      })
  })

  /**
   * @api {delete} /blogrolls/:id 删除指定友链
   * @apiName deleteBlogroll
   * @apiDescription 删除指定友链
   * @apiGroup Blogroll
   * @apiVersion 1.0.0
   * 
   * @apiParam {string} :id 友链id 
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
    const blogrollQuery = BlogrollModel.Blogroll.findOne().where({ '_id': id }).remove()
      .then(data => {
        return re.r204([], lang.NO_CONTENT, res);
      }, err => {
        return re.r400(err, lang.ERROR, res);
      })
  });

module.exports = router;