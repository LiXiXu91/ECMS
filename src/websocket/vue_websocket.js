/**
 * Created by Administrator on 2017/6/26.
 */
import wsMsg from "./websocketMsg";
var storage = require('../common/store');
export default {
    install(Vue,opt) {
        //wsMsg.initFun(opt);
        Vue.prototype.$wsMsg = wsMsg
        let option=opt;
        let addListeners = function() {
            if (this.$options["wsMsg"]) {
                let conf = this.$options.wsMsg;
                option.fromUserId = storage.store.get('userFlag')
                //根据账户信息，连接不同的socket。在此处根据账号信息，改变参数。
                wsMsg.initFun(option)
                if (conf.init) {
                   /* wsMsg.cmd2=msg=>{
                        // console.log('cmd2:',msg)
                    }*/
                    conf.init.call(this,wsMsg)
                }
            }
        };

        let removeListeners = function() {
            if (this.$options["wsMsg"]) {
                let conf = this.$options.wsMsg;
                if (conf.init) {
                    console.log('主动断开连接')
                    this.$wsMsg.close()
                }
            }
        };

        Vue.mixin({
            // Vue v1.x
            beforeCompile: addListeners,

            // Vue v2.x
            beforeCreate: addListeners,


            beforeDestroy: removeListeners
        });

    }

};