<template>
	<div class="background-color mySelfCircle">
		<div class="mag_push_title">个人朋友圈</div>
		<div class="col-margin">
			<a-form @submit="handleSubmit" layout="inline">
				<a-form-item>
					<a-input v-model="queryForm.key" placeholder='请输入微信昵称、朋友圈内容、评论内容' style="width: 300px;" />
				</a-form-item>
				<a-form-item>
					<a-checkbox v-model="queryForm.is_comment">未回复</a-checkbox>
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
					<a-button type='primary' htmlType='submit'>查询</a-button>
				</a-form-item>

			</a-form>
			<div style="margin-top: -5px" v-if="refreshStatus">
				<a-progress :percent="refreshProcess" />
			</div>
			<a-row class="circle_title">
				<a-col span="22">
					<div>朋友圈</div>
				</a-col>
				<a-col span="2" style="text-align: center;">
					<div>操作</div>
				</a-col>
			</a-row>
			<div class="alert clearFloat" @click="go_newMsg()" v-show="newMsgNum>0?true:false">
				{{newMsgNum}} 条新消息
				<a-icon type="right" class="fr icon" />
			</div>

			<!--评论列表 start-->
			<div class="comment_box">
				<div class="comment_con" v-for="(item,parent_index) in friendCircleList" v-if="friendCircleList.length==0?false:true">
					<a-row :class="friendCircleList.length>1?'row':''">
						<a-col span="22">
							<div class="content_text" v-html="item.content_text"></div>
							<div class="album clearFloat">
								<div v-for="(media_item,media_index) in item.album" class="media fl" v-if="item.album.length>0&&item.share_url==''">
									<img class="fl" :src="media_item.src" v-if="media_item.type==0" height="100" width="100" @click="previewPic(media_index,item.album)" />
									<video height="100" width="100" class="fl" v-if="media_item.type==20">
										<source :src="media_item.src" type="video/mp4" />
										<source :src="media_item.src" type="video/ogg" />
									</video>
									<img src="../../assets/play.png" :class="!video_playPause?'hide':'play_btn'" @click="playPauseVideo(media_index,item.album)" v-if="media_item.type==20" />
								</div>
								<div v-if="item.share_url!=''" class="link-content" @click="navToLink(item.share_url)">
									<img v-if="item.album.length==0" src="../../assets/link-img.png" alt="">
									<img v-if="item.album.length>0" :src="item.album[0].src" alt="">
									<span>{{item.share_title}}</span>
                            	</div>
							</div>
							<div class="likeList">
								<a-icon type="heart" v-if="item.likeList.length" />
								<span v-for="(like_item,like_index) in item.likeList">
									{{like_item.nickname}}{{like_index+1==item.likeList.length?'':'，'}}
								</span>
							</div>
							<div class="commentList">
								<div class="comment_dec" ref="liCon">
									<div class="comment_reply" v-for="(reply_item,reply_index) in item.commentList" v-if="item.commentList.length==0?false:true">
										<span class="nick_name" v-if="reply_item.type=='0'">{{reply_item.nickname}}：</span>
	                                    <span class="nick_name" v-if="reply_item.type=='1'">{{reply_item.nickname}}<span style="color: rgb(73,101,130)">回复</span>{{reply_item.tonickname}}：</span>
										<span class="text" v-html="reply_item.comment"></span>
									</div>

								</div>
								<div class="more" v-for="(reply_item,reply_index) in item.commentList" @click="open(reply_item,parent_index)" v-if="item.commentList.length>1&&item.commentList.length==reply_index+1">
									<img src="../../assets/down.png" v-if="!reply_item.openFlag" />
									<img src="../../assets/up.png" v-else />
								</div>

							</div>

							
						</a-col>
						<a-col span="2" class="btn_group">
							<p>
								<a-button :type="item.is_like==0?'primary':'default'" @click="com_showModal(item)">评论({{item.commentCount}})</a-button>
							</p>
							<p>
								<a-button :type="item.is_comment==0?'primary':'default'" @click="com_like(item)">点赞({{item.likeCount}})</a-button>
							</p>
							<p>
								<a-button @click="com_detail(item.id)">详情</a-button>
							</p>
							<p>
								<a-popconfirm title="你确定删除吗？"  okText="Yes" cancelText="No" @confirm="com_delete(item)">
								    <a-icon slot="icon" type="question-circle-o" style="color: red" />
								    <a-button>删除</a-button>
								</a-popconfirm>
							</p>
						</a-col>
						<a-col span="24"><div class="created fr">{{item.created}}</div></a-col>
					</a-row>
				</div>
				<div v-if="friendCircleList.length==0?true:false" style="text-align: center;font-size: 26px;">暂无数据</div>

			</div>
			<!--评论列表 end-->

		</div>
					
		<a-row style="margin: 50px 0;">
			<a-col span="24">
				<a-pagination
			 	  showQuickJumper 
			 	  showSizeChanger 
			 	  :pageSizeOptions="pagination.pageSizeOptions"
				  :pagination="pagination" 
				  :total="pagination.total"
			      :showTotal="total => `共 ${total} 项`"
			      :pageSize="pagination.pageSize"
			      :defaultCurrent="pagination.current"  
			      @change="onShowSizeChange" 
				  @showSizeChange="optionChange"
				  style="float: right;margin-right: 100px;"
			      />
			</a-col>
		</a-row>


		<a-modal :visible="visible"  @cancel="handleCancel" :footer="null">
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
    import carousel_img from '../../components/customerChat/carousel_img.vue'
    var emoji = require('../../common/emojiMap');
	export default {
		name: "friendCircleSelf",
        components: {
            carousel_img
        },
		data() {
			return {
				friendCircleList: [],
				queryForm: { // 查询参数
					key: '',
					is_comment: false,
					startTime: '',
					endTime: ''
				},
				newMsgNum:'',//新信息条数
				modal_title: '视频播放',
				video_playPause: true, //视频播放
				visible: false,
				media_type: 20, //0：图片；10：音频；20：视频
				liConHeight: 24, // 两行文字的高度
				com_visible: false,
				form: this.$form.createForm(this),
				selecetComment:{},
				pagination:{
					showQuickJumper:true,
					showSizeChanger:true,
					pageSizeOptions: ['10', '20', '30', '40', '50'],
					current: 1,
			        pageSize: 10,
			        total: 0,
			        showTotal:function(total, range){
			        	return `共 ${total} 项`
			        }
				},
                robotList:[],
                refreshStatus:false,
				refreshProcess:0,
                selectImgList:[],
                pos:0,
			}
		},
    
		mounted() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		methods: {
			optionChange(current, pageSize){
                this.pagination.current = current;
				this.pagination.pageSize = pageSize;
				this.refreshGroup();
			},
			onShowSizeChange(page, pageSize){
				this.pagination.current = page;
				this.refreshGroup();
			},
				
			handleSubmit(e) {
				this.refreshGroup();
				console.log(this.queryForm)
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
                        this.refreshGroup();
                    }
                }, 100)
			},
			onChangeStart(date, dateString) {
				this.queryForm.startTime = dateString;
			},
			onChangeEnd(date, dateString) {
				this.queryForm.endTime = dateString;
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
			com_delete(item){
                let _this = this;
                let data = {
                    cmd:2045,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:item.username,
                    cmdData:{
                        snsId:item.snsId,
                    },
                    priority:0
                }
                this.$ws.sendMsgFun(data)
                this.$ws.cmd2045=function (msg) {
                    _this.$message.success('删除成功', 10);
                    _this.refreshGroup();
                }
			},
			com_detail(id){
				this.$router.push({path:'/pushMange/friendCircleDetail',query:{'id':id}});
			},
			com_like(item){
                if(item.is_like==1) {
                    this.$message.info('已点赞，无法再次点赞')
                    return
                }
                let _this = this;
                let data = {
                    cmd:2050,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:item.username,
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
				this.selecetComment = item
		      	this.com_visible = true;
		    },
			com_handleOk(e){
                let _this = this
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (!err) {
                        let data = {
                            cmd:2050,
                            fromClientId:this.$store.state.user.user.user_id,
                            toClientId:this.selecetComment.username,
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
				var totalLabel = document.getElementById("total_time" + index)||{};
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

			open(item, i) {
				const liCon = this.$refs.liCon[i]
				var height = liCon.offsetHeight
				if(height === this.liConHeight) { // 展开
					liCon.style.height = 'auto'
					height = liCon.offsetHeight
					liCon.style.height = this.liConHeight + 'px'
					var f = document.body.offsetHeight // 必加
					liCon.style.height = height + 'px'
				} else { // 收缩
					liCon.style.height = this.liConHeight + 'px'
				}
				if(!item.openFlag) {
					this.$set(item, 'openFlag', true)
				} else {
					this.$set(item, 'openFlag', false)
				}
			},
			go_newMsg(){
				this.$router.push({path:'/pushMange/newMsg',query:{'num':this.newMsgNum}});
			},
			refreshGroup(){
				let that = this;
				this.$axios({//朋友圈列表
					method: 'get',
					url: '/index.php?r=uc/sale/my-zone',
					params: Object.assign(that.queryForm,{
						'p':that.pagination.current,
						'n':that.pagination.pageSize
					}) // 参数
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.newMsgNum = udata.data.notReadNum; //新信息条数
						that.pagination.total = parseInt(udata.data.count);//数据总条数
						if(udata.data.list.length > 0) {
							that.friendCircleList = udata.data.list;
                            that.friendCircleList.forEach(el=>{
                                !!el.content_text&&(el.content_text = emoji.stringToHtml(el.content_text))
                                el.commentList.forEach(item=>{
                                    item.comment = emoji.stringToHtml(item.comment)
                                })
                            })
						} else {
							that.friendCircleList = [];
						}
                        that.robotList = udata.data.robotList
					}
				});
			},
            navToLink(url) {
                let reg1 = /(http|https):\/\/([\w.]+\/?)\S*/
                window.open(reg1.test(url)?url:'//'+url)
            }
		},
		created: function() {
			this.refreshGroup();
            let _this = this
            this.$ws.cmd1001 = function (msg) {
                if(msg.status==2) {
                    _this.$store.commit('user/addMenuBadge', {name:msg.callbackMsg,badge:1})
                    msg.callbackMsg =='个人朋友圈'&&(_this.newMsgNum+=1)
                }
            }
		},
		mounted() {},
		beforeUpdate() {}
	}
</script>
<style scoped>
	.background-color {
		height: calc(100vh - 90px);
    	overflow-y: auto;
	}
</style>
<style lang="less" scoped>

	.background-color {
		background: #fff;
	}
	
	
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
	
	.mySelfCircle .col-margin {
		margin: 0 38px 0 38px;
	}
	
	.mySelfCircle .alert {
		height: 25px;
		line-height: 2;
		width: 40%;
		text-align: center;
		margin: 22px auto 10px auto;
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
	
	.mySelfCircle .circle_title {
		margin-top: 30px;
		background: #F7F7F7;
		padding: 0 50px;
		div {
			padding: 10px 0;
		}
	}
	
	.mySelfCircle .mag_push_title {
		border-bottom: 1px solid rgb(187, 187, 187);
		margin: 0 0 20px 0;
		padding: 17px 38px;
		font-size: 16px;
	}
	
	
	
	.mySelfCircle .row {
		border-bottom: 1px solid #e5e5e5;
	}
	
	.mySelfCircle .comment_con:nth-last-child(1) .row {
		border-bottom: 0;
	}
	.mySelfCircle{
		.comment_box {
			margin-top: 15px;
			min-height: 600px;
			.comment_con {
				padding: 0 50px;
				margin-bottom: 10px;
				.content_text {
					padding: 2px 0;
				}
				.album {
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
					.anticon {
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
					height: 24px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
					padding-bottom: 6px;
					.comment_reply {
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
					z-index: 10;
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
		background: url(../../assets/voice.png) no-repeat top left;
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