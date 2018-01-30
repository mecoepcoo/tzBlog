define({
  "name": "tzBlog",
  "version": "1.0.0",
  "description": "tzBlog的接口文档",
  "title": "tzBlog接口文档",
  "url": "http://localhost:3000",
  "header": {
    "title": "使用指南",
    "content": "<p>nodejs + express + mongodb + ngular4 + ng-zorro制作的个人博客项目。</p>\n<ul>\n<li>前台地址：<a href=\"http://www.tianzhen.tech\">http://www.tianzhen.tech</a></li>\n<li>后台地址：<a href=\"http://www.tianzhen.tech/admin\">http://www.tianzhen.tech/admin</a></li>\n</ul>\n<p>测试账号：</p>\n<ul>\n<li>用户名：guest</li>\n<li>密码：guest</li>\n</ul>\n<hr>\n<h1>托管仓库</h1>\n<ul>\n<li>github：<a href=\"https://github.com/mecoepcoo/tzBlog\">https://github.com/mecoepcoo/tzBlog</a></li>\n</ul>\n<h1>指令</h1>\n<p>运行后端：</p>\n<pre><code>$ sudo npm install\n$ sudo npm start\n</code></pre>\n<p>运行前端：</p>\n<p>生成文档：</p>\n<pre><code>$ sudo npm run builddoc</code></pre>\n"
  },
  "footer": {
    "title": "其他",
    "content": "<p>Copyright (c) 2018 tianzhen - MIT License</p>\n"
  },
  "order": [
    "getAdmins",
    "createAdmin",
    "updateAdmin",
    "deleteAdmin",
    "deleteAdmins",
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
    "time": "2018-01-30T16:52:59.705Z",
    "url": "http://apidocjs.com",
    "version": "0.17.6"
  }
});
