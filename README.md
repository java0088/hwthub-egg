# hwthub-egg (搭建egg环境模板) mysql、redis、MQTT

## 一、 初始化egg项目 -- 建议看官网的

- 初始化项目
  ```
    mkdir egg-example && cd egg-example
    npm init egg --type=simple
    npm i
  ```

- 启动项目
  ```
    npm run dev
    http://localhost:7001
  ```

## 二、 配置数据库 - 这里使用 sequelize 和 mysql2

- 安装
  ```
    npm install --save egg-sequelize mysql2
  ```
- 在 config/plugin.js 中引入 egg-sequelize 插件
  ```javascript
    exports.sequelize = {
      enable: true,
      package: 'egg-sequelize'
    }
  ```
- 在config/config.default.js 中配置数据库信息
  ```javascript
  // 配置mysql
    config.sequelize = {
      dialect: 'mysql',
      host: BASE_URL,
      port: 3306,
      database: 'test',
      username: 'root',
      password: '123',
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
  ```

## 三、 配置 redis

- 安装
  ```
    npm i egg-redis --save
  ```

- 在 config/plugin.js 中引入 egg-redis 插件

  ```javascript
    exports.redis = {
      enable: true,
      package: 'egg-redis'
    }
  ```
- 在config/config.default.js 中配置redis信息
  ```javascript
    // 配置redis
    config.redis = {
      client: {
        port: 6379, // Redis port
        host: BASE_URL, // Redis host
        password: '',
        db: 0,
      }
    }
  ```
- 使用
  ```javascript
    await app.redis.get('msg')
    await app.redis.set('msg', '这是一条消息')
  ```

## 四、配置 MQTT

- 安装
  ```
   npm i egg-emqtt --save
  ```

- 在 config/plugin.js 中引入 egg-emqtt 插件

  ```javascript
    exports.emqtt = {
      enable: true,
      package: 'egg-emqtt'
    }
  ```

- 在config/config.default.js 中配置MQTT信息
  ```javascript
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
          password: '123456',
          clientId,
          options,
          msgMiddleware: [],
        },
      }
    }
  ```
- 使用
  ```javascript
    // 发送消息
    await ctx.app.emqtt.get('uav').publish('/test/1', '测试MQTT~', { qos: 0 })
    
    // 监听topic，在 app/router.js。监听 /test/#
    app.emqtt.get('uav').route('/test/#', app.mqtt.controller.test.index)
  ```
  


