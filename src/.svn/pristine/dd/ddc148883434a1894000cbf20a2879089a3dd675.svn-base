<template>
	<div class="background-color robotManage">
		<a-row>
			<a-col span="20" style="padding-right: 20px;">
				<div class="col-margin">
					<a-form layout="inline">
						<a-form-item>
							<a-input-search placeholder="请输入机器人编号、昵称、手机号" v-model="searchKey" style="width: 300px;" @search="onSearch" />
						</a-form-item>
						<a-form-item>
							<a-checkbox @change="onCheckBox" v-model="abnormal">仅显示异常</a-checkbox>
						</a-form-item>
						<a-form-item>
							<div class="ant-alert">
								<a-icon type="info-circle" theme="twoTone" class="circle_icon" />
								<span class="ant-info">总共 {{robotStatus.total}} 台机器  正常 {{robotStatus.normal}} 台    告警 {{robotStatus.alarm}} 台   故障 {{robotStatus.fault}} 台 </span>
							</div>
						</a-form-item>
					</a-form>
				</div>
				<div class="tab">
					<a-list :grid="{gutter: 24, lg: 4, md: 1, sm: 1, xs: 1}" :dataSource="robotList">
					    <a-list-item slot="renderItem" slot-scope="item, index">
					    	<div class="robot_box clearFloat" :class="item.status==2?'robot_error':item.status==1?'robot_warning':''" @click="getRobotInfo(item.id)">
					    		<div class="fl state_info">
					    			<div class="title">{{item.mobile_serial}}</div>
					    		</div>
					    		<div class="fr robot_info">
					    			<div class="tel" >{{item.nickname}}{{item.tel?item.tel:''}}</div>
					    			
					    		</div>
					    	</div>
					    </a-list-item>
  					</a-list>
				</div>
			</a-col>
			<a-col span="4" style="padding:0 20px; border-left:1px solid #bbb ;height:calc(100vh - 90px);">
				<div class="robot_detail">
					<div class="handler clearFloat">
						<div class=" title">{{robot_detail_robot.mobile_serial}}</div>
						<div >
							<a-button type='primary' :disabled="!robot_detail_robot.id" @click="edit(robot_detail_robot.id)" style="margin-right: 10px">编辑</a-button>
							<a-button type='primary' :disabled="!robot_detail_robot.id" @click="upInfo(robot_detail_robot.username)">更新</a-button>
						</div>
					</div>
					
					<div class="card">
						<div class="head_pic clearFloat">
							<div class="h_text fl">
								<span class="label">头像：</span>
								<div class="img">
									<img :src="robot_detail_robot.avatar_url" />
								</div>
							</div>
							<div class="fr avatar">
								<a-tooltip placement="left">
							        <template slot="title">
							          <span>
							          	<img :src="robot_detail_robot.qrcode" />
							          </span>
							        </template>
							        <div class="img">
										<img :src="robot_detail_robot.qrcode" />	
							        </div>
							    </a-tooltip>
							</div>
						</div>
						
						<div class="card_dec">
							<span class="label">昵称：</span>
							<span class="desc">{{robot_detail_robot.nickname}}</span>
						</div>
						<div class="card_dec">
							<span class="label">wxid：</span>
							<span class="desc">{{robot_detail_robot.username}}</span>
						</div>
						<!--<div class="card_dec">
							<span class="label">个性签名：</span>
							<span class="desc">这个人很懒什么都没有留下!</span>
						</div>-->
						
						<div class="card_dec">
							<span class="label">机器标签：</span>
							<span class="label_btn" v-for="item in robot_detail_label">
								{{item.title}}
							</span>
						</div>
					</div>
					
					<div class="info_box">
						<!--<div class="in_detail">-->
							<!--<span class="label">电量：</span>-->
							<!--<span class="desc">{{robot_detail_robot.batterylevel}}%</span>-->
							<!--<span class="in_state">{{robot_detail_robot.chargeInfo==1?'在充电':'未充电'}}</span>-->
						<!--</div>-->
						<!--<div class="in_detail">-->
							<!--<span class="label">可用CPU：</span>-->
							<!--<span class="desc">{{robot_detail_robot.cpu}}%</span>-->
						<!--</div>-->
						<!--<div class="in_detail">-->
							<!--<span class="label">剩余内存：</span>-->
							<!--<span class="desc">{{robot_detail_robot.memory}}%</span>-->
						<!--</div>-->
						<!--<div class="in_detail">-->
							<!--<span class="label">可用磁盘：</span>-->
							<!--<span class="desc">{{robot_detail_robot.disk}}%</span>-->
						<!--</div>-->
						<div class="in_detail">
							<span class="label">上次心跳：</span>
							<span class="desc">{{robot_detail_robot.active_time}}</span>
						</div>
					</div>
					
				</div>
			</a-col>
		</a-row>
		
	</div>
