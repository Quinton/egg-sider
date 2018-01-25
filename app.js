'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

module.exports = app => {
  const prefix = new Set();
  const directory = path.join(app.config.baseDir, 'app/sider');
  app.loader.loadToApp(directory, 'sider');

  // 获取app/sider/ 文件下所有文件名，不包括文件类型后缀
  const files = fs.readdirSync(directory);
  files.forEach(file => {
    if (path.extname(file) === '.js') {
      const fileName = path.basename(file, '.js');
      assert(fileName !== 'get', '`get` is reserved key word, illegal file: app/sider/get.js');
      prefix.add(fileName);
    }
  });
  
  app.sider.get = new Proxy(app.redis.get, {
    apply: async (target, key, recevier) => {
      const formatKey = recevier[0]
      let value = await app.redis.get(formatKey);
      if (!value) {
        const recevs = formatKey.split(':');
        const newValue = await app.sider[recevs[0]](...recevs);
        await app.redis.set(formatKey, newValue);
        return newValue;
      }
      return value;
    },
  });
};
