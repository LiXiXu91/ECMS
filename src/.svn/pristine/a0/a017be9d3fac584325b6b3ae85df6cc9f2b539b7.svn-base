<template>
	<div style="margin-top: 50px;position: relative;margin: 50px 20px 50px 20px;" class="background-color newMsg">
		<a-button type="default" icon="left" @click="back" style="position: fixed;top: 86px;z-index: 1;">返回</a-button>

		<a-row type="flex"  class="circle_title">
			<a-col span="4">
				<div>用户</div>
			</a-col>
			<a-col span="9">
				<div>评论</div>
			</a-col>
			<a-col span="9">
				<div>朋友圈</div>
			</a-col>
			<a-col span="2" style="text-align: center;">
				<div>操作</div>
			</a-col>
		</a-row>

		<!--评论列表 start-->
		<div class="new_box">
			<div class="new_con" v-for="(item,parent_index) in newMessageList">
				<a-row type="flex" class="row" align="middle">
					<a-col span="4">
						<div class="new_img">
							<img class="avatar_url" :src="item.avatar_url" height="50" width="50" />
							<div class="nick_name">{{item.nickname}}</div>
						</div>
					</a-col>
					<a-col span="9">
						<div class="new_text">{{item.comment}}</div>
					</a-col>
					<a-col span="9">
						<div class="new_text">{{item.content_text}}</div>
					</a-col>
					<a-col span="2" class="btn_group">
						<a href="javascript:void(0);" @click="com_showModal(item)" style="padding-right: 15px;">回复</a>
						<a href="javascript:void(0);" @click="com_detail(item.id)">详情</a>
					</a-col>
				</a-row>
			</div>

		</div>
		<!--评论列表 end-->

		<a-modal title="回复朋友圈" :footer="null" :visible="com_visible" @cancel="com_handleCancel">
			<p class="comment_con">
				<a href="javascript:void(0);">{{comment_con.nickname}}：</a>
				<span>{{comment_con.comment}}</span>
			</p>
			<a-form @submit="com_handleOk" :form="form">
				<a-form-item :wrapperCol="{span: 24}">
					<a-input type="textarea" :autosize="{ minRows: 4, maxRows: 6 }" :placeholder="'回复'+comment_con.nickname+'：'" v-decorator="[ 'com_textarea', {rules: [{ required: true, message: '不能为空' }]}]" />
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
	export default {
		name: "newMsg",
		data() {
			return {
				newMessageList: [],
				com_visible: false,
				form: this.$form.createForm(this),
				queryForm:{
					id:'',
					com_textarea:''
				},
				comment_con:{
					nick_name:'',
					content_text:''
				},
			}
		},
		methods: {
			back() {
				this.$router.push({
					path: '/pushMange/friendCircleSelf',
				});
			},
			com_showModal(item) {
				this.com_visible = true;
				this.comment_con = item
			},
			com_detail(id) {
				this.$router.push({
					path: '/pushMange/friendCircleDetail',
					query: {
						'id': id
					}
				});
			},
			com_handleOk(e) {
				e.preventDefault()
				this.form.validateFields((err, values) => {
					if(!err) {

                        let data = {
                            cmd:2050,
                            fromClientId:this.$store.state.user.user.user_id,
                            toClientId:this.comment_con.robot_username,
                            cmdData:{
                                snsId:this.comment_con.sns_id,
                                type:2,
                                comment:values.com_textarea,
                                toComment:{
                                    timestamp:this.comment_con.timestamp,
                                    username:this.comment_con.username,
                                    nickname:this.comment_con.nickname,
                                    id:this.comment_con.wx_comment_id
                                }
                            },
                            priority:0
                        }
                        this.$ws.sendMsgFun(data)
                        this.$message.success('评论成功', 2);
                        this.com_visible = false;
					}
				})
			},
			com_handleCancel() {
				this.com_visible = false;
			},
			refreshGroup(num){
				//新消息
				let that = this;
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/sale/new-msg',
					data: {
                        num:num,
                        department_id:this.$store.state.user.user.department.id
					}
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.newMessageList = udata.data;
					}
				});
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
			this.refreshGroup(this.$route.query.num);
		}
	}
</script>

<style lang="less" scoped>
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
	
	.newMsg .circle_title {
		margin-top: 30px;
		background: #F7F7F7;
		padding: 0 50px;
		/*text-align: center;*/
		div {
			padding: 10px 0;
		}
	}
	
	.background-color {
		background: #fff;
	}
	
	.newMsg .row {
		border-bottom: 1px solid #e5e5e5;
		padding: 10px 0;
		/*text-align: center;*/
	}
	
	.newMsg {
		.new_box {
			min-height: 600px;
			.new_con {
				padding: 0 50px;
				.new_img{
					.avatar_url{
						border-radius: 5px;
						vertical-align: middle;
					}
					.nick_name{
						display: inline-block;
						padding-left: 5px;
					}
				}
				.new_text {
					padding: 2px 0;
				}
			}
			.btn_group {
				text-align: center;
			}
		}
	}
	
	
</style>