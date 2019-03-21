<style lang="less" scoped>
    .contact-item {
        height: 80px;
        padding: 13px;
        color: rgb(16,16,16);
        display: flex;
        justify-content:space-between;
        align-items: center;
        overflow: hidden;
    }
    div.money {
        color: #fff;
        background: #fa9c3e;
    }
    div.select-item {
        background: #d4d2d2;
    }
    .width-4 {
        width: calc(~"calc(100% - 120px)");
    }
    .width-n4 {
        width: calc(~"calc(100% - 70px)");
    }
</style>
<style>
    .contact-item .qqemoji {
        width: 20px!important;
        height: 20px!important;
    }
</style>
<template>
    <div class="contact-item" :class="[contact.red_packet==1||contact.transfer_money==1?'money':'',(contact.friend_user_name==selectContact.friend_user_name)&&(contact.robot_username==selectContact.robot_username)?'select-item':'']" @click="select()">
        <div style="display: flex;vertical-align: middle;align-items: center" :class="contact.type==49||contact.type==48||contact.red_packet==1||contact.transfer_money==1?'width-4':'width-n4'">
            <div style="display: inline-block;margin-right: 10px">
                <a-avatar v-if="contact.chat_type!=20" chat_type :src="contact.avatar_url" :size="54" style="border-radius: 10px"/>
                <img v-if="contact.chat_type==20" src="../../assets/room_avatar.png" alt="" style="width: 54px;height: 54px;border-radius: 10px">
            </div>
            <div style="display: inline-block;width: calc(100% - 54px);color: #585858">
                <span >{{contact.nickname}}</span>
                <span v-if="contact.type==1" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; " v-html="contact.content"></span>
                <span v-else-if="contact.type==3" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">[图片]</span>
                <span v-else-if="contact.type==5" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">[链接]</span>
                <span v-else-if="contact.type==33" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">[小程序]</span>
                <span v-else-if="contact.type==34" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">[语音]</span>
                <span v-else-if="contact.type==42" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">[名片]</span>
                <span v-else-if="contact.type==47" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">[表情包]</span>
                <span v-else-if="contact.type==48" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">[红包]</span>
                <span v-else-if="contact.type==49" style="width: 100%;display: block;text-overflow: ellipsis;overflow:hidden; white-space:nowrap; ">[转账]{{contact.content}}</span>
            </div>
        </div>
        <div v-if="contact.type==48||contact.red_packet==1" style="display: inline-block">
            <img src="../../assets/red-packet.png" alt="" style="width: 30px">
        </div>
        <div v-else-if="contact.type==49||contact.transfer_money==1" style="display: inline-block">
            <img v-if="(contact.friend_user_name==selectContact.friend_user_name)&&(contact.robot_username==selectContact.robot_username)" src="../../assets/money-1.png" alt="">
            <img v-else src="../../assets/money.png" alt="">
        </div>
        <div style="display: inline-block;vertical-align: middle;text-align: right;line-height: 27px;margin-right: 6px">
            <a-badge  :numberStyle="{padding:'0',boxShadow:'none'}" :count="contact.num" :overflowCount="99"/>
            <span style="display: block">{{contact.created}}</span>
        </div>
    </div>
</template>

<script>
    var emoji = require('../../common/emojiMap');
    export default {
        name: 'contactItem',
        props: {
            contact: {
                type: Object,
                required: true
            },
            searchKey: {
                type:String,
                default:''
            }
        },
        data () {
            return {

            }
        },
        watch: {

        },
        computed: {
            selectContact () {
                return this.$store.state.liveChat.selectContact
            }
        },
        methods:{
            select() {
                this.$emit('select', this.contact)
            }
        },
        created:function () {
            this.contact.type==1&&(this.contact.content = emoji.stringToHtml(this.contact.content))
        }
    }
</script>


