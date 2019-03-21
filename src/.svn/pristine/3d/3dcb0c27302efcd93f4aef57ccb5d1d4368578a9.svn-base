<style scoped lang="less">
    /*清除浮动代码*/
    .hide {
        display: none;
    }
    .clearFloat:after {
        display: block;
        clear: both;
        content: "";
        visibility: hidden;
        height: 0
    }
    .clearFloat {
        zoom: 1
    }
    .fr {
        float: right;
    }
    .fl {
        float: left;
    }
    .friend-circle{
        .col-margin {
            .alert {
                height: 25px;
                line-height: 25px;
                width: 40%;
                text-align: center;
                margin: 18px auto;
                background: #E6F7FF;
                border-radius: 5px;
                border: 1px solid #108EE9;
                cursor: pointer;
                .icon {
                    height: 25px;
                    line-height: 2;
                    margin-right: 40px;
                }
            }
            .comment_box {
                height: calc(~"100vh - 270px");
                overflow-y: auto;
                overflow-x: hidden;
                /*padding: 10px 0;*/
                .comment_con {
                    height: calc(~"100% - 50px");
                    padding: 20px;
                    background: #fff;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    color: rgb(16,16,16);
                    display: flex;
                    word-break: break-all;
                    .avatar {
                        width: 54px;
                        margin-right: 10px;
                    }
                    .content-info {
                        width: calc(~"100% - 64px");
                        .user-info {

                        }
                        .content_text {
                            padding: 2px 0;
                        }
                        .albumList {
                            display: flex;
                            justify-content: flex-start;
                            flex-wrap: wrap;
                            .media {
                                width: 33%;
                                position: relative;
                                cursor: pointer;
                                min-width: 100px;
                                min-height: 100px;
                                margin-bottom: 10px;
                                .play_btn {
                                    height: 30px;
                                    width: 30px;
                                    position: absolute;
                                    top: 50%;
                                    margin-top: -15px;
                                    left: 50%;
                                    margin-left: -15px;
                                    z-index: 10;
                                }
                            }
                            .link-content {
                                display: inline-block;
                                padding: 10px;
                                border-radius: 5px;
                                position: relative;
                                color: rgb(16,16,16);
                                background: #e6e5e5;
                                cursor: pointer;
                                img {
                                    width: 40px;
                                    height: 40px;
                                }
                            }
                        }
                        .likeList {
                            color: #108EE9;
                            line-height: 20px;
                        }
                        .commentList {
                            margin-top: 6px;
                            .comment_dec {
                                /*height: 24px;*/
                                /*display: -webkit-box;*/
                                /*-webkit-box-orient: vertical;*/
                                /*-webkit-line-clamp: 1;*/
                                /*overflow: hidden;*/
                                /*padding-bottom: 6px;*/
                                .comment_reply {
                                    padding-bottom: 2px;
                                    .nick_name {
                                        color: #108EE9;
                                    }
                                    .text {}
                                }
                            }
                        }
                    }
                }
                .btn_group {
                    text-align: center;
                    border-top: 1px solid #f0f0f0;
                    background: #fff;
                    border-bottom-left-radius: 10px;
                    border-bottom-right-radius: 10px;
                    display: flex;
                    justify-content: space-between;
                    height: 50px;
                    line-height: 50px;
                    .btn-item {
                        display: inline-block;
                        border-right: 1px solid #f0f0f0;
                        flex: 1;
                        cursor: pointer;
                        svg {
                            font-size: 20px;
                            vertical-align: sub;
                        }
                        &:last-child {
                            border-right: none;
                        }
                    }
                }

            }
        }

    }


</style>

