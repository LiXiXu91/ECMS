<style lang="less"  scoped>

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
	.mySelfCircle .circle_title {
		background: #F7F7F7;
		padding: 0 20px;
        margin: 30px 25px 0 25px;
		div {
			padding: 10px 0;
		}
	}
	.background-color {
		background: #fff;
	}

	.mySelfCircle .row {
		border-bottom: 1px solid #e5e5e5;
	}

	.mySelfCircle{
        color: rgb(16,16,16);
        position: relative;
        background: #ffffff;
		.comment_box {
			margin-top: 15px;
            height: calc(~"100vh - 268px");
            overflow-y: auto;
			.comment_con {
				padding: 0 50px;
				margin-bottom: 10px;
				.content_text {
					padding: 2px 0;
				}
				.albumList {
					.media {
						min-height: 100px;
						min-width: 100px;
						max-height: 300px;
						max-width: 300px;
						margin: 10px 5px 0 5px;
						position: relative;
						cursor: pointer;
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
					.media:nth-child(1) {
						margin-left: 0;
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
                    padding-top: 5px;
                    color: #108EE9;
				}
			}
			.btn_group {
				text-align: center;
				.ant-btn {
					width: 83px;
				}
			}
			.commentList {
				margin-top: 6px;
				.comment_dec {
					height: auto;
					/*display: -webkit-box;*/
					/*-webkit-box-orient: vertical;*/
					/*-webkit-line-clamp: 1;*/
					/*overflow: hidden;*/
					/*padding-bottom: 6px;*/
					.comment_reply {
						padding-bottom: 2px;
						cursor: pointer;
						.nick_name {
							color: #108EE9;
						}
					}
				}
				.more {
					position: relative;
					top: 20px;
					width: 20px;
					height: 20px;
					margin: 0 auto;
					cursor: pointer;
					img {
						height: 100%;
						width: 100%;
					}
				}
			}
			.created {
				color: #101010;
				padding: 6px 0;
			}
		}
	}

</style>
<template>
	<div class="mySelfCircle">
        <div style="background: rgb(240,242,245);padding-bottom: 26px">
            <a-button type="default" icon="left" @click="back">返回</a-button>
        </div>

		
		<a-row class="circle_title">
            <a-col span="3">
                <a-avatar :src="friendCircleDetails.avatar_url" :size="54" style="border-radius: 10px;margin-right: 10px"/>
                <span>{{friendCircleDetails.nickname}}</span>
            </a-col>
			<a-col span="18" style="text-align: center;">
				<div>朋友圈</div>
			</a-col>
			<a-col span="3" style="text-align: center;">
				<div>操作</div>
			</a-col>
		</a-row>
		
		<!--评论列表 start-->
		<div class="comment_box">
			<div class="comment_con">
				<a-row class="row">
					<a-col span="21">
						<div class="content_text" v-html="friendCircleDetails.content_text"></div>
						<div class="albumList clearFloat">
							<div v-for="(media_item,media_index) in friendCircleDetails.albumList" class="media fl" v-if="friendCircleDetails.share_url==''">
								<img class="fl" :src="media_item.src" v-if="media_item.type==0" height="100" width="100" @click="previewPic(media_index,friendCircleDetails.albumList)" />
								<video height="100" width="100" class="fl" v-if="media_item.type==20"  style="object-fit: fill;">
									<source :src="media_item.src" type="video/mp4" />
									<source :src="media_item.src" type="video/ogg" />
								</video>
								<img src="../../assets/play.png" :class="!video_playPause?'hide':'play_btn'" @click="playPauseVideo(media_index,friendCircleDetails.albumList)" v-if="media_item.type==20" />
							</div>
							<div v-if="friendCircleDetails.share_url!=''" class="link-content" @click="navToLink(friendCircleDetails.share_url)">
								<img v-if="friendCircleDetails.albumList.length==0" src="../../assets/link-img.png" alt="">
								<img v-if="friendCircleDetails.albumList.length>0"  :src="friendCircleDetails.albumList[0].src" alt="">
								<span>{{friendCircleDetails.share_title}}</span>
							</div>


						</div>
						<div class="likeList" v-if="!!friendCircleDetails.likeList&&friendCircleDetails.likeList.length>0">
                            <!--<a-icon type="heart" v-if="friendCircleDetails.is_like=='0'"/>-->
                            <!--<a-icon type="heart" v-if="friendCircleDetails.is_like=='1'" theme="filled"/>-->
							<a-icon type="heart"/>
							<span v-for="(like_item,like_index) in friendCircleDetails.likeList">
                                {{like_item.nickname}}{{like_index+1==friendCircleDetails.likeList.length?'':'，'}}
                            </span>
						</div>
						<div class="commentList">
							<div class="comment_dec" ref="liCon">
								<div class="comment_reply" v-for="(reply_item,reply_index) in friendCircleDetails.commentList" @click="send_comment(reply_item)">
                                    <span class="nick_name" v-if="reply_item.type=='0'">{{reply_item.nickname}}：</span>
                                    <span class="nick_name" v-if="reply_item.type=='1'">{{reply_item.nickname}}<span style="color: rgb(73,101,130)">回复</span>{{reply_item.tonickname}}：</span>
									<span class="text">{{reply_item.comment}}</span>
								</div>

							</div>

						</div>

					</a-col>
					<a-col span="3" class="btn_group">
						<p>
							<a-button :type="friendCircleDetails.is_comment==1?'primary':'default'" @click="com_showModal()">评论</a-button>
						</p>
						<p>
							<a-button :type="friendCircleDetails.is_like==1?'primary':'default'" @click="com_like()">点赞</a-button>
						</p>
					</a-col>
				</a-row>
			</div>

		</div>
		<!--评论列表 end-->
		<a-modal :visible="visible"  @cancel="handleCancel" :footer="null">
			<carousel_img :imgList="selectImgList" :pos="pos"></carousel_img>
		</a-modal>

 		<a-modal title="评论朋友圈" :footer="null"  :visible="com_visible" @cancel="com_handleCancel">
			<p class="comment_con" v-if="!!selectComment.nickname">
				<a href="javascript:void(0);">{{selectComment.nickname}}：</a>
				<span>{{selectComment.comment}}</span>
			</p>
 			<a-form @submit="com_handleOk" :form="form">
	 			<a-form-item  :wrapperCol="{span: 24}">
	      			<a-input type="textarea" :autosize="{ minRows: 4, maxRows: 6 }" :placeholder="placeholder" v-decorator="[ 'com_textarea', {rules: [{ required: true, message: '不能为空' }]}]"/>
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
    import carousel_img from '../../components/customerChat/carousel_img.vue'
    var emoji = require('../../common/emojiMap');
	export default {
		name: "friendCircleDetail",
        components: {
            carousel_img
        },
		data() {
			return {
			    id:this.$route.query.id,
                friendCircleDetails:{
                    albumList:[{src:''}]
				},
				video_playPause: true, //视频播放
				audio_playPause: true, //音频播放
				visible: false,
				media_type: 20, //0：图片；10：音频；20：视频
				com_visible: false,
				form: this.$form.createForm(this),
				queryForm:{
					id:'',
					com_textarea:''
				},
                selectComment:{},
                placeholder:'',
                selectImgList:[],
                pos:0,
			}
		},
		methods: {
			back() {
				this.$router.back(-1)
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
			com_like(){
                if(this.friendCircleDetails.is_like==1) {
                    this.$message.info('已点赞，无法再次点赞')
                    return
                }
                this.friendCircleDetails.is_like=1
                let _this = this;
                let data = {
                    cmd:2050,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.friendCircleDetails.robot_username,
                    cmdData:{
                        snsId:this.friendCircleDetails.snsId,
                        type:1
                    },
                    priority:0
                }
                this.$ws.sendMsgFun(data)
                this.$message.success('点赞成功', 2);
			},
			com_showModal() {
			    this.selectComment = {}
		        this.com_visible = true
				this.placeholder = '请输入评论。。。'
		    },
			com_handleOk(e){
			 	e.preventDefault()
			    this.form.validateFields((err, values) => {
			        if (!err) {
			            let data = {}
			            if(Object.keys(this.selectComment).length>0) {
                            data = {
                                cmd:2050,
                                fromClientId:this.$store.state.user.user.user_id,
                                toClientId:this.friendCircleDetails.robot_username,
                                cmdData:{
                                    snsId:this.friendCircleDetails.snsId,
                                    type:2,
                                    comment:values.com_textarea,
                                    toComment:{
                                        timestamp:this.selectComment.timestamp,
                                        username:this.selectComment.username,
                                        nickname:this.selectComment.nickname,
                                        id:this.selectComment.wx_comment_id
                                    }
                                },
                                priority:0
                            }
						} else {
                            data = {
                                cmd:2050,
                                fromClientId:this.$store.state.user.user.user_id,
                                toClientId:this.friendCircleDetails.robot_username,
                                cmdData:{
                                    snsId:this.friendCircleDetails.snsId,
                                    type:2,
                                    comment:values.com_textarea
                                },
                                priority:0
                            }
						}
                        this.$ws.sendMsgFun(data)
			            this.$message.success('评论成功', 2);
					    this.com_visible = false;
			        }
			    })
			},
		    com_handleCancel(){
		    	this.com_visible = false;
		    	this.selectComment = {}
		    },
            getDetails() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/friend-zone-detail',
                    data:{
                        id:this.id
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.friendCircleDetails = udata.data.friendCircleList
                        this.friendCircleDetails.content_text = emoji.stringToHtml(this.friendCircleDetails.content_text)
                    }
                });
            },
            send_comment(item) {
				if(item.username == this.friendCircleDetails.robot_username) {
					return
				}
				this.selectComment = item
				this.com_visible = true
                this.placeholder = '回复' + this.selectComment.nickname + '：'
			},
            navToLink(url) {
                let reg1 = /(http|https):\/\/([\w.]+\/?)\S*/
                window.open(reg1.test(url)?url:'//'+url)
            }
		},
		beforeCreate() {},
		mounted() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		created() {
            this.getDetails()
		}
	}
</script>

