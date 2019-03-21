/**
 * Created by Administrator on 2017/4/6.
 * 基于websocket的消息处理方法
 */
var ProtoBuf=require("protobufjs");

const logger=console;

var jsonDescriptor = require("./protobuf.json"); // exemplary for node

var root = ProtoBuf.Root.fromJSON(jsonDescriptor);

var getProtoBufType=cmd=>{ //获取子级的对应指令的pb格式对象
    //let root= await ProtoBuf.load("/static/probuf.proto")
    if(!cmd){
        return root.lookupType("protocol.Cmd");
    }
    return root.lookupType("protocol.CmdData"+cmd);
}

export default {
    msgBackFunList:{}, //组存回调的对象
    fromClientId: "webpage",
    ws:null
    ,initCallback:null//初始化后的回调方法
    ,heartbeatInt:0
    ,timeout:null //心跳记时器
    ,option:null
    ,token:''


    ,initFun:function(option){ //初始化法
        if(this.ws!=null){
            this.ws=null;
        }
        var that=this
        this.option=option
        this.initCallback=option.callback||function(){}
        this.wsAdd=option.wsAdd||'ws://192.168.0.228:6788/robotApi'
        this.handleClose=false; //手动关闭连接时不进行重连
        this.fromClientId= option.fromClientId||"ecmsPage"
        this.heartbeatInt=0;
        this.token = option.token
        this.ws = new WebSocket(this.wsAdd,[this.token]);
        this.ws.binaryType = 'arraybuffer'
        this.timeoutset = setTimeout(_=>{
            logger.info('ReWebSocket', '连接超时！！！');
            this.onClose();
        },20000);
        this.ws.onopen=e=>{this.onOpen(e)}
        this.ws.onclose=e=>{this.onClose(e)};
        this.ws.onmessage=function(e){
            that.onMessage(e)
        };
        /*收到的消息处理代码段*/
        this.ws.onerror=e=>{this.onError(e)};
    }
    ,onOpen(evt){
        //已经建立连接
        this.timeout&&clearTimeout(this.timeout);
        this.timeoutset&&clearTimeout(this.timeoutset);
        this.handleClose=false;
        if(evt.returnValue){
            logger.info('已经建立连接')
            this.sendMsgFun({
                cmd:1,
                fromClientId:this.fromClientId,
                cmdData:{
                    username:this.fromClientId,
                    nickname:"API测试",
                    channel:2,
                    mobileSerial:'API测试编号'
                }
            })
            this.heartbeat() //开始心跳
        }
    }
    ,async onMessage(e){
        this.heartbeatInt=0
       /* var message = await Chatmsg.then(chatmsg=>{
            return chatmsg.decode(new Uint8Array(e.data))
        });*/
        let protobufCmd=await getProtoBufType()
        var message=protobufCmd.decode(new Uint8Array(e.data))
        if(!!message.cmdData&&message.cmdData.length>0){
            let cmdDataType=await getProtoBufType(message.cmd)
            let cmdData=cmdDataType.decode(message.cmdData).toJSON()
            message=message.toJSON();
            message["cmdData"]=cmdData;
        }
        logger.info(JSON.stringify(message))
        if(message&&message.cmd){
            setTimeout(_=>{
                this['cmd'+message.cmd]&&this['cmd'+message.cmd](message)
            },0)
        }
        if(message.localId&&message.status==1){ //只有当前发出的的信息才有localId 服务端推送的不用回调处理，按消息处理
            var callbakcFun=this.msgBackFunList[message.localId]&&this.msgBackFunList[message.localId]['callback']
            callbakcFun&&callbakcFun(message) //执行回调函数
            this.msgBackFunList[message.localId]=null;
            delete this.msgBackFunList[message.localId];
        }
    }
    ,onClose(e){
        logger.info('触发onClose',this.handleClose)
        this.heartbeatInt=0
        clearTimeout(this.timeout);
        //log('_close:'+e);
        if(!this.handleClose){
            this.timeout=setTimeout(_=>{
                clearTimeout(this.timeout);
                this.initFun(this.option);
            }, 5000);
        }else{
            this.handleClose=false;
        }
    }
    ,sendMsgFun:async function(msg,callback){
        //发送消息的公用方法
        //type为消息的类型
        if(!msg.cmd) return false;

        /*6.7.0*/
        //var buffer1 = Chatmsg.encode(msgObj).finish();
        /*5.02*/
        msg.cmd!=1&&logger.info('sendMsgFun:',JSON.stringify(msg))
       /* var buffer1 = await Chatmsg.then(chatmsg=>{
            return chatmsg.encode(chatmsg.create(msg)).finish()
        });*/
        if(msg.cmdData!=null){
            let cmdDataType=await getProtoBufType(msg.cmd)
            msg.cmdData=cmdDataType.encode(cmdDataType.create(msg.cmdData)).finish()
        }
        let protobufCmd= await getProtoBufType()
        var buffer1=protobufCmd.encode(protobufCmd.create(msg)).finish()
        //缓存回调函数
        this.msgBackFunList[msg.localId]={}
        this.msgBackFunList[msg.localId]['msg']=msg;
        this.msgBackFunList[msg.localId]['callback']=callback||function(msg){};
        if(this.ws.readyState==1){
            this.ws.send(buffer1)
            logger.info('发送成功')
        }else{
            try{
                this.onError();
            }catch(e){
                logger.info('onerror:'+e.message)
            }
            //this.ws.refresh();
        }
    }
    ,onError:function(e){
        try{
            logger.info('触发onError:',e)
            this.onClose(e);
        }catch(e){
            logger.error('onerror:'+e.message)
        }
    }
    ,close:function(){
        if(this.ws){
            this.handleClose=true;//手动关闭
            logger.info('触发close:',this.handleClose)
            this.ws.close();
        }
    },
     //心跳
    heartbeat() {
        if(this.heartbeatInt>5){
            this.sendMsgFun({
                cmd: 2,
                fromClientId: this.fromClientId,
            });
            this.heartbeatInt=0

        }else{
            this.heartbeatInt++
        }
        this.timeout=setTimeout(_=>{
            clearTimeout(this.timeout)
            this.heartbeat()
        },1000)

    }

}





