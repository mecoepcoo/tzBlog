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