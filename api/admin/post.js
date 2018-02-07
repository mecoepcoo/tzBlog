/* 文章接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const TagModel = require('../../models/tag');
const CategoryModel = require('../../models/category');
const PostModel = require('../../models/post');

router.route('/posts')
  .get( (req, res) => {

  })
  

  .post( (req, res) => {
    const title = req.body.title || '';
    const author = req.body.author || '';
    const categoryId = req.body.categoryId || '';
    const tagIds = req.body.tagIds;
    const order = +req.body.order;
    const date = +req.body.date;
    const content = req.body.content || '';

    try {
      if (!title.length) {
        throw new Error('请输入标题');
      }
      if (!author.length) {
        throw new Error('请输入作者');
      }
      if (!categoryId) {
        throw new Error('缺少分类id');
      }
      if (!JSON.parse(tagIds)) {
        throw new Error('标签格式不正确');
      }
      if (!content.length) {
        throw new Error('请填写文章正文');
      }
    } catch (e) {
      return re.r400(e, e.message, res);
    }

    const postData = {
      title: title,
      author: author,
      _category: categoryId,
      _tags: tagIds,
      content: content
    }

    if (order && !_.isNaN(order)) {
      _.assign(postData, { order: order });
    }

    if (date && !_.isNaN(date)) {
      _.assign(postData, { date: date });
    }
    return re.r200(postData, '', 0, res);

    const post = new PostModel.Post(postData);
  })


  .delete( (req, res) => {

  })

router.route('/posts/:id')
  .put((req, res) => {

  })


  .delete( (req, res) => {

  })

module.exports = router;