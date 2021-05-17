'use strict';

const Contoller = require('egg').Controller

module.exports = class UserController extends Contoller {
  // 测试 mysql数据库
  async list() {
    const { ctx } = this
    let userList = await ctx.model.User.findAll()
    this.ctx.body = {
      data: userList,
      status: 0
    }
  }
  // 测试 redis
  async testCache() {
    const { ctx, app } = this
    let flag = false
    // 获取缓存中的 user_list
    let userList = await app.redis.get('user_list')
    // 如果缓存中没有就从数据库中读取
    if (!userList) {
      flag = false
      userList = await ctx.model.User.findAll()
      await app.redis.set('user_list', JSON.stringify(userList))
      console.log(JSON.stringify(userList))
    } else {
      flag = true
      // 有缓存需要 JSON.parse一下
      userList = JSON.parse(userList)
    }
    this.ctx.body = {
      data: userList,
      status: 0,
      msg: flag ? '有缓存' : '没有缓存'
    }
  }
}

