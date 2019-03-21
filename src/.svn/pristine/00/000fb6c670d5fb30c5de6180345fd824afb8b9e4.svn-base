<template>
	<div style="margin-top: 50px;position: relative;margin: 50px 20px 50px 20px;" class="background-color mySelfCircle">
		<a-button type="default" icon="left" @click="back" style="position: fixed;top: 86px;z-index: 1;">返回</a-button>
		
		<a-row class="circle_title">
			<a-col span="22">
				<div>朋友圈</div>
			</a-col>
			<a-col span="2" style="text-align: center;">
				<div>操作</div>
			</a-col>
		</a-row>
		
		<!--评论列表 start-->
		<div class="comment_box">
			<div class="comment_con">
				<a-row class="row">
					<a-col span="22">
						<div class="content_text" v-html="friendCircleDetails.content_text"></div>
						<div class="albumList clearFloat">

							<div v-for="(media_item,media_index) in friendCircleDetails.albumList" class="media fl" v-if="friendCircleDetails.albumList.length>0&&friendCircleDetails.share_url==''">
								<img class="fl" :src="media_item.src" v-if="media_item.type==0" height="100" width="100" @click="previewPic(media_index,friendCircleDetails.albumList)" />
								<video height="100" width="100" class="fl" v-if="media_item.type==20">
									<source :src="media_item.src" type="video/mp4" />
									<source :src="media_item.src" type="video/ogg" />
								</video>
								<img src="../../assets/play.png" :class="!video_playPause?'hide':'play_btn'" @click="playPauseVideo(media_index,friendCircleDetails.albumList)" v-if="media_item.type==20" />
							</div>
							<div v-if="friendCircleDetails.share_url!=''" class="link-content" @click="navToLink(friendCircleDetails.share_url)">
								<img v-if="friendCircleDetails.albumList.length>0" :src="friendCircleDetails.albumList[0].src" alt="">
								<img v-if="friendCircleDetails.albumList.length==0" src="../../assets/link-img.png" alt="">
								<span>{{friendCircleDetails.share_title}}</span>
							</div>
						</div>
						<div class="likeList">
							<span v-for="(like_item,like_index) in friendCircleDetails.likeList">
									{{like_item.nickname}}{{like_index+1==friendCircleDetails.likeList.length?'':'，'}}
								</span>
						</div>
						<div class="commentList">
							<div class="comment_dec" ref="liCon">
								<div class="comment_reply" v-for="(reply_item,reply_index) in friendCircleDetails.commentList"  @click="send_comment(reply_item)">
									 <span class="nick_name" v-if="reply_item.type=='0'">{{reply_item.nickname}}：</span>
                                    <span class="nick_name" v-if="reply_item.type=='1'">{{reply_item.nickname}}<span style="color: rgb(73,101,130)">回复</span>{{reply_item.tonickname}}：</span>
									<span class="text">{{reply_item.comment}}</span>
								</div>
							</div>
						</div>
					</a-col>
					<a-col span="2" class="btn_group">
						<p>
							<a-button :type="friendCircleDetails.is_comment==0?'primary':'default'" @click="com_showModal()">{{'评论('+ friendCircleDetails.commentList.length +')'}}</a-button>
						</p>
						<p>
							<a-button :type="friendCircleDetails.is_like==0?'primary':'default'" @click="com_like()">{{'点赞('+ friendCircleDetails.likeList.length +')'}}</a-button>
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
 			<a-form @submit="com_handleOk" :form="form">
	 			<a-form-item  :wrapperCol="{span: 24}">
	      			<a-input type="textarea" :autosize="{ minRows: 4, maxRows: 6 }" :placeholder='placeholder' v-decorator="[ 'com_textarea', {rules: [{ required: true, message: '不能为空' }]}]"/>
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
				friendCircleDetails: {
                    commentList:[],
                    likeList:[],
                    albumList:[{src:''}]
				},
				modal_title: '视频播放',
				video_playPause: true, //视频播放
				visible: false,
				com_visible: false,
				form: this.$form.createForm(this),
				detail_id:this.$route.query.id, //接受参数Id,
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
				this.$router.push({path:'/pushMange/friendCircleSelf'});
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
			com_like(id){
                if(this.friendCircleDetails.is_like==1) {
                    this.$message.info('已点赞，无法再次点赞')
                    return
                }
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
			            if(Object.keys(this.selectComment).length!=0) {
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
                                        id:this.selectComment.id
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
			send_comment(item) {
				if(item.username == this.friendCircleDetails.robot_username) {
					return
				}
				this.selectComment = item
				this.com_visible = true
                this.placeholder = '回复' + this.selectComment.nickname + '：'
			},
			refreshGroup(){
				let that = this;
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/communication/friend-zone-detail',
					data: {'id':that.detail_id}
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.friendCircleDetails = udata.data.friendCircleList;
                        that.friendCircleDetails.content_text = emoji.stringToHtml(that.friendCircleDetails.content_text)
					}
				});
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
			this.refreshGroup();
		}
	}
