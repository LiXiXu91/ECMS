<template>
    <a-locale-provider :locale="zh_CN">
    <global-layout>
        <contextmenu :itemList="menuItemList" :visible.sync="menuVisible" @select="onMenuSelect" />
        <a-tabs
            @contextmenu.native="e => onContextmenu(e)"
            v-if  ="multipage"
            :active-key="activePage"
            style="margin-top: -8px; margin-bottom: 8px"
            :hide-add="true"
            type="editable-card"
            @change="changePage"
            @edit="editPage">
            <a-tab-pane :id="page.fullPath" :key="page.fullPath" v-for="page in pageList">
                  <span slot="tab" :pagekey="page.fullPath">{{page.name}}</span>
            </a-tab-pane>
        </a-tabs>
        <transition name="page-toggle">
            <keep-alive v-if="multipage">
                  <router-view />
            </keep-alive>
            <router-view v-else />
        </transition>
    </global-layout>
    </a-locale-provider>
</template>

<script>
import GlobalLayout from './GlobalLayout'
import Contextmenu from '../components/menu/Contextmenu'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
var storage = require('../common/store')
var comConf=require('../common/comConfig')
var emoji = require('../common/emojiMap');
export default {
    name: 'MenuView',
    components: {Contextmenu, GlobalLayout},
    data () {
        return {
            pageList: [],
            linkList: [],
            activePage: '',
            menuVisible: false,
            menuItemList: [
                { key: '1', icon: 'arrow-left', text: '关闭左侧' },
                { key: '2', icon: 'arrow-right', text: '关闭右侧' },
                { key: '3', icon: 'close', text: '关闭其它' }
            ],
            zh_CN,
        }
    },
    computed: {
        multipage () {
              return this.$store.state.setting.multipage
        }
    },
    created () {
        this.pageList.push(this.$route)
        this.linkList.push(this.$route.fullPath)
        this.activePage = this.$route.fullPath
        this.getSocketAddress()
    },
    destroyed: function() {
        //页面销毁时关闭长连接
        this.$ws.close()
    },
    watch: {
        '$route': function (newRoute, oldRoute) {
            this.activePage = newRoute.fullPath
            if (!this.multipage) {
                this.linkList = [newRoute.fullPath]
                this.pageList = [newRoute]
            } else if (this.linkList.indexOf(newRoute.fullPath) < 0) {
                this.linkList.push(newRoute.fullPath)
                this.pageList.push(newRoute)
            }
        },
        'activePage': function (key) {
            this.$router.push(key)
        },
        'multipage': function (newVal, oldVal) {
            if (!newVal) {
                this.linkList = [this.$route.fullPath]
                this.pageList = [this.$route]
            }
        }
    },
    methods: {
        changePage (key) {
            this.activePage = key
        },
        editPage (key, action) {
            this[action](key)
        },
        remove (key) {
            if (this.pageList.length === 1) {
                this.$message.warning('这是最后一页，不能再关闭了啦')
                return
            }
            this.pageList = this.pageList.filter(item => item.fullPath !== key)
            let index = this.linkList.indexOf(key)
            this.linkList = this.linkList.filter(item => item !== key)
            index = index >= this.linkList.length ? this.linkList.length - 1 : index
            this.activePage = this.linkList[index]
        },
        onContextmenu (e) {
            const pagekey = this.getPageKey(e.target)
            if (pagekey !== null) {
                e.preventDefault()
                this.menuVisible = true
            }
        },
        /**
         * 由于ant-design-vue组件库的TabPane组件暂不支持自定义监听器，无法直接获取到右键target所在标签页的 pagekey 。故增加此方法用于
         * 查询右键target所在标签页的标识 pagekey ，以用于自定义右键菜单的事件处理。
         * 注：TabPane组件支持自定义监听器后可去除该方法并重构 ‘自定义右键菜单的事件处理’
         * @param target 查询开始目标
         * @param count 查询层级深度 （查找层级最多不超过3层，超过3层深度直接返回 null）
         * @returns {String}
         */
        getPageKey (target, depth) {
            depth = depth || 0
            if (depth > 2) {
                return null
            }
            let pageKey = target.getAttribute('pagekey')
            pageKey = pageKey || (target.previousElementSibling ? target.previousElementSibling.getAttribute('pagekey') : null)
            return pageKey || (target.firstElementChild ? this.getPageKey(target.firstElementChild, ++depth) : null)
        },
        onMenuSelect (key, target) {
            let pageKey = this.getPageKey(target)
            switch (key) {
                case '1':
                    this.closeLeft(pageKey)
                    break
                case '2':
                    this.closeRight(pageKey)
                    break
                case '3':
                    this.closeOthers(pageKey)
                    break
                default:
                    break
            }
        },
        closeOthers (pageKey) {
            let index = this.linkList.indexOf(pageKey)
            this.linkList = this.linkList.slice(index, index + 1)
            this.pageList = this.pageList.slice(index, index + 1)
            this.activePage = this.linkList[0]
        },
        closeLeft (pageKey) {
            let index = this.linkList.indexOf(pageKey)
            this.linkList = this.linkList.slice(index)
            this.pageList = this.pageList.slice(index)
            if (this.linkList.indexOf(this.activePage) < 0) {
                  this.activePage = this.linkList[0]
            }
        },
        closeRight (pageKey) {
            let index = this.linkList.indexOf(pageKey)
            this.linkList = this.linkList.slice(0, index + 1)
            this.pageList = this.pageList.slice(0, index + 1)
            if (this.linkList.indexOf(this.activePage < 0)) {
                this.activePage = this.linkList[this.linkList.length - 1]
            }
        },
        getSocketAddress() {
//            获取当前公司socket地址
            this.$axios({
                method: 'get',
                url: '/index.php?r=uc/user/company-info'
            }).then(res=> {
                let udata = res.data
                if (udata.status == 1) {
                    this.$store.commit('user/setCompany', udata.data)
                    this.$ws.initFun({
//                        wsAdd:'ws://ecmsdemo.sk.wujieshuju.com/ecms',//线上，客户使用
//                        wsAdd:'ws://ecms.sk.wujieshuju.com/ecms',//线上,自己使用
                        wsAdd:'ws://' + this.$store.state.user.company.public_ip + ':' +  this.$store.state.user.company.server_port + '/ecms',//本地
//                        wsAdd:'ws://192.168.0.66:6789/ecms',//本地
                        fromClientId:this.$store.state.user.user.user_id,
                        token:storage.store.get('token')
                    })
                }
            })
            this.responseWs()
        },
        responseWs() {
            let _this = this
            this.$ws.cmd1001 = function (msg) {
                if(msg.status==2) {
                    _this.$store.commit('user/addMenuBadge', {name:msg.callbackMsg,badge:1})
                }
            }
            this.$ws.cmd1002 = function (msg) {
                _this.$store.commit('user/addMenuBadge', {name:'新的朋友',badge:1})
            }
            this.$ws.cmd1000 = function (msg) {
//                根据当前router确定不同行为
//                如果在实时聊天界面，需要插入数据
                console.log('1000',msg)
                if(_this.$router.currentRoute.path=='/customerChat/liveChat') {
                    if(msg.status==2) {
                        let timestamp = new Date(+new Date() +8*3600*1000) //go返回的时间戳
//                        let datekey = timestamp.getFullYear()+ '-' + (timestamp.getMonth()+1)+ '-' + timestamp.getDate() //go的时间戳转换
                        let datetime = timestamp.toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
                        let datekey = datetime.slice(0,10)
                        if((_this.$store.state.liveChat.selectContact.friend_user_name==msg.cmdData.fromUsername&&_this.$store.state.liveChat.selectContact.robot_username==msg.cmdData.toUsername)
                            ||(_this.$store.state.liveChat.selectContact.robot_username==msg.cmdData.fromUsername&&_this.$store.state.liveChat.selectContact.friend_user_name==msg.cmdData.toUsername&&msg.cmdData.msgSvrId=='1')
                        ) {
                            let content = ''
                            let type = '1'
                            let newMsg = {
                                key:datekey,
                                data:[{
                                    id:_this.$store.state.liveChat.selectContact.id,
                                    avatar_url:_this.$store.state.liveChat.selectContact.avatar_url,
                                    nickname:_this.$store.state.liveChat.selectContact.nickname,
                                    created:datetime,//从go获取
                                    content:msg.cmdData.type==1?(emoji.stringToHtml(msg.cmdData.content)):'',
                                    iconurl:msg.cmdData.type==3?'data:image/jpeg;base64,'+encodeURI(msg.cmdData.smallImg):msg.cmdData.type==47?'data:image/jpeg;base64,'+encodeURI(msg.cmdData.bigImg):'',
                                    type:msg.cmdData.type,
                                    send_by:'0'
                                }]
                            }
                            if(msg.cmdData.fromUsername.search(/@chatroom/)!=(-1)) {
                                newMsg.data[0].avatar_url = msg.cmdData.url
                            }
                            switch (msg.cmdData.type) {
                                case '1':
                                    content = emoji.stringToHtml(msg.cmdData.content)
                                    break
                                case '3':
                                    type = '3'
                                    content = '[图片]'
                                    newMsg.data[0].msgId = msg.cmdData.msgId
                                    newMsg.data[0].msgSvrId = msg.cmdData.msgSvrId
                                    newMsg.data[0].toUsername = msg.cmdData.toUsername
                                    newMsg.data[0].imgId = msg.cmdData.imgId
                                    newMsg.data[0].bigImg = ''
                                    break
                                case '5':
                                    newMsg.data[0].title = msg.cmdData.title
                                    newMsg.data[0].mediapath = 'data:image/jpeg;base64,'+ encodeURI(msg.cmdData.bigImg)
                                    newMsg.data[0].desc = msg.cmdData.descript
                                    newMsg.data[0].url = msg.cmdData.url
                                    content = '[链接]'
                                    type = '5'
                                    break
                                case '33':
                                    newMsg.data[0].iconurl = 'data:image/jpeg;base64,'+ encodeURI(msg.cmdData.smallImg)
                                    newMsg.data[0].alias = msg.cmdData.sourceDisplayName
                                    newMsg.data[0].title = msg.cmdData.title
                                    newMsg.data[0].mediapath = 'data:image/jpeg;base64,'+ encodeURI(msg.cmdData.smallImg)
                                    content = '[小程序]'
                                    type = '33'
                                    break
                                case '34':
                                    content = '[语音]'
                                    newMsg.data[0].mediapath = msg.cmdData.url
                                    newMsg.data[0].audio_time = msg.cmdData.title
                                    type = '34'
                                    break
                                case '42':
                                    newMsg.data[0].title = msg.cmdData.friendCard.nickname
                                    newMsg.data[0].mediapath = 'data:image/jpeg;base64,'+ encodeURI(msg.cmdData.friendCard.headImage)
                                    newMsg.data[0].appid = msg.cmdData.friendCard.username
                                    newMsg.data[0].certFlag = msg.cmdData.friendCard.certFlag
                                    content = '[名片]'
                                    type = '42'
                                    break
                                case '47':
                                    content = '[表情包]'
                                    type = '47'
                                    break
                                case '48':
                                    newMsg.data[0].title = msg.cmdData.redPacket.receiverTitle
                                    newMsg.data[0].chatRedPacket = {
                                        inner_type:'0',
                                        native_url:msg.cmdData.redPacket.nativeUrl
                                    }
                                    content = '[红包]'
                                    type = '48'
                                    _this.$set(_this.$store.state.liveChat.selectContact,'red_packet',1)
                                    break
                                case '49':
                                    content = msg.cmdData.transferMoney.feeDesc
                                    type = '49'
                                    newMsg.data[0].content = msg.cmdData.transferMoney.feeDesc
                                    newMsg.data[0].chatTransferMoney = {
                                        pay_sub_type:'1',
                                        transc_ation_id:msg.cmdData.transferMoney.transcAtionId,
                                        transfer_id:msg.cmdData.transferMoney.transferId,
                                        invalid_time:msg.cmdData.transferMoney.invalidTime,
                                        type:'0'
                                    }
                                    _this.$set(_this.$store.state.liveChat.selectContact,'transfer_money',1)
                                    break
                            }
                            _this.$set(_this.$store.state.liveChat.selectContact,'content',content)
                            _this.$set(_this.$store.state.liveChat.selectContact,'type',type)
//                            _this.$store.state.liveChat.selectContact.content = content
                            _this.$store.state.liveChat.selectContact.created = datetime.slice(10)
//                            _this.$store.state.liveChat.selectContact.num = parseInt(_this.$store.state.liveChat.selectContact.num) + 1
                            _this.$store.commit('liveChat/insertContactList',_this.$store.state.liveChat.selectContact)
                            if(msg.cmdData.msgSvrId=='1') {
                                newMsg.data[0].send_by = '1'
                                newMsg.data[0].robot_avatar_url = _this.$store.state.liveChat.selectContact.robot_avatar_url
                            }
                            if(!!msg.cmdData.transferMoney&&(msg.cmdData.transferMoney.paySubType =='3'||msg.cmdData.transferMoney.paySubType =='5')) {
                                newMsg.data[0].chatTransferMoney.pay_sub_type = '2'
                                newMsg.data[0].chatTransferMoney.type = '1'
                                let newMsg1 = JSON.parse(JSON.stringify(newMsg))
                                newMsg1.data[0].send_by = '1'
                                newMsg1.data[0].chatTransferMoney.pay_sub_type = '2'
                                newMsg1.data[0].chatTransferMoney.type = '1'
                                _this.$store.commit('liveChat/insertChatMsgList',newMsg1)
                            }
                            _this.$store.commit('liveChat/insertChatMsgList',newMsg)
                            setTimeout(()=>{
                                document.getElementById('contactList').scrollTop = 0
                                document.getElementById('chatContent').scrollTop = document.getElementById('chatContent').scrollHeight - document.getElementById('chatContent').offsetHeight
                            },0)
                        } else {
                            let flag =false
                            _this.$store.state.liveChat.contactList.forEach(el=>{
                                if((el.friend_user_name==msg.cmdData.fromUsername&&el.robot_username==msg.cmdData.toUsername)||(el.robot_username==msg.cmdData.fromUsername&&el.friend_user_name==msg.cmdData.toUsername)) {
                                    flag = true
                                    let content = ''
                                    let type = '1'
                                    switch (msg.cmdData.type) {
                                        case '1':
                                            content = emoji.stringToHtml(msg.cmdData.content)
                                            break
                                        case '3':
                                            type = '3'
                                            content = '[图片]'
                                            break
                                        case '5':
                                            content = '[链接]'
                                            type = '5'
                                            break
                                        case '33':
                                            content = '[小程序]'
                                            type = '33'
                                            break
                                        case '34':
                                            content = '[语音]'
                                            type = '34'
                                            break
                                        case '42':
                                            break
                                        case '47':
                                            content = '[表情包]'
                                            type = '47'
                                            break
                                        case '48':
                                            content = '[红包]'
                                            type = '48'
                                            el.red_packet = 1
                                            break
                                        case '49':
                                            content = msg.cmdData.transferMoney.feeDesc
                                            type = '49'
                                            el.transfer_money = 1
                                            break
                                    }
                                    el.content = content
                                    el.type = type
                                    el.created = datetime.slice(10)
                                    if((el.robot_username==msg.cmdData.fromUsername&&el.friend_user_name==msg.cmdData.toUsername&&(msg.cmdData.msgSvrId=='0'||msg.cmdData.msgSvrId=='1'))) {

                                    } else {
                                        el.num = parseInt(el.num) + 1
                                        _this.$store.commit('user/addMenuBadge', {name:'实时聊天',badge:1})
                                        _this.$store.commit('liveChat/insertContactList',el)
                                    }
                                }
                            })
                            if(!flag) {
                                //利用接口去请求联系人信息
                                if(msg.cmdData.fromUsername == _this.$store.state.liveChat.selectContact.robot_username) {
                                    return
                                }
                                _this.$axios({
                                    method: 'POST',
                                    url: '/index.php?r=uc/communication/talk-now',
                                    data:{username:msg.cmdData.toUsername,friend_username:msg.cmdData.fromUsername,department_id:_this.$store.state.user.user.department.id}
                                }).then(res=>{
                                    let udata = res.data
                                    if (udata.status == 1) {
                                        if(!!udata.data) {
                                            !!udata.data.content&&(udata.data.content = emoji.stringToHtml(udata.data.content));
                                            udata.data.num = parseInt(udata.data.num) + 1
                                            _this.$store.commit('user/addMenuBadge', {name:'实时聊天',badge:1})
                                            _this.$store.commit('liveChat/insertContactList',udata.data);
                                        }
                                    }
                                })
                            }
                        }
                    }
                } else {
                    _this.$axios({
                        method: 'POST',
                        url: '/index.php?r=uc/communication/talk-now',
                        data:{username:msg.cmdData.toUsername,friend_username:msg.cmdData.fromUsername,department_id:_this.$store.state.user.user.department.id}
                    }).then(res=>{
                        let udata = res.data
                        if (udata.status == 1) {
                            if(!!udata.data) {
                                _this.$store.commit('user/addMenuBadge', {name:'实时聊天',badge:1})
                            }
                        }
                    })
                }
            }
        }
    }
}
</script>

