<template>
	<div class="background-color">
		<div class="mag_push_title">修改机器人</div>
		
		<a-row>
			<a-col span="14">
				<a-form @submit="com_handleOk" :form="form">

					<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='编号：' :validateStatus='queryForm.mobile_serial?"success":"error"' :help='queryForm.mobile_serial?"":"请输入编号。。。"'>
						<a-input placeholder='请输入编号' v-model="queryForm.mobile_serial" />
					</a-form-item>
					<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='昵称：'>
						<a-input placeholder='请输入昵称' v-model="queryForm.nickname" />
					</a-form-item>
		
					<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='手机号：' :validateStatus='queryForm.tel.length<11?is_number?"success":"error":""' :help='queryForm.tel.length<11?tip:"" '>
						<a-input placeholder='请输入手机号' @change="input_tel"   v-model="queryForm.tel"  />
					</a-form-item>
		
					<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='头像：'>
						<a-upload  name="file" :headers="headers" @change="handleChange" :beforeUpload="beforeUpload" :multiple="true" :showUploadList="false" action="/index.php?r=uc/user/upload" >
							<a-button>
						      <a-icon type="upload" /> Upload
						    </a-button>
						</a-upload>
					</a-form-item>
					
					<div class="ant-upload-list ant-upload-list-picture-card upload" v-if="mediapath">
						<a-icon class="up_loading" type="loading" v-if="loading"/>
						<div class="ant-upload-list-item ant-upload-list-item-done" v-if="mediapath">
							<div class="ant-upload-list-item-info">
								<span>
									<a href="javascript:void(0)" target="_blank" rel="noopener noreferrer" class="ant-upload-list-item-thumbnail">
										<img  :src="mediapath" alt="mediapath">
									</a>
								</span>
							</div>
							<span class="ant-upload-list-item-actions">
								<a href="javascript:void(0)">
									<a-icon type="eye" @click="handlePreview(mediapath)"></a-icon>
								</a>
								<a-icon type="delete"  @click="deleteFn()"></a-icon>
							</span>
						</div>
					</div>
		
					<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='选择标签：'>
						<a-select :allowClear="true" :defaultValue="queryForm.robotLabel" placeholder="请选择。。。" @change="changeRobot" mode="multiple">
							<a-select-option :key="items.id" v-for="(items,index) in robotLabelAll">
								{{items.title}}
							</a-select-option>
						</a-select>
					</a-form-item>
					
					<a-form-item :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }" label=' ' :colon="false" style="text-align: right">
						<a-button type='primary' htmlType='submit' style="margin-right: 10px">提交</a-button>
						<a-button @click="com_handleCancel">取消</a-button>
					</a-form-item>
				</a-form>
			</a-col>
		</a-row>
		<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
			<img alt="example" style="width: 100%" :src="mediapath" />
		</a-modal>
	</div>
</template>

