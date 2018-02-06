/* 分类接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const CategoryModel = require('../../models/category');

router.route('/categories')
  .get( (req, res) => {

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
  .delete( (req, res) => {

  });

router.route('/categories/:id')
  .put( (req, res) => {
    const id = req.params.id || req.body.id || '';
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

  });

module.exports = router;