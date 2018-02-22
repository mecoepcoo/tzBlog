/* 友情链接接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const BlogrollModel = require('../../models/blogroll');

/**
 * @apiDefine BlogrollHome 友情链接（客户端）
 */

/**
 * @apiDefine STATUS
 * @apiSuccess {string} message 文本信息
 */
router.route('/blogrolls')
  /**
   * @api {get} /blogrolls 获取友链列表
   * @apiName getBlogrollsHome
   * @apiDescription 获取友链列表
   * @apiGroup BlogrollHome
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

module.exports = router;