define({
  "name": "tzBlog",
  "version": "1.0.0",
  "description": "tzBlog的接口文档",
  "title": "tzBlog接口文档",
  "url": "http://localhost:3000",
  "header": {
    "title": "使用指南",
    "content": "<p>nodejs + express + mongodb + ngular4 + ng-zorro制作的个人博客项目。</p>\n<ul>\n<li>前台地址：<a href=\"http://www.tianzhen.tech\">http://www.tianzhen.tech</a></li>\n<li>后台地址：<a href=\"http://www.tianzhen.tech/admin\">http://www.tianzhen.tech/admin</a></li>\n</ul>\n<p>测试账号：</p>\n<ul>\n<li>用户名：guest</li>\n<li>密码：guest</li>\n</ul>\n<hr>\n<h2>托管仓库</h2>\n<ul>\n<li>github：<a href=\"https://github.com/mecoepcoo/tzBlog\">https://github.com/mecoepcoo/tzBlog</a></li>\n</ul>\n<h2>指令</h2>\n<p>运行后端：</p>\n<pre><code>$ sudo npm install\n$ sudo npm start\n</code></pre>\n<p>运行前端：</p>\n<p>生成文档：</p>\n<pre><code>$ sudo npm run builddoc</code></pre>\n"
  },
  "footer": {
    "title": "其他",
    "content": "<h2>许可证</h2>\n<p>Copyright (c) 2018 tianzhen - MIT License</p>\n"
  },
  "order": [
    "Post",
    "getPosts",
    "getPost",
    "createPost",
    "updatePost",
    "deletePost",
    "Category",
    "getCategories",
    "createCategory",
    "updateCategory",
    "deleteCategory",
    "Tag",
    "getTags",
    "createTag",
    "updateTag",
    "deleteTag",
    "Admin",
    "getAdmins",
    "createAdmin",
    "updateAdmin",
    "deleteAdmin",
    "deleteAdmins",
    "Blogroll",
    "getBlogrolls",
    "createBlogroll",
    "updateBlogroll",
    "deleteBlogroll",
    "deleteBlogrolls"
  ],
  "sampleUrl": false,
  "defaultVersion": "0.0.0",
  "apidoc": "0.3.0",
  "generator": {
    "name": "apidoc",
    "time": "2018-02-17T17:21:10.444Z",
    "url": "http://apidocjs.com",
    "version": "0.17.6"
  }
});
