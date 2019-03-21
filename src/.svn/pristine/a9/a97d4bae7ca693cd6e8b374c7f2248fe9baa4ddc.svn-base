<style lang="less">
    .search-input {
        background: rgb(230,229,229);
        height: 60px;
        line-height: 60px;
        padding: 0 10px;
        .anticon-close-circle {
            cursor: pointer;
            color: #ccc;
            transition: color 0.3s;
        }
        .anticon-search {
            svg {
                font-size: 15px;
                color: #999999;
            }
        }
        .ant-input-affix-wrapper {
            width: calc(~"100% - 60px");
            display: inline-block;
            .ant-input {
                outline: none;
                box-shadow: none;
                border: none;
                background: rgb(230,229,229);
                padding-left: 50px;
            }
            .ant-input:focus {
                outline: none;
                box-shadow: none;
                border: none;
                /*background: rgb(230,229,229);*/
                background: #fff;
            }
        }
        .search-btn {
            width: 50px;
            display: inline-block;
            color: rgb(73,101,130);
            text-align: center;
            font-size: 16px;
            cursor: pointer;
        }

    }
    .contact-list {
        background: rgb(230,229,229);
        height: calc(~"100% - 60px");
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar-track-piece{width:0px;height: 0px;background-color:#e6e5e5 ;  }
        &::-webkit-scrollbar{width:0px;height:0px ; }
        &::-webkit-scrollbar-thumb{height:30px;width: 30px;background:#cdcdcd;   cursor:pointer;}
        &::-webkit-scrollbar-thumb:hover{background:#cdcdcd ; cursor:pointer}
        >div {
            overflow-x: hidden;
        }
        &:hover {
            &::-webkit-scrollbar-track-piece{width:6px;height: 6px;}
            &::-webkit-scrollbar{width:6px;height:6px ; }
            >div {
                overflow-x: hidden;
                width: calc(~"100% + 6px");
            }
        }
    }
    .chat-header {
        background: #f5f5f5;
        height: 60px;
        line-height: 60px;
        padding: 0 10px;
        border-bottom: 1px solid #d9d9d9;
        text-align: center;
        color: rgb(16,16,16);
        position: relative;
        .jump-btn {
            position: absolute;
            right: 20px;
            bottom: -50px;
            z-index: 10;
        }
    }
    .chat-content {
        height: calc(~"100% - 260px");
        padding: 10px 20px;
        overflow-y: auto;
        &::-webkit-scrollbar-track-piece{width:6px;height: 6px;background-color:#e6e5e5 ;  }

        &::-webkit-scrollbar{width:6px;height:6px ; }

        &::-webkit-scrollbar-thumb{height:30px;width: 30px;background:#cdcdcd;   cursor:pointer;}

        &::-webkit-scrollbar-thumb:hover{background:#cdcdcd ; cursor:pointer}
    }
    .bg-f {
        background: #ffffff;
    }
    .input-content {
        height: 200px;
        padding: 10px;
        border-top:1px solid #d9d9d9;
        &:hover {
            background: #ffffff;
        }
        .tools {
            display: flex;
            >div {
                padding: 0 10px;
                cursor: pointer;
                .anticon svg {
                    font-size: 20px;
                    color: #a8a7a7;
                }
                #emoji {
                    position: absolute;
                    top: -160px;
                    width:390px;
                    height: 155px;
                    left:0;
                    border: 1px solid #cccccc;
                    padding: 5px;
                    z-index: 10;
                    line-height: 1;
                    background: #ffffff;
                    &::after {
                        margin-top: -1px;
                        border: 7px solid transparent;
                        border-top-color: #fff;
                        content: "";
                        position: absolute;
                        left: 16px;
                        top: 100%;
                        margin-left: -5px;
                    }
                }
            }
        }
        .input-content-area {
            word-wrap: break-word;
            white-space : normal;
            .send-action {
                text-align: right;
                margin-top: 5px;
                .desc {
                    color: #888;
                    font-size: 14px;
                    margin-left: 10px;
                    margin-right: 7px;
                }
                .btn_send {
                    background: #c2c0bf;
                    border-color: #c2c0bf;
                    padding: 0 25px;
                    &:hover {
                        background: #1890ff;
                        border-color: #1890ff;
                    }
                }
                .bg-b {
                    background: #1890ff;
                    border-color: #1890ff;
                }
            }
        }
    }
    .right-header {
        background: #ffffff;
        height: 60px;
        padding: 0 10px;
        /*border-bottom: 1px solid #c2c2c2;*/
        text-align: center;
        font-size: 16px;
        .ant-tabs-bar {
            margin: 0;
            height: 60px;
            border-bottom-color: #c2c2c2;
            .ant-tabs-tab {
                margin: 0;
                line-height: 36px;
            }
        }

    }
    .right-content {
        height: calc(~"100% - 60px");
        overflow-y: auto;
        background: #ffffff;
        .contact-info {
            .info {
                padding: 10px;
                .ant-form-item {
                    margin-bottom: 0;
                    .btn-save {
                        background: #c2c0bf;
                        border-color: #c2c0bf;
                        padding: 0 25px;
                        &:hover {
                            background: #1890ff;
                            border-color: #1890ff;
                        }
                    }
                }
            }
            .labels {
                padding: 10px;
                color: rgb(16,16,16);
                .ant-tag:hover {
                    background: #1890ff;
                    color: #ffffff;
                    opacity: 1;
                }
            }
        }
        .material-info {
            margin-right: 10px;
            padding: 10px;
            background: #f0f2f5;
            min-height: 100%;
            .anticon-close-circle {
                cursor: pointer;
                color: #ccc;
                transition: color 0.3s;
            }
            .anticon-search {
                cursor: pointer;
                svg {
                    font-size: 25px;
                }
            }
            .ant-input-affix-wrapper {
                display: inline-block;
                .ant-input {
                    outline: none;
                    box-shadow: none;
                    border: none;
                    background: #ffffff;
                    padding-left: 50px;
                }
                .ant-input:focus {
                    outline: none;
                    box-shadow: none;
                    border: none;
                    background: #fff;
                }
            }
            .material-list {

            }
        }
        .chat-info {
            background: #f0f2f5;
            margin-right: 10px;
            padding: 10px;
            min-height: 100%;
        }
        .buy-info {
            background: #f0f2f5;
            margin-right: 10px;
            padding: 10px;
            min-height: 100%;
        }
    }
    .tag-modal {
        .ant-tag-checkable{
            border: 1px solid #d9d9d9;
            background: #fafafa;
        }
        .ant-tag-checkable-checked {
            background: #1890ff;
        }
    }
</style>

<template>
    <div>
        <div style="display: flex;height: calc(100vh - 116px)">
            <!--<div style="min-width: 300px;width: 20%">-->
            <div style="width: 300px">
                <!--顶部搜索框-->
                <div class="search-input">
                    <a-input placeholder="输入搜索内容" v-model="searchKey" ref="searchKey" @keyup.enter="searchContact(true)">
                        <a-icon slot="prefix" type="search" :style="{ fontSize: '32px',fontWeight:'700',color:'#000' }"/>
                        <a-icon v-if="searchKey" slot="suffix" type="close-circle" style="color: #000000" @click="emitEmpty" />
                    </a-input>
                    <span class="search-btn" @click="searchContact(false)">{{searchStatus?'清除':'搜索'}}</span>
                </div>
                <!--联系人列表-->
                <div class="contact-list" ref="contactList" id="contactList">
                    <contact-item v-for="(item,index) in contactList" :key="index" :contact="item" @select="onSelect" :searchKey="searchKey" ref="contactItem"></contact-item>
                </div>
            </div>
            <div style="flex-grow:1;max-width: 900px">
                <div class="chat-header">
                    {{selectContact.nickname}}
                    <div class="jump-btn" v-if="searchStatus&&searchChatList.length>0">
                        <a-button type="primary" size="small" @click="jumpPosition('previous')">
                            <a-icon type="up" />
                            上一条
                        </a-button>
                        <a-button type="primary" size="small" @click="jumpPosition('next')">
                            <a-icon type="down" />
                            下一条
                        </a-button>
                    </div>
                </div>
                <!--聊天框-->
                <div class="chat-content" ref="chatContent" id="chatContent">
                    <div v-if="!searchStatus">
                        <chat-msg-item v-for="(item,index) in chatMsgList" :key="index" :chatMsg="item" :chatIndex="index">

                        </chat-msg-item>
                    </div>
                    <div v-if="searchStatus">
                        <chat-msg-item v-for="(item,index) in searchChatList" :key="index" :chatMsg="item" :chatIndex="index">

                        </chat-msg-item>
                    </div>

                </div>
                <!--输入框-->
                <div class="input-content" :class="[focus_blur?'bg-f':'']">
                    <div class="tools">
                        <div style="position: relative">
                            <a-icon type="smile" @click="showEmoji()" id="showEmoji"/>
                            <div v-if="emojiFlag" id="emoji">
                                <a href="javascript:;" v-for="(item,index) in emojiList" v-bind:class="item.className" class="qqemoji" :title_name="item.title" @click="emojiAdd($event);" style="cursor: pointer"></a>
                            </div>
                        </div>
                        <!--<div>-->
                            <!--<a-icon type="audio"/>-->
                        <!--</div>-->
                        <div>
                            <a-upload name="file" action="/index.php?r=uc/user/upload"  @change="handleChange" :beforeUpload="beforeUpload" accept='image/jpg,image/jpeg,image/png' :showUploadList="false" :headers="headers">
                                <a-icon type="picture" />
                            </a-upload>
                        </div>
                        <!--<div>-->
                            <!--<a-tooltip placement="bottomLeft" >-->
                                <!--<template slot="title">-->
                                    <!--<span>截图</span>-->
                                <!--</template>-->
                                <!--<a-icon type="scissor" style="transform:rotate(-90deg)"/>-->
                            <!--</a-tooltip>-->
                        <!--</div>-->
                    </div>
                    <div class="input-content-area">
                        <div-edit-area id="text_area" :formItem="sendObj" ref="div_edit" @change="editContentFB">

                        </div-edit-area>
                        <div class="send-action">
                            <span  class="desc ng-scope">按下Shift+Enter换行</span>
                            <a-button  :class="[sendObj.text!=''?'bg-b':'','btn_send']" type="primary" @click="sendMsg()">发送</a-button>
                        </div>
                    </div>
                </div>
            </div>
            <!--<div style="border-left: 1px solid #dcdcdc;min-width: 300px;width: 25%" >-->
            <div style="border-left: 1px solid #dcdcdc;min-width: 300px;width: 25%" >
                <div class="right-header">
                    <a-tabs :activeKey="rightKey"  @change="tabChange">
                        <a-tab-pane tab="个人信息" key="1"></a-tab-pane>
                        <a-tab-pane tab="快捷回复" key="2"></a-tab-pane>
                        <a-tab-pane tab="聊天记录" key="3"></a-tab-pane>
                        <a-tab-pane tab="购买记录" key="4"></a-tab-pane>
                    </a-tabs>
                </div>
                <div class="right-content" ref="chatHistoryContent">
                    <div v-if="rightKey==1" class="contact-info">
                        <div class="info">
                            <a-form @submit="handleSubmit">
                                <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }" label='昵称'>
                                    <a-input :disabled="true" v-model="contactInfo.nickname" />
                                </a-form-item>
                                <a-form-item  :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }" label='姓名'>
                                    <a-input  v-model="contactInfo.real_name" />
                                </a-form-item>
                                <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }" label='电话'>
                                    <a-input  v-model="contactInfo.tel" />
                                </a-form-item>
                                <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }" label='地址'>
                                    <a-input  v-model="contactInfo.address" />
                                </a-form-item>
                                <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }" label='来源'>
                                    <a-input :disabled="true" v-model="contactInfo.friend_from" />
                                </a-form-item>
                                <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }" label='备注'>
                                    <a-textarea :rows="4" v-model="contactInfo.desc" />
                                </a-form-item>
                                <a-form-item style="text-align: center;margin-top: 15px">
                                    <a-button class="btn-save" type='primary' htmlType='submit'>保存</a-button>
                                </a-form-item>
                            </a-form>
                        </div>
                        <div style="height:15px;background: #f0f2f5"></div>
                        <div class="labels">
                            <div>
                                用户标签
                            </div>
                            <div style="margin-top: 20px">
                                <a-tag @click="contactAddTag()"><a-icon type="plus" style="margin-right: 2px"/>选择标签</a-tag>
                                <!--<a-tag v-for="(item,index) in contactLabel" :closable="true" :key="item.id"  @close="closeTag($event,item,index)" v-model="item.showFlag" style="margin-bottom: 10px">-->
                                <a-tag v-for="(item,index) in contactLabel" :key="item.id" style="margin-bottom: 10px">
                                    {{item.label_name}}
                                </a-tag>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="rightKey==2" class="material-info">
                        <a-input placeholder="输入搜索内容,搜索快捷回复素材" v-model="searchMaterialKey" ref="searchMaterialKey" @keyup.enter="getFastReply(true)">
                            <a-icon slot="prefix" type="search" @click="getFastReply()" />
                            <a-icon v-if="searchMaterialKey" slot="suffix" type="close-circle" style="color: #000000" @click="emitMaterialEmpty" />
                        </a-input>
                        <div class="material-list">
                            <view-material v-for="(item,index) in fastReply"  :key="item.id" :dataItem="item" usedType="1" @click="sendMaterial(item)"></view-material>
                        </div>
                    </div>
                    <div v-else-if="rightKey==4" class="buy-info">
                        <buy-record-item v-for="(item,index) in buyHistory" :key="item.id" :recordItem="item">

                        </buy-record-item>
                    </div>
                    <div v-show="rightKey==3" class="chat-info">
                        <chat-msg-item v-for="(item,index) in chatHistory" :key="index" :chatMsg="item" style_type="1">

                        </chat-msg-item>
                    </div>
                </div>
            </div>
        </div>
        <!--发送图片-->
        <a-modal
                title="发送图片"
                cancelText="取消"
                okText="确定"
                :visible="sendImgFlag"
                @ok="handleOk"
                :confirmLoading="confirmLoading"
                @cancel="handleCancel"
        >
            <div  style="text-align: center">
                <img :src="sendObj.img_url" alt="" style="max-width: 300px;max-height: 450px">
            </div>
        </a-modal>
        <!--添加标签-->
        <a-modal
                title="选择标签"
                cancelText="取消"
                okText="确定"
                :visible="selectTagFlag"
                @ok="handleTagOk"
                @cancel="selectTagFlag=false"
                :confirmLoading="confirmLoading"
        >
            <div class="tag-modal">
                <a-checkable-tag v-for="(item,index) in allLabel"  :key="item.id" :checked="item.check" @change="(checked) => handleTagChange(item,index, checked)">
                    {{item.title}}
                </a-checkable-tag>
            </div>
        </a-modal>
    </div>
