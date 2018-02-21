/* 标签接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const TagModel = require('../../models/tag');
const PostModel = require('../../models/post');

/**
 * @apiDefine TagHome 标签（客户端）
 */

/**
 * @apiDefine STATUS
 * @apiSuccess {string} message 文本信息
 */

router.route('/tags')
    /**
   * @api {get} /tags 获取标签列表
   * @apiName getTagsHome
   * @apiDescription 获取标签列表和标签对应的文章数量（客户端用），不会返回文章数量为0的标签
   * @apiGroup TagHome
   * @apiVersion 1.0.0
   *
   * @apiUse STATUS
   * @apiSuccess {json} data
   * @apiSuccess {string} data.tag 标签名称
   * @apiSuccess {number} data.count 标签对应的文章数量
   * @apiSuccess {number} total 固定值-1，表示不分页
   * 
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *     {
   *         "status": 200,
   *         "message": "操作成功",
   *         "data": [
   *             {
   *                 "_id": "5a7b12ff9716f6209e98f3f1",
   *                 "tag": "js",
   *                 "count": 5
   *             },
   *             {
   *                 "_id": "5a8c5494c1a7b22bfa119067",
   *                 "tag": "c++",
   *                 "count": 1
   *             },
   *             {
   *                 "_id": "5a7b12fa9716f6209e98f3ef",
   *                 "tag": "node",
   *                 "count": 2
   *             }
   *         ],
   *         "total": -1
   *     }
   */
  .get( (req, res) => {
    const countQuery = PostModel.Post
      .aggregate()
      .unwind('_tags')
      .group({
        _id: '$_tags',
        count: {
          $sum: 1
        }
      })
      .lookup({
        from: 'b_tag',
        localField: '_id',
        foreignField: '_id',
        as: 'tags'
      })
      .project({
        _id: 0
      })
      .then(tags => {
        const data = [];
        _.forEach(tags, tag => {
          data.push({
            _id: _.get(tag, ['tags', '0', '_id']),
            tag: _.get(tag, ['tags', '0', 'name']),
            count: tag.count
          })
        })
        return re.r200(data, lang.OK, -1, res);
      }, err => {
        return re.r404(err, lang.NOT_FOUND, res);
      })
  });

module.exports = router;