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
  })


  .delete( (req, res) => {

  })

router.route('/posts/:id')
  .put((req, res) => {

  })


  .delete( (req, res) => {

  })

module.exports = router;