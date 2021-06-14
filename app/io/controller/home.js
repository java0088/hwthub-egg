module.exports = app => {
  class chatController extends app.Controller {
    async index() {
      this.ctx.socket.emit('res', 'test');
    }
    async message() {   //方法通过 客户端 this.emit（'message',{}）//触发
      this.ctx.socket.emit('message', 'test');
      const params = this.ctx.args[0];
     // this.ctx.service.message.sendPeerMessage(params);
      console.log(2,params);
    }


    async online() {// modelMessage.sendOfflineMessage(socket, data.userId);
    }
  }
  return chatController
}