define({ "api": [
  {
    "type": "post",
    "url": "/adminusers",
    "title": "新增管理员",
    "name": "createAdmin",
    "description": "<p>新增管理员</p>",
    "group": "AdminUser",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "adminName",
            "description": "<p>管理员用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.name",
            "description": "<p>管理员名</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "data.createDate",
            "description": "<p>创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.isBan",
            "description": "<p>管理员是否禁用 true: 禁用，false: 启用</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n  \"status\": 201,\n  \"message\": \"插入成功\",\n  \"data\": {\n    \"__v\": 0,\n    \"name\": \"admin\",\n    \"createDate\": 1517052248305,\n    \"isBan\": false,\n    \"_id\": \"5a6c61582a092f4e817dd9f7\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/admin-user.js",
    "groupTitle": "管理员"
  },
  {
    "type": "delete",
    "url": "/adminusers/:id",
    "title": "删除指定管理员",
    "name": "deleteAdmin",
    "description": "<p>删除指定管理员</p>",
    "group": "AdminUser",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>管理员id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 204,\n    \"message\": \"删除成功\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/admin-user.js",
    "groupTitle": "管理员"
  },
  {
    "type": "delete",
    "url": "/adminusers",
    "title": "批量删除管理员",
    "name": "deleteAdmins",
    "description": "<p>批量删除管理员</p>",
    "group": "AdminUser",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "ids",
            "description": "<p>管理员id数组</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 204,\n    \"message\": \"删除成功\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/admin-user.js",
    "groupTitle": "管理员"
  },
  {
    "type": "get",
    "url": "/adminusers",
    "title": "获取管理员列表",
    "name": "getAdmins",
    "description": "<p>获取管理员列表</p>",
    "group": "AdminUser",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "pagesize",
            "defaultValue": "10",
            "description": "<p>每页条数</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.name",
            "description": "<p>管理员用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "data.createDate",
            "description": "<p>管理员创建时间</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "total",
            "description": "<p>总条数</p>"
          },
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "isBan",
            "description": "<p>是否被禁用, false: 启用，true: 禁用</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": " HTTP / 1.1 200 OK\n{\n     \"status\": 200,\n     \"message\": \"操作成功\",\n     \"data\": [\n         {\n             \"_id\": \"5a6c63ad2a092f4e817dd9fb\",\n             \"name\": \"admin2\",\n             \"createDate\": 1517052845840,\n             \"isBan\": false\n         },\n         {\n             \"_id\": \"5a6c63a92a092f4e817dd9fa\",\n             \"name\": \"admin\",\n             \"createDate\": 1517052841933,\n             \"isBan\": false\n         }\n     ],\n     \"total\": 2\n }",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/admin-user.js",
    "groupTitle": "管理员"
  },
  {
    "type": "put",
    "url": "/adminusers/:id",
    "title": "修改指定管理员",
    "name": "updateAdmin",
    "description": "<p>修改指定管理员</p>",
    "group": "AdminUser",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>管理员id(如果不由path传递，则写在body中)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "adminName",
            "description": "<p>新的管理员名</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>新的密码</p>"
          },
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "isBan",
            "description": "<p>是否禁用 true: 禁用，false: 启用</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.name",
            "description": "<p>管理员名</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.isBan",
            "description": "<p>管理员是否禁用 true: 禁用，false: 启用</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n  \"status\": 201,\n  \"message\": \"更新成功\",\n  \"data\": {\n    \"__v\": 0,\n    \"name\": \"admin\",\n    \"createDate\": 1517052248305,\n    \"isBan\": false,\n    \"_id\": \"5a6c61582a092f4e817dd9f7\"\n   }\n }",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/admin-user.js",
    "groupTitle": "管理员"
  },
  {
    "type": "get",
    "url": "/blogrolls",
    "title": "获取友链列表",
    "name": "getBlogrollsHome",
    "description": "<p>获取友链列表</p>",
    "group": "BlogrollHome",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.name",
            "description": "<p>友链名称</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.url",
            "description": "<p>链接</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "data.order",
            "description": "<p>排序，数字越大则位序越前</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "total",
            "description": "<p>-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"操作成功\",\n    \"data\": [\n        {\n            \"_id\": \"5a708c1ef634623dc6d73770\",\n            \"name\": \"tianzhen\",\n            \"url\": \"http://www.tianzhen.tech\",\n            \"order\": 2\n        }\n    ],\n    \"total\": -1\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/home/blogroll.js",
    "groupTitle": "友情链接（客户端）"
  },
  {
    "type": "post",
    "url": "/blogrolls",
    "title": "新增友链",
    "name": "createBlogroll",
    "description": "<p>新增友链</p>",
    "group": "Blogroll",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>友链名称</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "url",
            "description": "<p>链接（包含协议）</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "order",
            "description": "<p>排序，数字越大位序越前</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>插入成功的文档</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.name",
            "description": "<p>友链名称</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.url",
            "description": "<p>链接</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "data.order",
            "description": "<p>排序</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 201,\n    \"message\": \"插入成功\",\n    \"data\": {\n        \"__v\": 0,\n        \"name\": \"tianzhen\",\n        \"url\": \"http://www.tianzhen.tech\",\n        \"order\": 2,\n        \"_id\": \"5a709b9e85631a519a57977a\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/blogroll.js",
    "groupTitle": "友情链接"
  },
  {
    "type": "delete",
    "url": "/blogrolls/:id",
    "title": "删除指定友链",
    "name": "deleteBlogroll",
    "description": "<p>删除指定友链</p>",
    "group": "Blogroll",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>友链id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 204,\n    \"message\": \"删除成功\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/blogroll.js",
    "groupTitle": "友情链接"
  },
  {
    "type": "delete",
    "url": "/blogrolls",
    "title": "批量删除友链",
    "name": "deleteBlogrolls",
    "description": "<p>批量删除友链</p>",
    "group": "Blogroll",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "ids",
            "description": "<p>友链id数组</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 204,\n    \"message\": \"删除成功\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/blogroll.js",
    "groupTitle": "友情链接"
  },
  {
    "type": "get",
    "url": "/blogrolls",
    "title": "获取友链列表",
    "name": "getBlogrolls",
    "description": "<p>获取友链列表</p>",
    "group": "Blogroll",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.name",
            "description": "<p>友链名称</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.url",
            "description": "<p>链接</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "data.order",
            "description": "<p>排序，数字越大则位序越前</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "total",
            "description": "<p>-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"操作成功\",\n    \"data\": [\n        {\n            \"_id\": \"5a708c1ef634623dc6d73770\",\n            \"name\": \"tianzhen\",\n            \"url\": \"http://www.tianzhen.tech\",\n            \"order\": 2\n        }\n    ],\n    \"total\": -1\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/blogroll.js",
    "groupTitle": "友情链接"
  },
  {
    "type": "put",
    "url": "/blogrolls/:id",
    "title": "修改指定友链",
    "name": "updateBlogroll",
    "description": "<p>修改指定友链</p>",
    "group": "Blogroll",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>友链id(如果不由path传递，则写在body中)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>新的友链名称</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "url",
            "description": "<p>新的url</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "order",
            "description": "<p>新的排序，默认为1</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.name",
            "description": "<p>友链名称</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "url",
            "description": "<p>url</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "order",
            "description": "<p>排序</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 201,\n    \"message\": \"更新成功\",\n    \"data\": {\n        \"_id\": \"5a709b9e85631a519a57977a\",\n        \"name\": \"tianzhen\",\n        \"url\": \"http://www.tianzhen.tech\",\n        \"order\": 3,\n        \"__v\": 0\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/blogroll.js",
    "groupTitle": "友情链接"
  },
  {
    "type": "get",
    "url": "/categories",
    "title": "获取分类列表",
    "name": "getCategoriesHome",
    "description": "<p>获取分类列表和分类对应的文章数量（客户端用），不会返回文章数量为0的分类</p>",
    "group": "CategoryHome",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.category",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.count",
            "description": "<p>分类对应的文章数量</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "total",
            "description": "<p>固定值-1，表示不分页</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"操作成功\",\n    \"data\": [\n        {\n            \"_id\": \"5a7b2bcb31ac4d5e1d55b0d1\",\n            \"category\": \"js\",\n            \"count\": 2\n        },\n        {\n            \"_id\": \"5a885bc1baa0c9183fe67796\",\n            \"category\": \"node\",\n            \"count\": 5\n        }\n    ],\n    \"total\": -1\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/home/category.js",
    "groupTitle": "分类（客户端）"
  },
  {
    "type": "post",
    "url": "/categories",
    "title": "新增分类",
    "name": "createCategory",
    "description": "<p>新增分类</p>",
    "group": "Category",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>分类名称</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>新增的分类</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 201,\n    \"message\": \"插入成功\",\n    \"data\": {\n        \"__v\": 0,\n        \"name\": \"操作系统\",\n        \"_id\": \"5a885bd0baa0c9183fe67799\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/category.js",
    "groupTitle": "分类"
  },
  {
    "type": "delete",
    "url": "/categories/:id",
    "title": "删除指定分类",
    "name": "deleteCategory",
    "description": "<p>删除指定分类，该分类下没有文章时方可删除</p>",
    "group": "Category",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 204,\n    \"message\": \"删除成功\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/category.js",
    "groupTitle": "分类"
  },
  {
    "type": "get",
    "url": "/categories",
    "title": "获取分类列表",
    "name": "getCategories",
    "description": "<p>获取分类列表</p>",
    "group": "Category",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.name",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "total",
            "description": "<p>固定值-1，表示不分页</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"操作成功\",\n    \"data\": [\n        {\n            \"_id\": \"5a7b2bcd31ac4d5e1d55b0d2\",\n            \"name\": \"Node.js\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5a7b2bcb31ac4d5e1d55b0d1\",\n            \"name\": \"Javascript\",\n            \"__v\": 0\n        }\n    ],\n    \"total\": -1\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/category.js",
    "groupTitle": "分类"
  },
  {
    "type": "put",
    "url": "/categories/:id",
    "title": "修改分类",
    "name": "updateCategory",
    "description": "<p>修改分类</p>",
    "group": "Category",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>分类名称</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>更新的分类</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 201,\n    \"message\": \"更新成功\",\n    \"data\": {\n        \"__v\": 0,\n        \"name\": \"操作系统\",\n        \"_id\": \"5a885bd0baa0c9183fe67799\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/category.js",
    "groupTitle": "分类"
  },
  {
    "type": "get",
    "url": "/captcha",
    "title": "获取验证码",
    "name": "getCaptcha",
    "description": "<p>获取验证码接口，客户端需要支持cookie</p>",
    "group": "GroupUser",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data",
            "description": "<p>svg字符串</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 200,\n  \"message\": \"操作成功\",\n  \"data\": \"<svg>...</svg>\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/login.js",
    "groupTitle": "GroupUser"
  },
  {
    "type": "get",
    "url": "/user/logout",
    "title": "退出登录",
    "name": "logout",
    "description": "<p>退出登录接口，请求成功后清空登录session和cookie信息</p>",
    "group": "GroupUser",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Example:",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 1,\n  \"message\": \"操作成功\",\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      }
    },
    "filename": "api/admin/login.js",
    "groupTitle": "GroupUser"
  },
  {
    "type": "get",
    "url": "/posts",
    "title": "获取文章列表（分页）",
    "name": "getPostsHome",
    "description": "<p>获取文章列表</p>",
    "group": "PostHome",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "pagesize",
            "defaultValue": "10",
            "description": "<p>每页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "categoryid",
            "description": "<p>分类id，根据分类筛选，不能与标签筛选同时使用</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tagid",
            "description": "<p>标签id，根据标签筛选，不能与分类筛选同时使用</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.title",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.author",
            "description": "<p>作者</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "data._category",
            "description": "<p>分类</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data._category.name",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.content",
            "description": "<p>正文</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "data.reading",
            "description": "<p>阅读量</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "data.date",
            "description": "<p>时间戳</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "data.order",
            "description": "<p>排序，数字越大越靠前</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "data._tags",
            "description": "<p>分类</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data._tags.name",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "total",
            "description": "<p>总条数</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"操作成功\",\n    \"data\": [\n        {\n            \"_id\": \"5a7b18c9b6d4de46cf028efd\",\n            \"title\": \"t2\",\n            \"author\": \"t\",\n            \"_category\": 5a7b18c9b6d4de46cf028efe,\n            \"content\": \"313\",\n            \"__v\": 0,\n            \"reading\": 0,\n            \"date\": 1518016633349,\n            \"order\": 3,\n            \"_tags\": [\n                {\n                    \"_id\": \"5a7b12ff9716f6209e98f3f1\",\n                    \"name\": \"t5\",\n                    \"__v\": 0\n                }\n            ]\n        }\n    ],\n    \"total\": 7\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/home/post.js",
    "groupTitle": "文章"
  },
  {
    "type": "post",
    "url": "/posts",
    "title": "新增文章",
    "name": "createPost",
    "description": "<p>新增文章</p>",
    "group": "Post",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "author",
            "description": "<p>作者</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "categoryId",
            "description": "<p>分类id</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "tagIds",
            "description": "<p>标签id（json数组字符串）</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "order",
            "description": "<p>排序</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "date",
            "description": "<p>时间戳</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>正文</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>新增的文章</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 201,\n    \"message\": \"插入成功\",\n    \"data\": {\n        \"__v\": 0,\n        \"title\": \"标题\",\n        \"author\": \"作者\",\n        \"_category\": \"5a7b0c259716f6209e98f3ed\",\n        \"content\": \"正文\",\n        \"_id\": \"5a88595dbaa0c9183fe67795\",\n        \"reading\": 0,\n        \"date\": 312321,\n        \"order\": 1,\n        \"_tags\": [\n            \"5a7b12ff9716f6209e98f3f1\"\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/post.js",
    "groupTitle": "文章"
  },
  {
    "type": "delete",
    "url": "/posts/:id",
    "title": "删除指定文章",
    "name": "deletePost",
    "description": "<p>删除指定文章</p>",
    "group": "Post",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>文章id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 204,\n    \"message\": \"删除成功\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/post.js",
    "groupTitle": "文章"
  },
  {
    "type": "get",
    "url": "/posts/:id",
    "title": "获取指定文章",
    "name": "getPost",
    "description": "<p>获取一篇文章</p>",
    "group": "Post",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.title",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.author",
            "description": "<p>作者</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "data._category",
            "description": "<p>分类</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data._category.name",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.content",
            "description": "<p>正文</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "data.reading",
            "description": "<p>阅读量</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "data.date",
            "description": "<p>时间戳</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "data.order",
            "description": "<p>排序，数字越大越靠前</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "data._tags",
            "description": "<p>分类</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data._tags.name",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "total",
            "description": "<p>-1</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"操作成功\",\n    \"data\": \n        {\n            \"_id\": \"5a7b18c9b6d4de46cf028efd\",\n            \"title\": \"t2\",\n            \"author\": \"t\",\n            \"_category\": 5a7b18c9b6d4de46cf028efe,\n            \"content\": \"313\",\n            \"__v\": 0,\n            \"reading\": 0,\n            \"date\": 1518016633349,\n            \"order\": 3,\n            \"_tags\": [\n                {\n                    \"_id\": \"5a7b12ff9716f6209e98f3f1\",\n                    \"name\": \"t5\",\n                    \"__v\": 0\n                }\n            ]\n        },\n    \"total\": 7\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/post.js",
    "groupTitle": "文章"
  },
  {
    "type": "get",
    "url": "/posts",
    "title": "获取文章列表（分页）",
    "name": "getPosts",
    "description": "<p>获取文章列表</p>",
    "group": "Post",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "pagesize",
            "defaultValue": "10",
            "description": "<p>每页条数</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "categoryid",
            "description": "<p>分类id，根据分类筛选，不能与标签筛选同时使用</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "tagid",
            "description": "<p>标签id，根据标签筛选，不能与分类筛选同时使用</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.title",
            "description": "<p>文章标题</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.author",
            "description": "<p>作者</p>"
          },
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "data._category",
            "description": "<p>分类</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data._category.name",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.content",
            "description": "<p>正文</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "data.reading",
            "description": "<p>阅读量</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "data.date",
            "description": "<p>时间戳</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "data.order",
            "description": "<p>排序，数字越大越靠前</p>"
          },
          {
            "group": "Success 200",
            "type": "array",
            "optional": false,
            "field": "data._tags",
            "description": "<p>分类</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data._tags.name",
            "description": "<p>分类名称</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "total",
            "description": "<p>总条数</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"操作成功\",\n    \"data\": [\n        {\n            \"_id\": \"5a7b18c9b6d4de46cf028efd\",\n            \"title\": \"t2\",\n            \"author\": \"t\",\n            \"_category\": 5a7b18c9b6d4de46cf028efe,\n            \"content\": \"313\",\n            \"__v\": 0,\n            \"reading\": 0,\n            \"date\": 1518016633349,\n            \"order\": 3,\n            \"_tags\": [\n                {\n                    \"_id\": \"5a7b12ff9716f6209e98f3f1\",\n                    \"name\": \"t5\",\n                    \"__v\": 0\n                }\n            ]\n        }\n    ],\n    \"total\": 7\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/post.js",
    "groupTitle": "文章"
  },
  {
    "type": "put",
    "url": "/posts/:id",
    "title": "修改文章",
    "name": "updatePost",
    "description": "<p>修改文章</p>",
    "group": "Post",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "author",
            "description": "<p>作者</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "categoryId",
            "description": "<p>分类id</p>"
          },
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "tagIds",
            "description": "<p>标签id（json数组字符串）</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "order",
            "description": "<p>排序</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "date",
            "description": "<p>时间戳</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>正文</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>更新的文章</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 201,\n    \"message\": \"更新成功\",\n    \"data\": {\n        \"__v\": 0,\n        \"title\": \"标题\",\n        \"author\": \"作者\",\n        \"_category\": \"5a7b0c259716f6209e98f3ed\",\n        \"content\": \"正文\",\n        \"_id\": \"5a88595dbaa0c9183fe67795\",\n        \"reading\": 0,\n        \"date\": 312321,\n        \"order\": 1,\n        \"_tags\": [\n            \"5a7b12ff9716f6209e98f3f1\"\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/post.js",
    "groupTitle": "文章"
  },
  {
    "type": "get",
    "url": "/tags",
    "title": "获取标签列表",
    "name": "getTagsHome",
    "description": "<p>获取标签列表和标签对应的文章数量（客户端用），不会返回文章数量为0的标签</p>",
    "group": "TagHome",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.tag",
            "description": "<p>标签名称</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "data.count",
            "description": "<p>标签对应的文章数量</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "total",
            "description": "<p>固定值-1，表示不分页</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"操作成功\",\n    \"data\": [\n        {\n            \"_id\": \"5a7b12ff9716f6209e98f3f1\",\n            \"tag\": \"js\",\n            \"count\": 5\n        },\n        {\n            \"_id\": \"5a8c5494c1a7b22bfa119067\",\n            \"tag\": \"c++\",\n            \"count\": 1\n        },\n        {\n            \"_id\": \"5a7b12fa9716f6209e98f3ef\",\n            \"tag\": \"node\",\n            \"count\": 2\n        }\n    ],\n    \"total\": -1\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/home/tag.js",
    "groupTitle": "标签（客户端）"
  },
  {
    "type": "post",
    "url": "/tags",
    "title": "新增标签",
    "name": "createTag",
    "description": "<p>新增标签</p>",
    "group": "Tag",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>标签名称</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>新增的标签</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 201,\n    \"message\": \"插入成功\",\n    \"data\": {\n        \"__v\": 0,\n        \"name\": \"js\",\n        \"_id\": \"5a885bd0baa0c9183fe67799\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/tag.js",
    "groupTitle": "标签"
  },
  {
    "type": "delete",
    "url": "/tags/:id",
    "title": "删除指定标签",
    "name": "deleteTag",
    "description": "<p>删除指定标签，该标签下没有文章时方可删除</p>",
    "group": "Tag",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 204,\n    \"message\": \"删除成功\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/tag.js",
    "groupTitle": "标签"
  },
  {
    "type": "get",
    "url": "/tags",
    "title": "获取标签列表",
    "name": "getTags",
    "description": "<p>获取标签列表</p>",
    "group": "Tag",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "data.name",
            "description": "<p>标签名称</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "total",
            "description": "<p>固定值-1，表示不分页</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 200,\n    \"message\": \"操作成功\",\n    \"data\": [\n        {\n            \"_id\": \"5a7b2bcd31ac4d5e1d55b0d2\",\n            \"name\": \"Node.js\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"5a7b2bcb31ac4d5e1d55b0d1\",\n            \"name\": \"Javascript\",\n            \"__v\": 0\n        }\n    ],\n    \"total\": -1\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/tag.js",
    "groupTitle": "标签"
  },
  {
    "type": "put",
    "url": "/tags/:id",
    "title": "修改标签",
    "name": "updateTag",
    "description": "<p>修改标签</p>",
    "group": "Tag",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": ":id",
            "description": "<p>id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>标签名称</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "data",
            "description": "<p>更新的标签</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>文本信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Example:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"status\": 201,\n    \"message\": \"更新成功\",\n    \"data\": {\n        \"__v\": 0,\n        \"name\": \"操作系统\",\n        \"_id\": \"5a885bd0baa0c9183fe67799\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "api/admin/tag.js",
    "groupTitle": "标签"
  }
] });