</script>

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
		margin-top: 30px;
		background: #F7F7F7;
		padding: 0 50px;
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
		.comment_box {
			/*min-height: 600px;*/
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
						margin-top: 10px;
						img {
							width: 40px;
							height: 40px;
						}
					}
				}
				.likeList {
					span {
						color: #108EE9;
					}
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
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
					padding-bottom: 6px;
					.comment_reply {
						cursor: pointer;
						padding-bottom: 2px;
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
	
	.mySelfCircle .simple-audio {
		display: block;
	}
	
	.mySelfCircle .simple-audio:after {
		content: '';
		clear: both;
		display: block;
	}
	
	.mySelfCircle .audio-container {
		float: left;
		position: relative;
		width: 150px;
		height: 32px;
		background-color: #f8f8f8;
		background-image: -webkit-linear-gradient(-180deg, #f8f8f8 0%, #efefef 100%);
		background-image: -moz-linear-gradient(-180deg, #f8f8f8 0%, #efefef 100%);
		background-image: -o-linear-gradient(-180deg, #f8f8f8 0%, #efefef 100%);
		background-image: linear-gradient(-180deg, #f8f8f8 0%, #efefef 100%);
		border: 1px solid rgba(0, 0, 0, 0.12);
		-webkit-border-radius: 4px;
		-moz-border-radius: 4px;
		border-radius: 4px;
		margin: 0 5px;
	}
	
	.mySelfCircle .audio-container:before {
		content: '';
		position: absolute;
		display: block;
		width: 8px;
		height: 8px;
		border: 1px solid rgba(0, 0, 0, 0.12);
		-moz-transform: rotate(45deg);
		/* Firefox */
		-webkit-transform: rotate(45deg);
		/* Safari 和 Chrome */
		-o-transform: rotate(45deg);
		/* Opera */
		transform: rotate(45deg);
		left: -5px;
		top: 11px;
		background-color: #f8f8f8;
		background-image: -webkit-linear-gradient(-180deg, #f8f8f8 0%, #efefef 100%);
		background-image: -moz-linear-gradient(-180deg, #f8f8f8 0%, #efefef 100%);
		background-image: -o-linear-gradient(-180deg, #f8f8f8 0%, #efefef 100%);
		background-image: linear-gradient(-180deg, #f8f8f8 0%, #efefef 100%);
		border-top: none;
		border-right: none;
	}
	
	.mySelfCircle .audio-status {
		float: left;
		margin-top: 8px;
		margin-left: 15px;
		width: 13px;
		height: 15px;
		background: url(http://p1.ssl.qhimg.com/t01154d8bfabb0b30aa.png) no-repeat top left;
		-webkit-background-size: 100%;
		background-size: 100%;
	}
	
	.mySelfCircle .audio-status.playing {
		-webkit-animation: audio_playing 1s infinite;
		-o-animation: audio_playing 1s infinite;
		animation: audio_playing 1s infinite;
	}
	
	.mySelfCircle .audio-status.error:after {
		content: '!';
		font-size: 12px;
		color: #aaa;
		margin-left: 16px;
		vertical-align: top;
	}
	
	@-webkit-keyframes audio_playing {
		0% {
			background-position: 0 -15px;
		}
		30% {
			background-position: 0 -15px;
		}
		30.1% {
			background-position: 0 -30px;
		}
		61% {
			background-position: 0 -30px;
		}
		61.1% {
			background-position: 0 -45px;
		}
		100% {
			background-position: 0 -45px;
		}
	}
	
	.mySelfCircle .audio-time {
		float: left;
		line-height: 32px;
		color: #999;
		font-size: 13px;
		font-family: SFUIDisplay-Regular, Arial;
	}
</style>