</template>
<script>
    import contactItem from '../../components/customerChat/contactItem'
    import chatMsgItem from '../../components/customerChat/chatMsgItem'
    import divEditArea from '../../components/customerChat/divEditArea'
    import viewMaterial from'../../components/customerChat/viewMaterial'
    import buyRecordItem from '../../components/customerChat/buyRecordItem'
    import { concatMsgArr } from '@/common/util'
    var emoji = require('../../common/emojiMap');
    var storage = require('../../common/store')
    export default {
        name: "",
        components: {contactItem,chatMsgItem,divEditArea,viewMaterial,buyRecordItem}
        ,data(){
            return{
                id:this.$route.query.id,
                searchKey:'',
                searchDataList:[],
                rightKey:'1',
                emojiList:emoji.emojiList,
                sendObj:{
                    text:'',
                    img_url:''
                },
                headers:{
                    Authorization: storage.store.get('token')
                },
                range:null,
                sel:null,
                sendImgFlag:false,
                confirmLoading:false,
                contactInfo:{},
                contactLabel:[],
                allLabel:[],//当前部门所有标签
                selectTagFlag:false,
                fastReply:[],
                chatHistory:[],
                buyHistory:[],
                searchMaterialKey:'',
                contactLastId:0,
                chatMsgLastId:0,
                focus_blur:false,
                contactScrollFlag:false,  //联系人滚动加载控制
                chatMsgScrollFlag:false,  //对话框滚动加载控制
                chatHistoryScrollFlag:false,//聊天记录滚动加载控制
                chatHistoryLastId:0,
                searchChatList:[],//搜索模式下获得的数据
                searchKeyNum:1,//搜索是上一条，下一条，初始值为1
            }
        }
        ,computed: {
            contactList () {
                return this.$store.state.liveChat.contactList
            },
            selectContact () {
                return this.$store.state.liveChat.selectContact
            },
            chatMsgList () {
                return this.$store.state.liveChat.chatMsgList
            },
            emojiFlag () {
                return this.$store.state.liveChat.emojiFlag
            },
            searchStatus() {
                return this.$store.state.liveChat.searchStatus
            }
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
            this.$refs.contactList.addEventListener('scroll', () => {
                console.log(this.contactScrollFlag)
                if((this.$refs.contactList.scrollHeight - this.$refs.contactList.offsetHeight - this.$refs.contactList.scrollTop)< 50 && !this.contactScrollFlag ) {
                    this.getContactList(false)
                }
            }, false)
            this.$refs.chatContent.addEventListener('scroll', () => {
                if(this.$refs.chatContent.scrollTop== 0 && !this.chatMsgScrollFlag ) {
                    !this.searchStatus&&this.getChatList(false,true)
                    this.searchStatus&&this.getSearchChatList(false,0)
                } else if((this.$refs.chatContent.scrollHeight - this.$refs.chatContent.offsetHeight - this.$refs.chatContent.scrollTop)< 50 && !this.chatMsgScrollFlag && this.searchStatus){
                    this.getSearchChatList(false,1)
                }
            }, false)
            this.$refs.chatHistoryContent.addEventListener('scroll', () => {
                if(this.$refs.chatHistoryContent.scrollTop== 0 && !this.chatHistoryScrollFlag ) {
                    this.getChatHistory(false,true)
                }
            }, false)
            this.globalClick(this.closeEmoji);
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        methods:{
            emitEmpty() {
                if(this.searchStatus) {
                    this.searchContact(false)
                } else {
                    this.searchKey = ''
                    this.$refs.searchKey.focus()
                }
            },
            tabChange(key) {
                this.rightKey = key
                switch (this.rightKey) {
                    case '1':
                        break
                    case '2':
                        this.getFastReply()
                        break
                    case '3':
                        this.chatHistoryScrollFlag = false
                        this.getChatHistory(true)
                        break
                    case '4':
                        this.getBuyHistory()
                        break
                }
            },
            searchContact(bool) {
//                回车
                if(this.searchKey=='') {
                    this.$message.warning('关键字不能为空')
                    return
                }
                if(bool&&!this.searchStatus) {
                    this.$store.commit('liveChat/setSearchStatus',!this.searchStatus)
                }
//                按钮
                if(!bool) {
                    if(this.searchStatus) {
                        this.searchKey=''
                    }
                    this.$store.commit('liveChat/setSearchStatus',!this.searchStatus)
                }
                this.contactLastId = 0;
                this.contactScrollFlag = false
                this.getContactList(true,true)
            },
            onSelect(contact,bool) {
                this.$store.commit('user/reduceMenuBadge', {name:'实时聊天',badge:parseInt(contact.num)})
                if(!bool&&(contact.friend_user_name==this.selectContact.friend_user_name)&&(contact.robot_username==this.selectContact.robot_username)) {
                    return
                }
                this.rightKey = '1'
                this.$store.commit('liveChat/setSelectContact',contact)
                this.$store.commit('liveChat/clearChatMsgList')
                contact.num = 0;
                this.chatMsgLastId = 0
                this.chatMsgScrollFlag = false
                this.searchKeyNum = 1
                this.getContactInfo()
                !this.searchStatus&&this.getChatList(true)
                this.searchStatus&&this.getSearchChatList(true)
                if(this.rightKey==3) {
                    this.chatHistoryScrollFlag = false
                    this.getChatHistory(true)
                }
            },
            getContactList(bool,is_init) {
                if(this.contactScrollFlag) {
                    return
                }
                this.contactScrollFlag = true
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/talk',
                    data:{
                        searchKey:this.searchStatus?this.searchKey:'',
                        department_id:this.$store.state.user.user.department.id,
                        last_id:bool?0:this.contactLastId
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        if(!!this.id&&!!is_init) {
                            this.getContctById(this.id)
                        }
                        if(udata.data.contact_list.length == 0) {
                            let text = bool?'未搜索到相关内容':'已加载完毕，无更多数据'
                            this.$message.warning(text)
                            if(bool) {
                                this.searchChatList=[]
                                this.$store.commit('liveChat/clearContactList')
                            }
                            return
                        }
                        if(this.searchStatus&&this.searchKey!='') {
                            udata.data.contact_list.forEach(el=>{
                                if(el.type==1) {
                                    let reg1 = new RegExp(this.searchKey,'g');
                                    let str = "<span style='color:rgb(43, 177, 70)'>"+ this.searchKey +"</span>"
                                    el.content = el.content.replace(reg1,str)
                                }
                            })
                        }
                        setTimeout(()=>{
                            this.contactScrollFlag = false
                        },2000)
                        this.contactLastId = udata.data.last_id
                        bool&&this.$store.commit('liveChat/setContactList',udata.data.contact_list)
                        !bool&&this.$store.commit('liveChat/addContactList',udata.data.contact_list)
                        bool&&udata.data.contact_list.length>0&&!this.id&&!!is_init&&this.onSelect(udata.data.contact_list[0],bool)
                    }
                });
            },
            getChatList(bool,is_scroll) {
                if(this.chatMsgScrollFlag) {
                    return
                }
                this.chatMsgScrollFlag = true
                let data = {}
                if(this.selectContact.chat_type == 20) {
                    data = {
                        id:this.selectContact.id,
                        last_id:bool?'':this.chatMsgLastId,
                        chat_type:20,
                        room_name:this.selectContact.friend_user_name,
                    }
                } else {
                    data = {
                        id:this.selectContact.id,
                        last_id:bool?'':this.chatMsgLastId
                    }
                }
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/talk-content',
                    data:data
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        if(udata.data.msg_list.length == 0) {
                            this.$message.warning('已加载完毕，无更多数据')
                            return
                        }
                        this.chatMsgLastId = udata.data.last_id
                        let scroll_top =  this.$refs.chatContent.scrollHeight  //存储未添加数据前滚动条的高度
                        bool&&this.$store.commit('liveChat/setChatMsgList',udata.data.msg_list)
                        !bool&&this.$store.commit('liveChat/addChatMsgList',udata.data.msg_list)
                        setTimeout(()=>{
                            if(!is_scroll) {
                                this.$refs.chatContent.scrollTop < (this.$refs.chatContent.scrollHeight - this.$refs.chatContent.offsetHeight)
                                &&(this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight - this.$refs.chatContent.offsetHeight)
                            } else {
                                this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight - scroll_top
                            }
                            this.chatMsgScrollFlag = false
                        },0)
                    }
                });
            },
            getSearchChatList(bool,type,is_add) {
                if(this.chatMsgScrollFlag) {
                    return
                }
                this.chatMsgScrollFlag = true
                let data = {
                    id:this.selectContact.id,
                    last_id:bool?'':this.chatMsgLastId,
                }
                if(type==1) {
                    data.type= type  //下滚1
                    let num = 0
                    this.searchChatList.forEach(el=>{
                        el.data.forEach(item=>{
                            num++
                        })
                    })
                    data.num = num
                }
                if(bool) {
                    data.searchKey = this.searchKey
                    data.searchKeyNum = this.searchKeyNum
                }
                if(this.selectContact.chat_type == 20) {
                    data.chat_type = 20;
                    data.room_name = this.selectContact.friend_user_name
                }
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/talk-content',
                    data:data
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        if(udata.data.msg_list.length == 0) {
                            this.$message.warning('已加载完毕，无更多数据')
                            this.chatMsgScrollFlag = false
                            is_add==1?this.searchKeyNum-= 1:is_add==0?this.searchKeyNum+= 1:''
                            return
                        }

                        if(this.searchStatus&&this.searchKey!='') {
                            udata.data.msg_list.forEach(el=>{
                                el.data.forEach(item=>{
                                    if(item.type==1&&item.send_by=='0') {
                                        let reg1 = new RegExp(this.searchKey,'g');
                                        let str = "<span style='color:rgb(43, 177, 70)'>"+ this.searchKey +"</span>"
                                        reg1.test(item.content)&&(item.flag = true)
                                        item.content = item.content.replace(reg1,str)
                                    }
                                })
                            })
                        }
                        type==0&&(this.chatMsgLastId = udata.data.last_id)
                        bool&&(this.searchChatList = udata.data.msg_list)
                        !bool&&type==0&&(this.searchChatList = concatMsgArr(udata.data.msg_list,this.searchChatList))
                        !bool&&type==1&&(this.searchChatList = concatMsgArr(this.searchChatList,udata.data.msg_list))
//                        setTimeout(()=>{
//                            this.$refs.chatContent.scrollTop < (this.$refs.chatContent.scrollHeight - this.$refs.chatContent.offsetHeight)
//                            &&(this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight - this.$refs.chatContent.offsetHeight)
                            this.chatMsgScrollFlag = false
//                        },0)
                    }
                });
            },
            showEmoji(){
                this.$store.commit('liveChat/setEmojiFlag',!this.emojiFlag)
            },
            closeEmoji() {
                this.$store.commit('liveChat/setEmojiFlag',false)
            },
            emojiAdd(e) {
                document.getElementById('text_area').focus()
                let html = "<img src='static/img_file/emojiBG.png' class= '" + e.currentTarget.classList.value + "' title_name='"+ e.currentTarget.attributes.title_name.nodeValue+"'>"
                this.emojiAddInPosition(html)
                this.$refs.div_edit.changeTxt()
            },
            emojiAddInPosition(html,t) {
                let sel, range;
                if (t||this.getRange(),window.getSelection) {
                    !t && this.range ? (sel = this.sel, range = this.range) : (sel = window.getSelection(), range = sel.getRangeAt(0)),range.deleteContents();
                    sel = window.getSelection();//返回一个Selection对象，用来表示用户选择的文本范围或插入符当前位置。
                    let frag,node, lastNode;
                    if(range.createContextualFragment) {
                        frag = range.createContextualFragment(html)
                    } else {
                        let el = document.createElement("div");
                        el.innerHTML = html;
                        frag = document.createDocumentFragment()
                        while ((node = el.firstChild)) {
                            lastNode = frag.appendChild(node);
                        }
                    }
                    let ran = frag.lastChild;
                    range.insertNode(frag);
                    range.setStartAfter(ran);//重新定位range（光标位置）
                    sel.removeAllRanges();//清除所有选中
                    sel.addRange(range);//将新定位的range加入
                    let x = document.getElementById('text_area')
                    let l = ran.offsetTop - 55 + ran.offsetHeight - x.offsetHeight;
                    x.scrollTop < l && (x.scrollTop = l)
                } else if (document.selection && document.selection.type != "Control") {
                    // IE < 9
                    document.selection.createRange().pasteHTML(html);
                }
            },
            getSel() {
                window.getSelection ? (this.sel = window.getSelection(), this.range = this.sel.getRangeAt(0)) : this.range = document.selection.createRange()
            },
            getRange() {
                this.range ? window.getSelection ? (this.sel.removeAllRanges(), this.sel.addRange(this.range)) : this.range.select() : this.setRange()
            },
            setRange() {
                let e, t;
                let x = document.getElementById('text_area')
                document.createRange ? (e = document.createRange(), e.selectNodeContents(x), e.collapse(!1), t = window.getSelection(), t.removeAllRanges(), t.addRange(e)) : document.selection && (e = document.body.createTextRange(), e.moveToElementText(x), e.collapse(!1), e.select())
            },
            sendMsg() {
//                这里只发送文字，图片不插入到输入框中，不然比较麻烦
                let _this =this
                if(this.searchStatus) {
                    this.quitSearch()
                    return
                }
                if(this.sendObj.text.replace(/<br\/?>/g, "").match(/^\s*$/)) {
                    this.$message.warning('不能发送空白消息')
                    return
                }
                let data = {
                    cmd:2003,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.selectContact.robot_username,
                    cmdData:{
                        toUser:this.selectContact.friend_user_name,
                        content:emoji.htmlToString(this.sendObj.text)
                    }
                }
                if(this.$ws.ws.readyState!='1') {
                    this.$message.warning('socket连接已断开，请尝试刷新页面重新连接')
                    return
                }
                this.$ws.sendMsgFun(data)
//                收到2003指令之后,还需要将当前联系人排到第一去，然后在聊天记录插入一句
//                this.$ws.cmd2003=function (wsMsg) {
                    _this.$store.commit('liveChat/insertContactList',_this.selectContact)
                    let timestamp = new Date(+new Date() +8*3600*1000) //go返回的时间戳
//                    let datekey = timestamp.getFullYear()+ '-' + (timestamp.getMonth()+1)+ '-' + timestamp.getDate() //go的时间戳转换
                    let datetime = timestamp.toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
                    let datekey = datetime.slice(0,10)
                    let msg = {
                        key:datekey,
                        data:[{
                            id:_this.selectContact.robot_id,
                            robot_avatar_url:_this.selectContact.robot_avatar_url,
                            nickname:_this.selectContact.robot_nickname,
                            created:datetime,//从go获取
                            content:_this.sendObj.text,
                            type:'1',
                            audio_time:'',
                            send_by:_this.selectContact.robot_id
                        }]
                    }
                    _this.$store.commit('liveChat/insertChatMsgList',msg)
                    _this.$set(_this.selectContact,'type','1')
                    _this.$set(_this.selectContact,'content',_this.sendObj.text)
                    _this.selectContact.created = datetime.substring(11)
                    _this.$set(this.sendObj,'text','')
                    _this.$refs.div_edit.clearContent()
                    setTimeout(()=>{
                        _this.$refs.contactList.scrollTop = 0
                        _this.$refs.chatContent.scrollTop = _this.$refs.chatContent.scrollHeight - _this.$refs.chatContent.offsetHeight
                    },0)
//                }

            },
            pasteImg(imgs) {
                if(this.searchStatus) {
                    this.quitSearch()
                    return
                }
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/user/upload',
                    data:{
                        type:1,
                        img:imgs
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.sendObj.img_url = udata.data.path;
                        this.sendImgFlag = true
                    }
                });
            },
            beforeUpload (file) {
                if(this.searchStatus) {
                    this.quitSearch()
                    return false
                }
                let isIMG = file.type === 'image/jpeg'|| file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isIMG) {
                    this.$message.error('只能上传图片')
                }
                let isLt2M = file.size / 1024 / 1024 < 2
                if (!isLt2M) {
                    this.$message.error('图片大小必须小于2MB!')
                }
                return isIMG && isLt2M
            },
            handleChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    if(info.file.response.status==1) {
                        this.sendImgFlag = true
                        this.sendObj.img_url = info.file.response.data.path;
                    } else {
                        this.$message.warning(info.file.response.msg)
                    }
                } else if (info.file.status === 'error') {
                    this.$message.error(`${info.file.name} file upload failed.`);
                }
            },
            handleOk() {
                let _this = this
//                发送图片
                let data = {
                    cmd:2004,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.selectContact.robot_username,
                    cmdData:{
                        toUser:this.selectContact.friend_user_name,
                        imgpath:[this.sendObj.img_url],
                    }
                }
                if(this.$ws.ws.readyState!='1') {
                    this.$message.warning('socket连接已断开，请尝试刷新页面重新连接')
                    return
                }
                this.$ws.sendMsgFun(data)
//                收到2004指令之后,还需要将当前联系人排到第一去，然后在聊天记录插入一句
//                this.$ws.cmd2004=function (wsMsg) {
                    _this.$store.commit('liveChat/insertContactList',_this.selectContact)
                    let timestamp = new Date(+new Date() +8*3600*1000) //go返回的时间戳
//                    let datekey = timestamp.getFullYear()+ '-' + (timestamp.getMonth()+1)+ '-' + timestamp.getDate() //go的时间戳转换
                    let datetime = timestamp.toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
                    let datekey = datetime.slice(0,10)
                    let msg = {
                        key:datekey,
                        data:[{
                            id:_this.selectContact.robot_id,
                            robot_avatar_url:_this.selectContact.robot_avatar_url,
                            nickname:_this.selectContact.robot_nickname,
                            created:datetime,//从go获取
                            iconurl:_this.sendObj.img_url,
                            bigImg:_this.sendObj.img_url,
                            type:'3',
                            audio_time:'',
                            send_by:_this.selectContact.robot_id
                        }]
                    }
                    _this.$store.commit('liveChat/insertChatMsgList',msg)
                     _this.selectContact.content = '[图片]'
                    _this.selectContact.type = '3'
                     _this.selectContact.created = datetime.substring(11)
                    _this.sendImgFlag = false
                    setTimeout(()=>{
                        _this.$refs.contactList.scrollTop = 0
                        _this.$refs.chatContent.scrollTop = _this.$refs.chatContent.scrollHeight - _this.$refs.chatContent.offsetHeight
                    },0)
//                }
            },
            handleCancel() {
                this.sendImgFlag = false
                this.sendObj.img_url = ''
            },
            /*获取联系人个人信息及标签*/
            getContactInfo() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/firend-msg',
                    data:{
                        id:this.selectContact.id,
                        department_id:this.$store.state.user.user.department.id
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.contactInfo = udata.data.contact.info
                        this.contactLabel = udata.data.contact.label
                        this.contactLabel.forEach(el=>{
                            el.showFlag = true
                        })
                    }
                });
            },
            /*保存联系人个人信息*/
            handleSubmit() {
                if(this.selectContact.chat_type==20) {
                    this.$message.warning('群聊无法保存信息')
                    return
                }
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/firend-msg-save',
                    data:this.contactInfo
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success('保存成功')
                    }
                });
            },
            closeTag(e,item,index) {
                let _this =this;
                e.preventDefault()
                let msg = {
                    cmd:2040,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.selectContact.robot_username,
                    cmdData:{
                        username:this.selectContact.friend_user_name,
                        labels:[item.label_name]
                    }
                }
                this.$ws.sendMsgFun(msg)
                this.$ws.cmd2040 = function () {
                    item.showFlag = false
                    _this.$set(_this.contactLabel,index,item)
                    _this.$message.success('删除成功')
                }
            },
            contactAddTag() {
                if(this.selectContact.chat_type==20) {
                    this.$message.warning('群聊无法打标签')
                    return
                }
                this.getAllCustonerLabel()
                this.selectTagFlag = true
            },
            getAllCustonerLabel() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/material/customer-label',
                    data:{
                        department_id:this.$store.state.user.user.department.id,
                        company:1
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.allLabel = udata.data
                        this.allLabel.forEach(el=>{
                            this.contactLabel.forEach(item=>{
                                if(el.id==item.label_id) {
                                    el.check = true
                                }
                            })
                        })
                    }
                });
            },
            handleTagChange(item,index,checked) {
                item.check = checked
                this.$set(this.allLabel,index,item)
            },
            handleTagOk() {
                let _this = this;
//                let delTag = []
//                let addTag = []
                let selectTag = []
                this.allLabel.forEach(el=>{
                    if(el.check) {
                        selectTag.push(el.id+'_'+el.title)
                    }
                })
//                this.contactLabel.forEach(el=>{
//                    let flag = false;
//                    selectTag.forEach(item=>{
//                        if(el.label_name== item.title) {
//                            flag= true
//                        }
//                    })
//                    !flag&&delTag.push(el.label_name)
//                })
//                selectTag.forEach(item=>{
//                    let flag = false;
//                    this.contactLabel.forEach(el=>{
//                        if(el.label_name== item.title) {
//                            flag= true
//                        }
//                    })
//                    !flag&&addTag.push(item.title)
//                })
                let msg_add = {
                    cmd:2040,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.selectContact.robot_username,
                    cmdData:{
                        username:this.selectContact.friend_user_name,
                        labels:selectTag
                    }
                }
//                let msg_del = {
//                    cmd:2040,
//                    fromClientId:this.$store.state.user.user.user_id,
//                    toClientId:this.selectContact.robot_username,
//                    cmdData:{
//                        username:this.selectContact.friend_user_name,
//                        labels:delTag
//                    }
//                }
//                addTag.length>0&&this.$ws.sendMsgFun(msg_add)
//                delTag.length>0&&this.$ws.sendMsgFun(msg_del)
                this.$ws.sendMsgFun(msg_add)
                this.selectTagFlag=false
                this.$message.success('修改标签成功')
                this.$ws.cmd2040 = function (msg) {
                    _this.getContactInfo()
                }
            },
            emitMaterialEmpty() {
                this.$refs.searchMaterialKey.focus()
                this.searchMaterialKey = ''
                this.getFastReply()
            },
            getFastReply() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/material/material',
                    data:{
                        department_id:this.$store.state.user.user.department.id,
                        ask:1,
                        searchKey:this.searchMaterialKey,
                        type:1
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.fastReply = udata.data.list
                    }
                });
            },
            //发送快捷回复
            sendMaterial(item) {
                let _this =this
                if(this.searchStatus) {
                    this.quitSearch()
                    return
                }
                let data = {
                    cmd:0,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.selectContact.robot_username,
                    cmdData:{}
                }
                switch (item.type) {
                    case '1':
//                        文字
                        data.cmd = 2003
                        data.cmdData = {
                            toUser:this.selectContact.friend_user_name,
                            content:item.content,
                        }
                        break
                    case '2':
//                        图片
                        data.cmd = 2004
                        data.cmdData = {
                            toUser:this.selectContact.friend_user_name,
                            imgpath:[item.mediapath],
                        }
                        break
                    case '3':
//                        链接
                        data.cmd = 2007
                        data.cmdData = {
                            toUser:this.selectContact.friend_user_name,
                            title:item.title,
                            description:item.desc,
                            url:item.url,
                            imgUrl:item.mediapath,
                        }
                        break
                    case '7':
//                        公众号
                        data.cmd = 2006
                        data.cmdData = {
                            toUser:this.selectContact.friend_user_name,
                            primeval:item.orginid,
                            nickname:item.title,
                            alias:item.alias,
                        }
                        break
                    case '8':
//                        小程序
                        data.cmd = 2005
                        data.cmdData = {
                            toUser:this.selectContact.friend_user_name,
                            title:item.title,
                            description:item.desc,
                            url:item.url,
                            primeval:item.orginid,
                            appid:item.appid,
                            smallIconUrl:item.iconurl,
                            imgUrl:item.mediapath
                        }
                        break
                }
                if(this.$ws.ws.readyState!='1') {
                    this.$message.warning('socket连接已断开，请尝试刷新页面重新连接')
                    return
                }
                this.$ws.sendMsgFun(data)
//                插入对应消息
                _this.$store.commit('liveChat/insertContactList',_this.selectContact)
                let timestamp = new Date(+new Date() +8*3600*1000) //go返回的时间戳
                let datetime = timestamp.toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
                let datekey = datetime.slice(0,10)
                let data1 = {
                    id:_this.selectContact.robot_id,
                    robot_avatar_url:_this.selectContact.robot_avatar_url,
                    nickname:_this.selectContact.robot_nickname,
                    created:datetime,//从go获取
                    content:'',
                    type:'',
                    send_by:_this.selectContact.robot_id
                }
                switch (item.type) {
                    case '1':
//                        文字
                        data1.content = item.content
                        data1.type = '1'
                        break
                    case '2':
//                        图片
                        data1.iconurl = item.mediapath
                        data1.bigImg = item.mediapath
                        data1.type = '3'
                        break
                    case '3':
//                        链接
                        data1.type = '5'
                        data1.title=item.title
                        data1.url =item.url
                        data1.desc=item.desc
                        data1.mediapath = item.mediapath
                        break
                    case '7':
//                        公众号
                        data1.type = '42'
                        data1.title=item.title
                        data1.appid=item.orginid
                        data1.certFlag = '24'
                        break
                    case '8':
//                        小程序
                        data1.type = '33'
                        data1.iconurl = item.iconurl
                        data1.alias = item.title
                        data1.title = item.desc
                        data1.mediapath = item.mediapath
                        break
                }
                let msg = {
                    key:datekey,
                    data:[data1]
                }
                _this.$store.commit('liveChat/insertChatMsgList',msg)
                _this.$set(_this.selectContact,'content',item.content)
                _this.$set(_this.selectContact,'type',data1.type)
                _this.selectContact.created = datetime.substring(11)
                setTimeout(()=>{
                    _this.$refs.contactList.scrollTop = 0
                    _this.$refs.chatContent.scrollTop = _this.$refs.chatContent.scrollHeight - _this.$refs.chatContent.offsetHeight
                },0)
            },
            getChatHistory(bool,is_scroll) {
                if(this.chatHistoryScrollFlag) {
                    return
                }
                this.chatHistoryScrollFlag = true
                let data = {}
                if(this.selectContact.chat_type == 20) {
                    data = {
                        id:this.selectContact.id,
                        last_id:bool?'':this.chatHistoryLastId,
                        chat_type:20,
                        room_name:this.selectContact.friend_user_name,
                    }
                } else {
                    data = {
                        id:this.selectContact.id,
                        last_id:bool?'':this.chatHistoryLastId
                    }
                }
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/talk-content',
                    data:data
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        if(udata.data.msg_list.length == 0) {
                            this.$message.warning('已加载完毕，无更多数据')
                            return
                        }
                        this.chatHistoryLastId = udata.data.last_id
                        bool&&(this.chatHistory = udata.data.msg_list)

                        !bool&&(this.chatHistory = concatMsgArr(udata.data.msg_list,this.chatHistory))
                        let scroll_top = this.$refs.chatHistoryContent.scrollHeight
                        setTimeout(()=>{
                            if(!is_scroll) {
                                this.$refs.chatHistoryContent.scrollTop < (this.$refs.chatHistoryContent.scrollHeight - this.$refs.chatHistoryContent.offsetHeight)
                                &&(this.$refs.chatHistoryContent.scrollTop = this.$refs.chatHistoryContent.scrollHeight - this.$refs.chatHistoryContent.offsetHeight)
                            } else {
                                this.$refs.chatHistoryContent.scrollTop = this.$refs.chatHistoryContent.scrollHeight - scroll_top
                            }
                            this.chatHistoryScrollFlag = false
                        },0)
                    }
                });
            },
            getBuyHistory() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/order-list',
                    data:{
                        id:this.selectContact.id
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.buyHistory = udata.data.buyRecordList
                    }
                });
            },
            editContentFB(bool) {
                this.focus_blur = bool
            },
            jumpPosition(type) {
                switch (type) {
                    case 'previous':
                        this.searchKeyNum+= 1
                        this.getSearchChatList(true,'','1')
                        break
                    case 'next':
                        if(this.searchKeyNum==1) {
                            this.$message.error('无下一条数据')
                            break
                        }
                        this.searchKeyNum-= 1
                        this.getSearchChatList(true,'','0')
                        break
                }
            },
            quitSearch() {
                //退出搜索并进入聊天页面
                this.$message.info('已退出搜索状态，请重新发送')
                this.searchKey=''
                this.$store.commit('liveChat/setSearchStatus',!this.searchStatus)
                this.contactScrollFlag = false
                this.contactLastId = 0;

                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/talk',
                    data:{
                        searchKey:'',
                        department_id:this.$store.state.user.user.department.id,
                        last_id:this.contactLastId
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        if(udata.data.contact_list.length == 0) {
                            this.$message.warning('已加载完毕，无更多数据')
                            this.searchChatList=[]
                            this.$store.commit('liveChat/clearContactList')
                            return
                        }
                        setTimeout(()=>{
                            this.contactScrollFlag = false
                        },2000)
                        this.contactLastId = udata.data.last_id
                        this.$store.commit('liveChat/setContactList',udata.data.contact_list)
                        this.$store.commit('liveChat/insertContactList',this.selectContact)
                        this.onSelect(udata.data.contact_list[0],true)
                    }
                });
            },
            getContctById(id) {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/talk-now',
                    data:{friends_id:id}
                }).then(res=>{
                    let udata = res.data
                    if (udata.status == 1) {
                        if(!!udata.data) {
                            !!udata.data.content&&(udata.data.content = emoji.stringToHtml(udata.data.content));
                            this.$store.commit('liveChat/insertContactList',udata.data);
                            this.onSelect(udata.data,true)
                        }
                    }
                })
            },
            receiveTransfeMoney(item) {
                let _this =this
                if(item.chatTransferMoney.pay_sub_type==2) {
                    this.$message.warning('已经领取，无法再次领取')
                    return
                }
                let msg = {
                    cmd:2055,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.selectContact.robot_username,
                    cmdData:{
                        senderUsername:this.selectContact.friend_user_name,
                        transcAtionId:item.chatTransferMoney.transc_ation_id,
                        transferId:item.chatTransferMoney.transfer_id,
                        invalidTime:item.chatTransferMoney.invalid_time
                    }
                }
                this.$ws.sendMsgFun(msg)
                this.$ws.cmd2055=function (wsMsg) {
                    console.log('2055',wsMsg)
                    if(wsMsg.status==2) {
                        if(wsMsg.callbackMsg=='收款成功') {
                            _this.$set(item.chatTransferMoney,'pay_sub_type',2)
                            _this.$store.commit('liveChat/insertContactList',_this.selectContact)
                            let timestamp = new Date(+new Date() +8*3600*1000) //go返回的时间戳
                            let datetime = timestamp.toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')
                            let datekey = datetime.slice(0,10)
                            let msg = {
                                key:datekey,
                                data:[{
                                    id:_this.selectContact.robot_id,
                                    robot_avatar_url:_this.selectContact.robot_avatar_url,
                                    nickname:_this.selectContact.robot_nickname,
                                    created:datetime,//从go获取
                                    content:item.content,
                                    type:'49',
                                    send_by:_this.selectContact.robot_id,
                                    chatTransferMoney:{
                                        pay_sub_type:'2',
                                        type:'0'
                                    }
                                }]
                            }
                            _this.$store.commit('liveChat/insertChatMsgList',msg)
                            _this.$set(_this.$store.state.liveChat.selectContact,'transfer_money',0)
                            _this.$message.success('领取成功')
                            setTimeout(()=>{
                                _this.$refs.contactList.scrollTop = 0
                                _this.$refs.chatContent.scrollTop = _this.$refs.chatContent.scrollHeight - _this.$refs.chatContent.offsetHeight
                            },0)
                        }else if(wsMsg.callbackMsg!=''){
                            _this.$message.info(wsMsg.callbackMsg)
                        }
                    }
                }
            },
            receiveRedPacket(item) {
                let _this =this
                if(item.chatRedPacket.chat_type==10&&item.chatRedPacket.inner_type==1) {
                    this.$message.warning('已经领取，无法再次领取')
                    return
                }
                let msg = {
                    cmd:2054,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.selectContact.robot_username,
                    cmdData:{
                        fromUsername:this.selectContact.friend_user_name,
                        nativeUrl:item.chatRedPacket.native_url
                    }
                }
                this.$ws.sendMsgFun(msg)
                this.$ws.cmd2054=function (wsMsg) {
                    if(wsMsg.status==2) {
                        if(wsMsg.callbackMsg=='红包打开成功') {
                            _this.$set(item.chatRedPacket,'inner_type',1)
                            let flag = false
                            wsMsg.cmdData.receiveUsers.forEach(el=>{
                                if(el.username == wsMsg.fromClientId) {
                                    flag = true
                                    _this.$set(item.chatRedPacket,'money',el.money)
                                }
                            })
                            if(!flag) {
                                _this.$set(item.chatRedPacket,'money',0)
                                _this.$message.success('红包已领完')
                            } else {
                                _this.$message.success('红包打开成功')
                            }
                            _this.$set(_this.$store.state.liveChat.selectContact,'red_packet',0)
                        } else if(wsMsg.callbackMsg!=''){
                            _this.$message.info(wsMsg.callbackMsg)
                        }
                    }
                }
            }
        },
        created(){
            this.getContactList(true,true)
        },
        beforeDestroy() {
            this.$store.commit('liveChat/setSearchStatus',false)
            this.$store.commit('liveChat/clearContactList')
            this.$store.commit('liveChat/clearChatMsgList')
        }
    }
</script>
