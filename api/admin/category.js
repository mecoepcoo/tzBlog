/* 分类接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const CategoryModel = require('../../models/category');
const PostModel = require('../../models/post');

/**
 * @apiDefine Category 分类
 */

/**
 * @apiDefine STATUS
 * @apiSuccess {string} message 文本信息
 */

router.route('/categories')
  /**
   * @api {get} /categories 获取分类列表
   * @apiName getCategories
   * @apiDescription 获取分类列表
   * @apiGroup Category
   * @apiVersion 1.0.0
   *
   * @apiUse STATUS
   * @apiSuccess {json} data
   * @apiSuccess {string} data.name 分类名称
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
    const categoryQuery = CategoryModel.Category.find()
      .sort({ _id: -1 })
      .exec()
      .then(data => {
        return re.r200(data, lang.OK, -1, res);
      }, err => {
        return re.r404(err, lang.NOT_FOUND, res);
      })
  })

  /**
   * @api {post} /categories 新增分类
   * @apiName createCategory
   * @apiDescription 新增分类
   * @apiGroup Category
   * @apiVersion 1.0.0
   * 
   * @apiParam {string} name 分类名称
   * @apiUse STATUS
   * @apiSuccess {json} data 新增的分类
   * @apiSuccessExample {json} Success - Example:
   *     HTTP / 1.1 200 OK
   *     {
   *         "status": 201,
   *         "message": "插入成功",
   *         "data": {
   *             "__v": 0,
   *             "name": "操作系统",
   *             "_id": "5a885bd0baa0c9183fe67799"
   *         }
   *     }
   */
  .post( (req, res) => {
    const name = req.body.name || '';

    try {
      if (!name.length) {
        throw new Error('请输入分类名称');
      }
    } catch (e) {
      return re.r400(e, e.message, res);
    }

    const category = new CategoryModel.Category({
      name: name,
    });

    category.save()
      .then(data => {
        return re.r201(data, lang.CREATE_OK, res);
      }, err => {
        return re.r400(err, lang.DUPLICATE, res);
      })
  })

router.route('/categories/:id')
  /**
   * @api {put} /categories/:id 修改分类
   * @apiName updateCategory
   * @apiDescription 修改分类
   * @apiGroup Category
   * @apiVersion 1.0.0
   * 
   * @apiParam {string} :id id
   * @apiParam {string} name 分类名称
   * @apiUse STATUS
   * @apiSuccess {json} data 更新的分类
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
        throw new Error('请输入分类名称');
      }
    } catch (e) {
      return re.r400(e, e.message, res);
    }

    const categoryQuery = CategoryModel.Category.findOne().where({'_id': id}).exec()
      .then(category => {
        if (category) {
          category.name = name;
          return category.save();
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
   * @api {delete} /categories/:id 删除指定分类
   * @apiName deleteCategory
   * @apiDescription 删除指定分类，该分类下没有文章时方可删除
   * @apiGroup Category
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

    const postQuery = PostModel.Post.findOne().where({ _category: id }).populate('_category')
      .then(data => {
        if (data) {
          return re.r400(data, '此分类下有文章，无法删除', res);
        } else {
          CategoryModel.Category.findOne().where({ _id: id }).remove()
            .then(data => {
              return re.r204([], lang.NO_CONTENT, res);
            }, err => {
              return re.r400(err, lang.ERROR, res);
            })
        }
      }, err => {
        return re.r400(err, lang.ERROR, res);
      })
  });

module.exports = router;