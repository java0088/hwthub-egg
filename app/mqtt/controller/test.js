'use strict'

module.exports = app => {

  return class AlarmController extends app.Controller {
    async index() {
      const { ctx } = this
      let { topic, msg } = ctx.req
      try {
        console.log(`这是接收消息：${msg}，是${topic}发送过来的~`)
      } catch (error) {
        console.log('json parse error', error)
      }
    }
  }
}
