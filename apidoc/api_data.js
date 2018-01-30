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
            "field": "id",
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
            "description": "<p>页码</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "pageSize",
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
            "field": "id",
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
            "field": "id",
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
            "field": "id",
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
  }
] });
