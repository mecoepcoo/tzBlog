/* 标签接口 */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const re = require('../../lib/response');
const lang = require('../../config/lang');
const TagModel = require('../../models/tag');
const PostModel = require('../../models/post');

router.route('/tags')
  .get( (req, res) => {

  })
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
  })

router.route('/tags/:id')
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

    const postQuery = PostModel.Post.find().populate('_tag')
      .then(data => {
        return re.r200(data, '', 0, res);
      }, err => {
        return re.r400(err, 'e', res);
      })
    
  });

module.exports = router;