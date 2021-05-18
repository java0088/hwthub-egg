'use strict';

const Controller = require('egg').Controller;
const qr = require('qr-image')
const decodeImage = require('jimp').read
const qrcodeReader = require('qrcode-reader')

const fs = require('fs')
const path = require('path')

const user = { id: 1, username: 'shangsan', realname: '张三', gender: '男', age: 18 }


class QRCodeController extends Controller {
  async index() {
    const { ctx } = this;
    
    try {
      var img = await qr.image(JSON.stringify(user), { size: 5 })
      const writer = fs.createWriteStream(path.resolve(__dirname, 'lala.png'))
      img.pipe(writer)
      ctx.set('content-type','image/png')
      ctx.body = img
    } catch (e) {
      ctx.status = 414
      ctx.set('Content-Type', 'text/html');
      ctx.body = '<h1>414 Request-URI Too Large</h1>'
    }
  }

  async getCode() {
    const { ctx } = this
    const res = await this.qrDecode(path.resolve(__dirname, 'lala.png'))
    console.log(res)
    ctx.body = {
      status: 0,
      data: res
    }
  }
  qrDecode(data){
    return new Promise((resolve, reject) => {
      decodeImage(data,function(err,image){
        if(err){
          reject(err)
        }
        let decodeQR = new qrcodeReader()
        decodeQR.callback = function(errorWhenDecodeQR, result) {
          if (errorWhenDecodeQR) {
            reject(err)
          }
          if (!result){
            reject(err)
          } else {
            resolve(JSON.parse(result.result))
          }
        }
        decodeQR.decode(image.bitmap)
      })
    })
  }
}

module.exports = QRCodeController
