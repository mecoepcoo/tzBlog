/* 友情链接接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const PostModel = require('../../models/post');
const CategoryModel = require('../../models/category');
const TagModel = require('../../models/tag');

router.route('/others')
  .get( (req, res) => {
    const postQuery = PostModel.Post.find().count();
    const categoryQuery = CategoryModel.Category.find().count();
    const tagQuery = TagModel.Tag.find().count();
    Promise.all([postQuery, categoryQuery, tagQuery])
      .then( (data) => {
        const [ post, category, tag ] = data;
        const datas = {
          count: {
            post: post,
            category: category,
            tag: tag,
          }
        };
        return re.r200(datas, lang.OK, -1, res);
      })
  })

module.exports = router;