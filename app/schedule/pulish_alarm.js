'use strict'
// 开一个定时器模拟发送 MQTT
module.exports = {
  schedule: {
    interval: '3s', // 间隔
    type: 'worker',
    disable: true,
  },
  async task(ctx) {
    console.log('定时器启动了');
    const msg = '测试MQTT~'
    await ctx.app.emqtt.get('uav').publish('/test/1', msg, { qos: 0 })
  },
}
