/* 分类接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const CategoryModel = require('../../models/category');
const PostModel = require('../../models/post');

router.route('/categories')
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