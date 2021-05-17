'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // 配置mysql数据库
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
  // 配置redis
  redis: {
    enable: true,
    package: 'egg-redis'
  },
  // 配置 mosquito
  emqtt: {
    enable: true,
    package: 'egg-emqtt'
  }
}
