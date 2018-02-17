const dbConfig = {
  username: '',
  password: '',
  path: 'localhost',
  port: '27017',
  dbName: 'tzblog'
};

let dbPath;
if (dbConfig.username && dbConfig.password) {
  // 数据库开启鉴权时
  dbPath = `mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.path}:${dbConfig.port}/${dbConfig.dbName}`;
} else {
  // 数据库未开启鉴权时
  dbPath = `mongodb://${dbConfig.path}:${dbConfig.port}/${dbConfig.dbName}`;
}

module.exports = dbPath;