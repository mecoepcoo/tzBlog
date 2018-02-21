/* 分类接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const CategoryModel = require('../../models/category');
const PostModel = require('../../models/post');

/**
 * @apiDefine CategoryHome 分类（客户端）
 */

/**
 * @apiDefine STATUS
 * @apiSuccess {string} message 文本信息
 */

router.route('/categories')
  /**
   * @api {get} /categories 获取分类列表
   * @apiName getCategoriesHome
   * @apiDescription 获取分类列表和分类对应的文章数量（客户端用），不会返回文章数量为0的分类
   * @apiGroup CategoryHome
   * @apiVersion 1.0.0
   *
   * @apiUse STATUS
   * @apiSuccess {json} data
   * @apiSuccess {string} data.category 分类名称
   * @apiSuccess {string} data.count 分类对应的文章数量
   * @apiSuccess {number} total 固定值-1，表示不分页
   * 
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *     {
   *         "status": 200,
   *         "message": "操作成功",
   *         "data": [
   *             {
   *                 "_id": "5a7b2bcb31ac4d5e1d55b0d1",
   *                 "category": "js",
   *                 "count": 2
   *             },
   *             {
   *                 "_id": "5a885bc1baa0c9183fe67796",
   *                 "category": "node",
   *                 "count": 5
   *             }
   *         ],
   *         "total": -1
   *     }
   */
  .get( (req, res) => {
    const countQuery = PostModel.Post
      .aggregate()
      .group({
        _id: '$_category',
        count: {
          $sum: 1
        }
      })
      .lookup({
        from: 'b_category',
        localField: '_id',
        foreignField: '_id',
        as: 'category'
      })
      .project({
        _id: 0
      })
      .then(categories => {
        const data = [];
        _.forEach(categories, category => {
          data.push({
            _id: _.get(category, ['category', '0', '_id']),
            category: _.get(category, ['category', '0', 'name']),
            count: category.count
          })
        })
        return re.r200(data, lang.OK, -1, res);
      }, err => {
      return re.r404(err, lang.NOT_FOUND, res);
    })
  });

module.exports = router;