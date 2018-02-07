/* 文章接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
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
      _tags: JSON.parse(tagIds),
      content: content
    }

    if (order && !_.isNaN(order)) {
      _.assign(postData, { order: order });
    }

    if (date && !_.isNaN(date)) {
      _.assign(postData, { date: date });
    }

    const post = new PostModel.Post(postData);
    post.save()
      .then(data => {
        return re.r201(data, lang.CREATE_OK, res);
      }, err => {
        return re.r400(err, lang.ERROR, res);
      })
  })


  .delete( (req, res) => {

  })

router.route('/posts/:id')
  .put((req, res) => {
    let id = req.params.id || req.body.id || '';
    id = id.replace(/\$/g, '');
    const title = req.body.title || '';
    const author = req.body.author || '';
    const categoryId = req.body.categoryId || '';
    const tagIds = req.body.tagIds;
    const order = +req.body.order;
    const date = +req.body.date;
    const content = req.body.content || '';

    try {
      if (!id.length) {
        throw new Error('缺少id参数');
      }
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
      _tags: JSON.parse(tagIds),
      content: content
    }

    if (order && !_.isNaN(order)) {
      _.assign(postData, { order: order });
    }

    if (date && !_.isNaN(date)) {
      _.assign(postData, { date: date });
    }

    const postQuery = PostModel.Post.findOne().where({ '_id': id }).exec()
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

  })

module.exports = router;