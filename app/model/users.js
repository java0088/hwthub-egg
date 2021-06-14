'use strict'
module.exports = app => {
  const { STRING, DATE } = app.Sequelize
  return app.model.define('users', {
    name: { type: DATE, allowNull: true, comment: '用户名' },
    password: { type: STRING, allowNull: true, comment: '密码' }
  })
}
