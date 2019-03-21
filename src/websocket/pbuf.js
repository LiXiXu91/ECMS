/**
 * Created by Administrator on 2017/4/6.
 * ProtoBuf的初始化方法
 */
var ProtoBuf=require("protobufjs");
/*4*/
/*
 var Chatmsg= ProtoBuf.loadProtoFile("../../file/probuf.proto").build("chatmsg.ChatMsg");
 // 像父模块设置值
 var pm = new Chatmsg();
 pm.set({
 msg:'123'
 })*/

/*5.0.2*/
var Chatmsg = ProtoBuf.loadProtoFile("/static/probuf.proto").build("chatmsg.ChatMsg");
var sendMsgOjb = new Chatmsg();

/*6.7*/
/*ProtoBuf.load("../../../file/probuf.proto",function(err,root){
 if (err)
 throw err;

 // 获取消息类型
 Chatmsg = root.lookupType("chatmsg.ChatMsg");

 // 创建新消息
 var message = Chatmsg.create({ cmd: 12 });

 // 编码信息的uint8array（浏览器）或Buffer（节点）
 var buffer = Chatmsg.encode(message).finish();
 // ... do something with buffer 用缓冲做某事

 // Or, encode a plain object 或者，对一个纯对象进行编码
 var buffer1 = Chatmsg.encode({ channel: "test" }).finish();
 // ... do something with buffer

 // Decode an Uint8Array (browser) or Buffer (node) to a message 解码uint8array（浏览器）或Buffer（节点）到一个消息
 var message = Chatmsg.decode(buffer);
 // ... do something with message

 // If your application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.
 //如果你的应用程序使用的缓冲区长度限定，也有encodedelimited和decodedelimited


 // Exemplary payload
 var payload = { awesomeField: "AwesomeString" };

 // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
 var errMsg = Chatmsg.verify(payload);
 if (errMsg)
 throw Error(errMsg);

 // Create a new message
 var message = Chatmsg.fromObject(payload); // or use .create if payload is already known to be valid

 // Encode a message to an Uint8Array (browser) or Buffer (node)
 var buffer = Chatmsg.encode(message).finish();
 // ... do something with buffer

 // Decode an Uint8Array (browser) or Buffer (node) to a message
 var message = Chatmsg.decode(buffer);
 // ... do something with message

 // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

 // Maybe convert the message back to a plain object
 var object = Chatmsg.toObject(message, {
 longs: String,
 enums: String,
 bytes: String,
 // see ConversionOptions
 });
 })*/

module.exports={
    sendMsgOjb:sendMsgOjb,  //发送消息 时用到的对象
    Chatmsg:Chatmsg  //全局的解码对象
}