<script>
	
	var storage = require('../../common/store')
	export default {
		name: "editRobot",
		data() {
			return {
				labelCol: {
					xs: {
						span: 24
					},
					sm: {
						span: 6
					},
				},
				wrapperCol: {
					xs: {
						span: 24
					},
					sm: {
						span: 18
					},
				},
				mediapath: '',
				queryForm: { // 查询参数
					mobile_serial:'',
					nickname:'',
					tel:'',
					robotLabel:[]
				},
				previewVisible: false,
				loading: false,
				form: this.$form.createForm(this),
				headers: {
					Authorization: storage.store.get('token')
				},
				robotLabelAll:[],
				is_number:false,
				tip:'请输入11位手机号码',
			}

		},
		methods: {
			input_tel(e){
				const { value } = e.target
				let that = this;
				this.queryForm.tel = value;
				
			        
				 const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
			      if ((!isNaN(value) && reg.test(value))) {
			        if(value.length>11){
			        	that.queryForm.tel = value.slice(0,value.length-1);
			        }else if(value.length==11){
			        	that.is_number = true;
			        	that.tip = ''
			        }else if(value.length<11){
			        	that.tip = '请输入11位手机号码';
			        	that.is_number = false;
			        }
			      }else{
			      	that.is_number = false;
			      	that.tip = '请输入11位手机号码';
			      	del();
			    }
		       	function del(){
					var regNum = /^[0-9]+.?[0-9]*$/;
					 if (!regNum.test(value.charAt(value.length - 1) ) ) {
					 	console.log(value.charAt(value.length - 1) )
					 	that.queryForm.tel = value.split(value.charAt(value.length - 1)).join('')
				    }
		      	}
			},
			changeRobot(value) {
				this.queryForm.robotLabel = value;
			},
			com_handleCancel() {
				this.$router.push({
					path: '/systemManage/robotManage'
				})
			},
			handleChange(info) {
				if(info.file.status === 'uploading') {
					this.loading = true
					return
				}
				if(info.file.status === 'done') {
					if(info.file.response.status == 1) {
						this.mediapath = info.file.response.data.path;
						this.loading = false;
					} else {
						this.$notification['warning']({
							message: '上传错误',
							description: info.file.response.msg,
						});
					}
				} else if(info.file.status === 'error') {
					this.$notification['warning']({
						message: '上传失败',
						description: '文件' + info.file.name + '上传失败',
					});
				}
			},

			beforeUpload(file) {
				console.log(file.type === 'image/jpeg')
				const isJPG = file.type === 'image/jpeg' ? true : file.type === 'image/png' ? true : file.type === 'image/jpg' ? true : false
				if(!isJPG) {
					this.$notification['warning']({
						message: '文件格式不正确',
						description: '文件格式不正确，请选择JPG或PNG。',
					});
				}
				const isLt2M = file.size / 1024 / 1024 < 1
				if(!isLt2M) {
					this.$notification['warning']({
						message: '超出文件大小限制',
						description: '图像不能大于1MB！',
					});
					this.$message.error('图像不能大于1MB！')
				}
				return isJPG && isLt2M
			},
			handlePreview(img) {
				this.mediapath = img;
				this.previewVisible = true
			},
			handleCancel() {
				this.previewVisible = false
			},
			deleteFn() {
				this.mediapath = '';
			},
			
			com_handleOk(e) {
				let that = this;
				
				if(!that.queryForm.mobile_serial){
					return false;
				}
				
				
				if(that.mediapath){//更换头像
					let avatar_url_data = {
	                    cmd:2031,
	                    fromClientId:this.$store.state.user.user.user_id,
	                    toClientId:that.queryForm.username,
	                    cmdData:{
	                        headImage :that.mediapath
	                    },
	                    priority:0
                	}
	                this.$ws.sendMsgFun(avatar_url_data);
	                this.$ws.cmd2031=function (wsMsg) {
	                	console.log('更换头像',wsMsg)
	                }
				}
				
				
				if(that.queryForm.nickname){//更换昵称
					let nickname_data = {
	                    cmd:2027,
	                    fromClientId:this.$store.state.user.user.user_id,
	                    toClientId:that.queryForm.username,
	                    cmdData:{
	                        nickname :that.queryForm.nickname
	                    },
	                    priority:0
                	}
	                this.$ws.sendMsgFun(nickname_data);
	                this.$ws.cmd2027=function (wsMsg) {
	                	console.log('昵称',wsMsg)
	                }
				}
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/system/robot-update',
					data: Object.assign(that.queryForm, {
						'avatar_url': that.mediapath,
					}) // 参数
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.$notification['success']({
							message: '成功',
							description: '保存成功',
							duration: 1
						});
						setTimeout(() => {
							that.$router.push({
								path: '/systemManage/robotManage'
							})
						}, 1000);
					}
				});
			},
			refreshGroup(){
				let that = this;
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/system/robot-detail',
					data: Object.assign({}, {
						'robot_id': that.$route.query.id,
					}) // 参数
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.queryForm.robotLabel = [];
						that.queryForm.mobile_serial = udata.data.robot.mobile_serial;
						that.queryForm.nickname = udata.data.robot.nickname;
						that.queryForm.tel = udata.data.robot.tel;
						that.mediapath = udata.data.robot.avatar_url;
						that.queryForm.username =  udata.data.robot.username;
						that.queryForm.id =  udata.data.robot.id;
						that.robotLabelAll = udata.data.robotLabelAll;
						
						udata.data.robotLabel.forEach((item)=>{
							that.queryForm.robotLabel.push(item.id);
						});
					}
				});
			},
		},
		mounted() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		created: function() {
			this.refreshGroup();
		}
	}
</script>
<style scoped lang="less">
	.background-color{
		background: #fff;
		height: calc(~'100vh - 110px');
		overflow-y: auto;
	}
	.mag_push_title {
		border-bottom: 1px solid rgb(187, 187, 187);
		margin: 0 0 20px 0;
		padding: 17px 38px;
		font-size: 16px;
		background: #fff;
	}
	
	.upload{
		position: relative;
		height: 112px;
		width: 112px;
		margin-left: 25%;
		float: none !important;
		.up_loading{
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -7px;
			margin-left: -7px;
		}
		svg{
			font-size: 22px;
		}
	}
	
	.loading {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -7px;
		margin-left: -7px;
	}
</style>