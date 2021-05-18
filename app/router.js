'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 应用启动前回调函数
  app.beforeStart(async () => {
    // 如果表不存在就创建
    await app.model.sync({ alter: false })
  })
  router.get('/', controller.home.index);

  // 测试mysql数据库
  router.get('/user/list', controller.user.list)

  // 测试 redis
  router.get('/user/testCache', controller.user.testCache)

  // 测试 MQTT
  app.emqtt.get('uav').route('/test/#', app.mqtt.controller.test.index)

  // 测试二维码识别
  // 生成二维码
  router.get('/qrcode', controller.qrcode.index)
  // 识别二维码
  router.get('/getCode', controller.qrcode.getCode)
};
