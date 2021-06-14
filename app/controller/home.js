'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async getUserList() {
    const { ctx } = this;
    let data = await ctx.app.redis.get('user_list')
    let list = []
    let msg = ''
    if (data) {
      list = JSON.parse(data)
      msg = '从缓存中读取用户列表'
    } else {
      list = await ctx.model.Users.findAll()
      await ctx.app.redis.set('user_list', JSON.stringify(list))
      msg = '从数据库中读取用户列表'
    }
    
    ctx.body = { status: 0, msg, data: list }
  }
  async sendMQTT() {
    const { ctx } = this;
    await ctx.app.emqtt.get('uav').publish('/test/hello', 'Hello eggjs', { qos: 0 })
    ctx.body = { status: 0, msg: '发送成功' }
  }
}

module.exports = HomeController;
