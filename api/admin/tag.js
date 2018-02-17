/* 标签接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const TagModel = require('../../models/tag');
const PostModel = require('../../models/post');

/**
 * @apiDefine Tag 标签
 */

/**
 * @apiDefine STATUS
 * @apiSuccess {string} message 文本信息
 */

router.route('/tags')
  /**
   * @api {get} /tags 获取标签列表
   * @apiName getTags
   * @apiDescription 获取标签列表
   * @apiGroup Tag
   * @apiVersion 1.0.0
   *
   * @apiUse STATUS
   * @apiSuccess {json} data
   * @apiSuccess {string} data.name 标签名称
   * @apiSuccess {number} total 固定值-1，表示不分页
   * 
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *     {
   *         "status": 200,
   *         "message": "操作成功",
   *         "data": [
   *             {
   *                 "_id": "5a7b2bcd31ac4d5e1d55b0d2",
   *                 "name": "Node.js",
   *                 "__v": 0
   *             },
   *             {
   *                 "_id": "5a7b2bcb31ac4d5e1d55b0d1",
   *                 "name": "Javascript",
   *                 "__v": 0
   *             }
   *         ],
   *         "total": -1
   *     }
   */
  .get( (req, res) => {
    const tagsQuery = TagModel.Tag.find()
      .sort({ _id: -1 })
      .exec()
      .then(data => {
        return re.r200(data, lang.OK, -1, res);
      }, err => {
        return re.r404(err, lang.NOT_FOUND, res);
      })
  })

  /**
   * @api {post} /tags 新增标签
   * @apiName createTag
   * @apiDescription 新增标签
   * @apiGroup Tag
   * @apiVersion 1.0.0
   * 
   * @apiParam {string} name 标签名称
   * @apiUse STATUS
   * @apiSuccess {json} data 新增的标签
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *     {
   *         "status": 201,
   *         "message": "插入成功",
   *         "data": {
   *             "__v": 0,
   *             "name": "js",
   *             "_id": "5a885bd0baa0c9183fe67799"
   *         }
   *     }
   */
  .post( (req, res) => {
    const name = req.body.name || '';

    try {
      if (!name.length) {
        throw new Error('请输入标签名称');
      }
    } catch (e) {
      return re.r400(e, e.message, res);
    }

    const tag = new TagModel.Tag({
      name: name,
    });

    tag.save()
      .then(data => {
        return re.r201(data, lang.CREATE_OK, res);
      }, err => {
        return re.r400(err, lang.DUPLICATE, res);
      })
  });

router.route('/tags/:id')
  /**
   * @api {put} /tags/:id 修改标签
   * @apiName updateTag
   * @apiDescription 修改标签
   * @apiGroup Tag
   * @apiVersion 1.0.0
   * 
   * @apiParam {string} :id id
   * @apiParam {string} name 标签名称
   * @apiUse STATUS
   * @apiSuccess {json} data 更新的标签
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *     {
   *         "status": 201,
   *         "message": "更新成功",
   *         "data": {
   *             "__v": 0,
   *             "name": "操作系统",
   *             "_id": "5a885bd0baa0c9183fe67799"
   *         }
   *     }
   */
  .put( (req, res) => {
    let id = req.params.id || req.body.id || '';
    id = id.replace(/\$/g, '');
    const name = req.body.name || '';

    try {
      if (!id.length) {
        throw new Error('缺少id参数');
      }
      if (!name.length) {
        throw new Error('请输入标签名称');
      }
    } catch (e) {
      return re.r400(e, e.message, res);
    }

    const tagQuery = TagModel.Tag.findOne().where({'_id': id}).exec()
      .then(tag => {
        if (tag) {
          tag.name = name;
          return tag.save();
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
   * @api {delete} /tags/:id 删除指定标签
   * @apiName deleteTag
   * @apiDescription 删除指定标签，该标签下没有文章时方可删除
   * @apiGroup Tag
   * @apiVersion 1.0.0
   * 
   * @apiParam {string} :id id
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

    const postQuery = PostModel.Post.aggregate({
      $project: {
        _tags: 1
      }
    })
    .then(postDatas => {
      for (let postData of postDatas) {
        for (let tag of postData._tags) {
          if (tag == id) {
            return re.r400(postData, '此标签下有文章，无法删除', res);
          }
        }
      }
      return TagModel.Tag.findOne().where({ _id: id }).remove();
    }, err => {
      return re.r400(err, lang.ERROR, res);
    })
    .then(data => {
      return re.r204([], lang.NO_CONTENT, res);
    }, err => {
      return re.r400(err, lang.ERROR, res);
    })
  });

module.exports = router;