<template>
    <div class="friend-circle">
        <div class="col-margin">

            <a-form @submit="handleSubmit" layout="inline" style="padding: 10px;background: #fff">
                <a-form-item>
                    <a-input v-model="queryParam.searchKey" placeholder='请输入微信昵称、用户姓名' style="width: 300px;" />
                </a-form-item>
                <a-form-item>
                    <a-checkbox v-model="queryParam.is_comment">未评</a-checkbox>
                </a-form-item>

                <a-form-item>
                    <a-date-picker placeholder="开始日期" @change="onChangeStart" />
                </a-form-item>

                <a-form-item>
                    <a-date-picker placeholder="结束日期" @change="onChangeEnd" />
                </a-form-item>

                <a-form-item style="float: right">
                    <a-button @click="refresh" :disabled="refreshStatus">刷新</a-button>
                </a-form-item>
                <a-form-item style="float: right">
                    <a-button type='primary' htmlType='submit'>搜索</a-button>
                </a-form-item>


            </a-form>
            <div style="margin-top: -10px" v-if="refreshStatus">
                <a-progress :percent="refreshProcess" />
            </div>
            <div style="height: 26px"  v-if="newMsgCount==0">
            </div>
            <div class="alert clearFloat" @click="go_newMsg()" v-if="!!newMsgCount">
                {{newMsgCount}} 条新消息
                <a-icon type="right" class="fr icon" />
            </div>

            <!--评论列表 start-->
            <div class="comment_box">
                <p v-if="friendCircleList.length==0" style="text-align: center;font-size: 16px">暂无数据</p>
                <a-row type="flex" justify="space-between" v-if="friendCircleList.length!=0">
                    <a-col :xl='7' :sm="11"  :xs="22" v-for="(item,index) in friendCircleList" :key="index" style="margin-bottom: 20px">
                        <div class="comment_con">
                            <div class="avatar">
                                <a-avatar :src="item.avatar_url" :size="54" style="border-radius: 10px"/>
                            </div>
                            <div class="content-info">
                                <div class="user-info">
                                    <span>
                                        {{item.nickname}}
                                    </span>
                                    <span class="fr">
                                        {{item.created}}
                                    </span>
                                </div>
                                <div class="content_text" v-html="item.content_text"></div>
                                <div class="albumList clearFloat">
                                    <div v-for="(media_item,media_index) in item.albumList" class="media"  v-if="!item.share_url">
                                        <img :src="media_item.src" v-if="media_item.type==0" height="100" width="100" @click="previewPic(media_index,item.albumList)" />

                                        <video height="100" width="100" v-if="media_item.type==20" style="object-fit: fill;">
                                            <source :src="media_item.src" type="video/mp4" />
                                            <source :src="media_item.src" type="video/ogg" />
                                        </video>
                                        <img src="../../assets/play.png" :class="!video_playPause?'hide':'play_btn'" @click="playPauseVideo(media_index,item.albumList)" v-if="media_item.type==20" />
                                    </div>

                                    <div v-if="!!item.share_url" class="link-content" @click="navToLink(item.share_url)">
                                        <img v-if="item.albumList.length==0" src="../../assets/link-img.png" alt="">
                                        <img v-if="item.albumList.length>0" :src="item.albumList[0].src" alt="">
                                        <span>{{item.share_title}}</span>
                                    </div>

                                </div>
                                <div class="likeList" v-if="item.likeList.length>0">
                                    <a-icon type="heart" />
                                    <span v-for="(like_item,like_index) in item.likeList">
                                        {{like_item.nickname}}{{like_index+1==item.likeList.length?'':'，'}}
                                    </span>
                                </div>
                                <div class="commentList">
                                    <div class="comment_dec" ref="liCon">
                                        <!--<div class="comment_reply" v-for="(reply_item,reply_index) in item.commentList">-->
                                            <!--<span class="nick_name">{{reply_item.nickname}}：</span>-->
                                            <!--<span class="text">{{reply_item.comment}}</span>-->
                                        <!--</div>-->
                                        <div class="comment_reply" v-if="item.commentList.length>0">
                                            <span class="nick_name">{{item.commentList[0].nickname}}：</span>
                                            <span class="text" v-html="item.commentList[0].comment"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="btn_group">
                            <div class="btn-item" @click="com_like(item)">
                                <a-icon type="heart" v-if="item.is_like=='0'"/>
                                <a-icon type="heart" v-if="item.is_like=='1'" theme="filled" :style="{color: '#FF4949'}"/>
                                点赞
                            </div>
                            <div class="btn-item" @click="com_showModal(item)">
                                <a-icon type="message" v-if="item.is_comment=='0'" />
                                <a-icon type="message" v-if="item.is_comment=='1'" theme="filled"/>
                                评论
                            </div>
                            <div class="btn-item" @click="com_detail(item.id)">
                                详情
                            </div>
                        </div>
                    </a-col>
                </a-row>



            </div>
            <!--评论列表 end-->

        </div>

        <a-pagination showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '50', '100', '200']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right;margin-top: 10px"/>

        <a-modal :visible="visible" @cancel="handleCancel" :footer="null">
            <carousel_img :imgList="selectImgList" :pos="pos"></carousel_img>
        </a-modal>

        <a-modal title="评论朋友圈" :footer="null"  :visible="com_visible" @cancel="com_handleCancel">
            <a-form @submit="com_handleOk" :form="form">
                <a-form-item  :wrapperCol="{span: 24}">
                    <a-input type="textarea" :autosize="{ minRows: 4, maxRows: 6 }" placeholder='请输入评论。。。' v-decorator="[ 'com_textarea', {rules: [{ required: true, message: '不能为空' }]}]"/>
                </a-form-item>
                <a-form-item :wrapperCol="{ span: 24 ,offset:17}" style="margin-bottom: 0;">
                    <a-button @click="com_handleCancel">取消</a-button>
                    <a-button type='primary' htmlType='submit' style="margin-left: 10px;">提交</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
    var emoji = require('../../common/emojiMap');
    import carousel_img from '../../components/customerChat/carousel_img.vue'
    export default {
        name: "friendCircle",
        components: {
            carousel_img
        },
        data(){
            return{
                friendCircleList: [],
                queryParam: { // 查询参数
                    searchKey: '',
                    is_comment: false,
                    startTime: '',
                    endTime: ''
                },
                video_playPause: true, //视频播放
                visible: false,
                liConHeight: 24, // 两行文字的高度
                com_visible: false,
                form: this.$form.createForm(this),
                newMsgCount:'',
                robotList:[],
                selecetComment:{},
                page_size:10,
                page:1,
                total:0,
                refreshStatus:false,
                refreshProcess:0,
                selectImgList:[],
                pos:0,
            }
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        methods:{
            handleSubmit(e) {
                this.getFriendZone()
            },
            refresh() {
                if(this.refreshStatus) {
                    return
                }
                this.refreshStatus = true
                let _this = this;
                this.robotList.forEach(el=>{
                    let data = {
                        cmd:2044,
                        fromClientId:this.$store.state.user.user.user_id,
                        toClientId:el.username,
                        cmdData:{
                            lastSnsId:'-1',
                        },
                        priority:0
                    }
                    this.$ws.sendMsgFun(data)
                })

                this.refreshProcess = 0
                let set = setInterval(_ => {
                    this.refreshProcess++;
                    if (this.refreshProcess == 100) {
                        clearInterval(set);
                        this.refreshStatus = false
                        this.getFriendZone();
                    }
                }, 100)
//                this.$ws.cmd2044=function (msg) {
//                    console.log(msg)
//                    if(msg.status==2&&msg.callbackMsg!='正在获取数据'&&!!msg.cmdData.albumList&&msg.cmdData.albumList.length!=0) {
//                        let data1 = {
//                            cmd:2044,
//                            fromClientId:_this.$store.state.user.user.user_id,
//                            toClientId:msg.fromClientId,
//                            cmdData:{
//                                lastSnsId:msg.cmdData.lastSnsId,
//                            },
//                            priority:0
//                        }
//                        _this.$ws.sendMsgFun(data1)
//                    }
//                }
            },
            onChangeStart(date, dateString) {
                this.queryParam.startTime = dateString;
            },
            onChangeEnd(date, dateString) {
                this.queryParam.endTime = dateString;
            },
            previewPic(index,list) {
                this.selectImgList = list
                this.pos = index
                this.visible = true
            },
            playPauseVideo(index,list) {
                this.selectImgList = list
                this.pos = index
                this.visible = true
                this.video_playPause = false;
            },
            handleCancel(e) {
                this.visible = false
                this.video_playPause = true;
            },
            com_detail(id){
                this.$router.push({path:'/customerChat/friendCircleDetail',query:{'id':id}});
            },
            com_like(item){
                if(item.is_like==1) {
                    this.$message.info('已点赞，无法再次点赞')
                    return
                }
                item.is_like = 1
                let _this = this;
                let data = {
                    cmd:2050,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:item.robot_username,
                    cmdData:{
                        snsId:item.snsId,
                        type:1
                    },
                    priority:0
                }
                this.$ws.sendMsgFun(data)

                this.$message.success('点赞成功', 2);
            },
            com_showModal(item) {
                this.com_visible = true
                this.selecetComment = item
            },
            com_handleOk(e){
                let _this = this
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (!err) {
                        let data = {
                            cmd:2050,
                            fromClientId:this.$store.state.user.user.user_id,
                            toClientId:this.selecetComment.robot_username,
                            cmdData:{
                                snsId:this.selecetComment.snsId,
                                type:2,
                                comment:values.com_textarea
                            },
                            priority:0
                        }
                        this.$ws.sendMsgFun(data)
                        this.$message.success('评论成功', 2);
                        this.com_visible = false;
                    }
                })
            },
            com_handleCancel(){
                this.com_visible = false;
            },
            //更新总时间
            updateTotalTime(index) {
                var totalLabel = document.getElementById("total_time" + index);
                var audio = document.getElementById('audio' + index);
                if(!totalLabel.innerHTML) {
                    var time = Math.round(audio.duration);
                    if(isNaN(time)) {
                        time = '';
                    }
                    totalLabel.innerHTML = time + '"';
                }
            },
            audio_end(index) {
                var audio = document.getElementById('audio' + index);
                audio.parentElement.lastChild.setAttribute('class', 'audio-status')
            },
            go_newMsg(){
                this.$router.push({path:'/customerChat/newMsg',query:{'num':this.newMsgCount}});
            },
            getFriendZone() {
                let params = JSON.parse(JSON.stringify(this.queryParam))
                params.is_comment = params.is_comment?'1':'0'
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/friend-zone',
                    data:Object.assign(params,{p:this.page,n:this.page_size})
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.total = parseInt(udata.data.count)
                        this.friendCircleList = udata.data.friendCircleList
                        this.newMsgCount = udata.data.newMsgCount
                        this.robotList = udata.data.robotList
                        !!this.friendCircleList&&this.friendCircleList.forEach(el=>{
                            !!el.content_text&&(el.content_text = emoji.stringToHtml(el.content_text))
                            el.commentList.forEach(item=>{
                                item.comment = emoji.stringToHtml(item.comment)
                            })
                        })
                    }
                });
            },
            onChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.getFriendZone()
            },
            onShowSizeChange(current, size) {
                this.page = current
                this.page_size = size
                this.getFriendZone()
            },
            navToLink(url) {
                let reg1 = /(http|https):\/\/([\w.]+\/?)\S*/
                window.open(reg1.test(url)?url:'//'+url)
            }
        },
        created(){
            this.getFriendZone()
            let _this = this
            this.$ws.cmd1001 = function (msg) {
                if(msg.status==2) {
                    _this.$store.commit('user/addMenuBadge', {name:msg.callbackMsg,badge:1})
                    msg.callbackMsg =='客户朋友圈'&&(_this.newMsgCount+=1)
                }
            }
        }
    }
</script>
