<template>
	<div class="background-color">

		<a-row>
			<a-col span="24" style="text-align: right;">
				<a-button type="primary" style="margin: 0 20px;position: relative;top: 20px;z-index: 10" @click="new_push">新建</a-button>
			</a-col>
		</a-row>

		<a-tabs @change="callback">
			<a-tab-pane tab="待发列表" key="1">
				<waiting-list :pagination="pagination" :dataSource="dataList" v-on:paginationFn="pageDataFn" v-on:headCallBackDel="headCallDel" class="tab"></waiting-list>
			</a-tab-pane>
			<a-tab-pane tab="正在发送" key="2">
				<sending :dataSource="sendData" class="tab"></sending>
			</a-tab-pane>
			<a-tab-pane tab="发送完成" key="3">
				<send-completion :pagination="pagination" :dataSource="dataList" v-on:paginationFn="pageDataFn" class="tab"></send-completion>
			</a-tab-pane>
		</a-tabs>
	</div>
</template>

<script>
	var emoji = require('../../common/emojiMap');
	import SendCompletion from '../../components/MessagePush/SendCompletion'
	import Sending from '../../components/MessagePush/Sending'
	import WaitingList from '../../components/MessagePush/WaitingList'
	import { setTimeout, setInterval, clearInterval } from 'timers';
	export default {
		name: "privatePush",
		components: {
			SendCompletion,
			Sending,
			WaitingList,
		},
		data() {
			return {
				tabs_key: '1',
				dataList:[],
				sendData:{},
				intVal:null,
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
			}
		},
		mounted() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		methods: {
			callback(key) { //tab切换返回值
				console.log(key)
				this.tabs_key = key;
				this.refreshGroup();
			},
			new_push() {
				this.$router.push({path:'/pushMange/NewPush',query:{'pushType':'20'}});
			},
			pageDataFn(obj) {
				this.pagination.current = obj.current;
				this.pagination.pageSize = obj.pageSize;
				this.refreshGroup();
			},
		   headCallDel(id){
		   			let that = this;
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/sale/tasks-del',
					data:  {
						'id':id
					}
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.$message.success('删除成功', 2);
						that.refreshGroup();
					}
				});
		   },
			refreshGroup(){
				let that = this;
				if(parseInt(that.tabs_key)==2){
				//正在发列表
                    that.$axios({
                        method: 'POST',
                        url: '/index.php?r=uc/sale/circle-sending',
                        data:  {}
                    }).then(function(d) {
                        // 响应成功回调
                        var udata = d.data;
                        if(udata.status == 1) {
                            that.sendData = udata.data;
                            for(let i = 0; i < that.sendData.length; i++) {
                                that.sendData[i].content = emoji.stringToHtml(that.sendData[i].content)
                            }
                        }
                    });
                    clearInterval(this.intVal)
                    this.intVal = null
					this.intVal = setInterval(function(){
						that.$axios({
							method: 'POST',
							url: '/index.php?r=uc/sale/circle-sending',
							data:  {}
						}).then(function(d) {
							// 响应成功回调
							var udata = d.data;
							if(udata.status == 1) {
								that.sendData = udata.data;
								for(let i = 0; i < that.sendData.length; i++) {
									that.sendData[i].content = emoji.stringToHtml(that.sendData[i].content)
								}
							}
						});
					},5000)
					
				}else{
				//待发和已发列表
                    clearInterval(this.intVal)
                    this.intVal = null
					this.$axios({
						method: 'POST',
						url: '/index.php?r=uc/sale/tasks-list',
						data:  {
							'p':that.pagination.current,			//页码
							'n':that.pagination.pageSize,			//每页条数
							'status':that.tabs_key==1?0:that.tabs_key==3?20:'',		//0 未发送 20 已完成
							'push_type':20		//10 私聊推送 20 朋友圈推送
						}
					}).then(function(d) {
						// 响应成功回调
							var udata = d.data;
							if(udata.status == 1) {
								that.pagination.total = parseInt(udata.data.count);
								that.dataList = udata.data.list;
									for(let i = 0; i < that.dataList.length; i++) {
								that.dataList[i].content = emoji.stringToHtml(that.dataList[i].content)
							}
						}
					});
				}
			}
		},
		beforeCreate() {},
		created() {
			this.refreshGroup();
		},
		destroyed(){
            clearInterval(this.intVal);
            this.intVal = null
		},
		computed:{}
	}
</script>
<style>
	.background-color {
		height: calc(100vh - 90px);
    	overflow-y: auto;
	}
	
</style>
<style scoped>
	.background-color{
		background: #fff;
	}
	.tab {
		margin: 0px 20px 50px 20px;
	}
</style>