</template>
<script>
	
	export default {
		name: "robotManage",
		data() {
			return {
				robotStatus:{},
				robotList: [],
				robot_detail_robot:{},
				robot_detail_label:[],
				searchKey:'',
				abnormal: true,
			}
		},

		mounted() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		computed: {
			departmentID() {
				return this.$store.state.user.user.department.id //返回store实例的count状态
			},
		},
		methods: {
			
			onSearch(value) {
				this.searchKey = value;
				this.refreshGroup();
			},
			onCheckBox(e) {
				this.abnormal = e.target.checked;
				this.refreshGroup();
			},
			edit(id){
				 this.$router.push({path:'/systemManage/editRobot',query:{'id':id}});
			},
            upInfo(username) {
                let data = {
                    cmd:2036,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:username,
                    cmdData:{
                        username:username
                    }
                }
                this.$ws.sendMsgFun(data)
                this.$message.success('已更新，需要刷新页面获取最新信息')
			},
			getRobotInfo(id){
				
				let that = this;
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/system/robot-detail',
					data: Object.assign({}, {
						'robot_id': id,
					}) // 参数
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.robot_detail_robot = udata.data.robot;
						that.robot_detail_label = udata.data.robotLabel;
					}
				});
			
			},
			refreshGroup() {
				let that = this;
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/system/robot',
					data: Object.assign({}, {
						'searchKey':that.searchKey,
						'department_id': that.departmentID,
						'abnormal':that.abnormal?1:0 //是否筛选异常（0 不筛选；1 筛选；）
					}) // 参数
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.robotStatus = udata.data.robotStatus;
						that.robotList = udata.data.robotList;
                        that.getRobotInfo(that.robotList[0].id)
					}
				});
			}
		},
		created: function() {
			this.refreshGroup();
		},
	}
</script>
<style>
	.background-color {
		height: calc(100vh - 90px);
		overflow-y: auto;
	}
</style>
<style lang="less" scoped>
		img{
			height: 100%;
			width: 100%;
		}
		.robot_detail{
			padding-top: 10px;
			.label{
				color: #101010;
			}
			.handler{
				.title{
					color: #101010;
					text-align: left;
					overflow: hidden;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				    font-size: 20px;
				}
			}
			.card{
				margin-top: 30px;
				background: #fff;
				padding: 10px;
				.head_pic{
					padding-bottom: 10px;
					.h_text{
						width: 50%;
						span{
							vertical-align: middle;
						}
						.img{
							display: inline-block;
							height: 35px;
							width: 35px;
							border-radius: 50%;
							img{
								border-radius: 50%;
							}
						}
					}
					.avatar{
						width: 50%;
						text-align: right;
						.img{
							display: inline-block;
							height: 30px;
							width: 30px;
							cursor: pointer;
						}
					}
				}
				.card_dec{
					padding-bottom: 10px;
					.label_btn{
						padding: 5px 10px;
						display: inline-block;
						color: #a6aaae;
						background-color: #f3f3f3;
						margin-bottom: 5px;
						border-radius: 5px;
					}
				}
			}
			.info_box{
				margin-top: 30px;
				background: #fff;
				padding: 10px;
				.in_detail{
					padding-bottom: 10px;
				}
			}
		}
		
		
		.robot_error .robot_info,.robot_warning .robot_info{
			border-left:1px solid #fff !important;
		}
			
		.robot_warning{
			background: #faad14 !important;
			color: #fff !important;
		}
		.robot_error{
			background: #ff5050 !important;
			color: #fff !important;
		}
		.ant-list-item::after{
			content: '';
			height:'';
			visibility: hidden;
			clear: both;
		}
		.robot_box{
			height:44px;
			cursor: pointer;
			background: #fff;
			border-radius:10px ;
			padding: 10px;
			color: #101010;
			text-align: center;
			.state_info{
				width: 50%;
				padding-right: 20px;
				.title{
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size:14px ;
				}
				
			}
			.robot_info{
				border-left:1px solid #bbb;
				width: 50%;
				padding-left: 20px;
				.tel{
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size:14px ;
				}
			}
		}
	.tab {
		margin: 20px 20px 50px 20px;
	}
	
	.robotManage .col-margin {
		padding: 20px;
		background: #fff;
	}
	
	.ant-alert {
		font-size: 14px;
		font-variant: tabular-nums;
		line-height: 1.5;
		color: rgba(0, 0, 0, .65);
		box-sizing: border-box;
		margin: 0 0 0 0;
		list-style: none;
		position: relative;
		padding: 5px 15px 5px 37px;
		border-radius: 4px;
		border: 1px solid #91d5ff;
		background-color: #e6f7ff;
		display: inline-block;
	}
	
	.ant-info span {
		color: #1890ff;
		margin: 0 2px;
	}
	
	.ant-info .pointer {
		cursor: pointer;
		margin-left: 20px;
	}
	
	.circle_icon {
		top: 8px;
		left: 12px;
		position: absolute;
		svg {
			font-size: 16px;
		}
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
</style>