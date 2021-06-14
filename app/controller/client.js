'use strict';

const Controller = require('egg').Controller;

class ClientController extends Controller {
  // 添加电压数据
  async addAmaterList() {
    const { ctx } = this;
    const { list = [] } = ctx.request.body
    if (list.length > 0) {
      const listStr = JSON.stringify(list)
      await ctx.app.redis.set('amater', listStr)
      ctx.app.io.emit('amater', listStr)
    }
    ctx.body = { status: 0, msg: '保存成功' }
  }
  // 获取电压数据
  async getAmaterList() {
    const { ctx } = this
    const data = await ctx.app.redis.get('amater')
    
    let list = []
    if (data) {
      list = JSON.parse(data)
    }
    ctx.body = { status: 0, data: list }
  }

  // 添加电流数据
  async addFluentList() {
    const { ctx } = this;
    const { list = [] } = ctx.request.body
    if (list.length > 0) {
      await ctx.app.redis.set('fluent', JSON.stringify(list))
    }
    ctx.body = { status: 0, msg: '保存成功' }
  }
  // 获取电流数据
  async getFluentList() {
    const { ctx } = this
    const data = await ctx.app.redis.get('fluent')
    let list = []
    if (data) {
      list = JSON.parse(data)
    }
    ctx.body = { status: 0, data: list }
  }

  // 添加停电数据
  async addBlockoutList() {
    const { ctx } = this;
    const { list = [] } = ctx.request.body
    if (list.length > 0) {
      await ctx.app.redis.set('blockout', JSON.stringify(list))
    }
    ctx.body = { status: 0, msg: '保存成功' }
  }
  // 获取停电数据
  async getBlockoutList() {
    const { ctx } = this
    const data = await ctx.app.redis.get('blockout')
    let list = []
    if (data) {
      list = JSON.parse(data)
    }
    ctx.body = { status: 0, data: list }
  }

  // 添加停电数据
  async addLinelossList() {
    const { ctx } = this;
    const { list = [] } = ctx.request.body
    if (list.length > 0) {
      await ctx.app.redis.set('lineloss', JSON.stringify(list))
    }
    ctx.body = { status: 0, msg: '保存成功' }
  }
  // 获取停电数据
  async getLinelossList() {
    const { ctx } = this
    const data = await ctx.app.redis.get('lineloss')
    let list = []
    if (data) {
      list = JSON.parse(data)
    }
    ctx.body = { status: 0, data: list }
  }

  // 添加停电数据
  async addPhotovoltaicList() {
    const { ctx } = this;
    const { list = [] } = ctx.request.body
    if (list.length > 0) {
      await ctx.app.redis.set('photovoltaic', JSON.stringify(list))
    }
    ctx.body = { status: 0, msg: '保存成功' }
  }
  // 获取停电数据
  async getPhotovoltaicList() {
    const { ctx } = this
    const data = await ctx.app.redis.get('photovoltaic')
    let list = []
    if (data) {
      list = JSON.parse(data)
    }
    ctx.body = { status: 0, data: list }
  }
  // 测试接口
  async test() {
    const { ctx } = this
    ctx.body = { status: 0, msg: '啦啦啦啦啦啦' }
  }
}

module.exports = ClientController;
