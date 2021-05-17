'use strict'

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize
  const User = app.model.define('user', {
    realname: { type: STRING, allowNull: false, comment: '真实姓名' },
    username: { type: STRING, allowNull: false, comment: '用户名' },
    password: { type: STRING, allowNull: false, comment: '密码' },
    gender: { type: INTEGER, allowNull: false, comment: '性别' },
    age: { type: INTEGER, allowNull: true, comment: '年龄' }
  })
  return User
}
