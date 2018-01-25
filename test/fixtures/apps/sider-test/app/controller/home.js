'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    console.log(await this.app.sider.get('test'), '>>>>>>>>>>>>>>>>>>))))))))))))');
    this.ctx.body = 'hi, ' + this.app.plugins.sider.name;
  }
}

module.exports = HomeController;
