'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  // 应用启动前回调函数
  app.beforeStart(async () => {
    // 如果表不存在就创建
    await app.model.sync({ alter: false })
  })

  // 测试 MQTT
  app.emqtt.get('uav').route('/test/#', app.mqtt.controller.test.index)
  
  

  // 测试二维码识别
  // 生成二维码
  router.get('/qrcode', controller.qrcode.index)
  // 识别二维码
  router.get('/getCode', controller.qrcode.getCode)

  // 电压
  router.post('/addAmaterList', controller.client.addAmaterList)
  router.get('/getAmaterList', controller.client.getAmaterList)

  // 电流
  router.post('/addFluentList', controller.client.addFluentList)
  router.get('/getFluentList', controller.client.getFluentList)

  // 停电
  router.post('/addBlockoutList', controller.client.addBlockoutList)
  router.get('/getBlockoutList', controller.client.getBlockoutList)

  // 线损
  router.post('/addLinelossList', controller.client.addLinelossList)
  router.get('/getLinelossList', controller.client.getLinelossList)

  // 光伏
  router.post('/addPhotovoltaicList', controller.client.addPhotovoltaicList)
  router.get('/getPhotovoltaicList', controller.client.getPhotovoltaicList)

  // 测试
  router.get('/test', controller.client.test)
  router.get('/getUserList', controller.home.getUserList)
  router.get('/sendMQTT', controller.home.sendMQTT)

  io.of('/').route('chat', io.controller.home.index)
}
