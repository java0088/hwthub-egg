/* eslint valid-jsdoc: "off" */

'use strict';
const BASE_URL = '39.107.99.4'
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1621229335152_782';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 配置mysql
  config.sequelize = {
    dialect: 'mysql',
    host: BASE_URL,
    port: 3306,
    database: 'hwthub',
    username: 'root',
    password: '123456',
    define: { // model的全局配置
      timestamps: true, // 添加create,update,delete时间戳
      // paranoid: true, // 添加软删除
      freezeTableName: true, // 防止修改表名为复数
      underscored: false // 防止驼峰式字段被默认转为下划线
    },
    timezone: '+08:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
    dialectOptions: { // 让读取date类型数据时返回字符串而不是UTC时间
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === 'DATETIME') {
          return field.string()
        }
        return next()
      }
    }
  }

  // 配置redis
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: BASE_URL, // Redis host
      password: '',
      db: 0,
    }
  }

  // 配置mosquito
  const options = {
    keepalive: 60,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    rejectUnauthorized: false,
    qos: 0,
  }
  const clientId = 'mqttjs_' + Math.random().toString(16).substr(2, 8)
  config.emqtt = {
    clients: {
      uav: {
        host: `mqtt://${BASE_URL}:1883`,
        username: 'admin',
        password: 'Senscape',
        clientId,
        options,
        msgMiddleware: [],
      },
    }
  }
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: [ '*' ]
  }
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  }
  config.io = {
    init: { }, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
      '/news': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
