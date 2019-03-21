<template>
	<div class="background-color monitorManage">
		<div class="col-margin">
			<a-form @submit="handleSubmit" layout="inline">
				<a-form-item label="告警级别">
					<a-checkbox v-model="is_warning">告警</a-checkbox>
					<a-checkbox v-model="is_error">故障</a-checkbox>
				</a-form-item>

				<a-form-item>
					<a-input v-model="queryForm.searchKey" placeholder='请输入编号、昵称' style="width: 300px;" />
				</a-form-item>

				<a-form-item>
					<a-date-picker placeholder="开始日期" @change="onChangeStart" />
				</a-form-item>

				<a-form-item>
					<a-date-picker placeholder="结束日期" @change="onChangeEnd" />
				</a-form-item>
				<a-form-item style="float: right">
					<a-button @click="refresh">刷新</a-button>
				</a-form-item>
				<a-form-item style="float: right">
					<a-button type='primary' htmlType='submit'>查询</a-button>
				</a-form-item>

			</a-form>
		</div>

		<div class="tab">
			<a-table :columns="columns" :dataSource="dataList" @change="onShowSizeChange" :pagination="pagination">
				<template slot="level" slot-scope="text, record, index">
					<div class='editable-row-operations'> 
						 <a-badge :status="record.level==0?'success':record.level==1?'warning':'error'" />
						 <span :style="{color:record.level==0?'#52c41a':record.level==1?'#faad14':'#f5222d',verticalAlign:'middle'}">{{record.level==0?'正常':record.level==1?'告警':'故障'}}</span>
					</div>
				</template>
			</a-table>
		</div>

	</div>
</template>
<script>
	const columns = [{
			title: '编号',
			dataIndex: 'mobile_serial',
			align: 'center',
			scopedSlots: {
				customRender: 'mobile_serial'
			},
		}, {
			title: '昵称',
			dataIndex: 'nickname',
			align: 'center',
			scopedSlots: {
				customRender: 'nickname'
			},
		},
		 {
			title: '级别',
			dataIndex: 'level',
			align: 'center',
			scopedSlots: {
				customRender: 'level'
			},
		},
		{
			title: '信息',
			dataIndex: 'desc',
			align: 'center',
			scopedSlots: {
				customRender: 'desc'
			},
		},
		
		{
			title: '时间',
			dataIndex: 'created',
			align: 'center',
			scopedSlots: {
				customRender: 'created'
			},
		}
	]
	export default {
		name: "monitorManage",
		data() {
			return {
				columns,
				dataList: [],
				queryForm: { // 查询参数
					searchKey: '',
					startTime: '',
					endTime: ''
				},
				is_warning: true,
				is_error: true,
				form: this.$form.createForm(this),

				pagination: {
					showQuickJumper: true,
					showSizeChanger: true,
					pageSizeOptions: ['10', '20', '30', '40', '50'],
					current: 1,
					pageSize: 10,
					total: 0,
					showTotal: function(total, range) {
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
		computed: {
			departmentID() {
				return this.$store.state.user.user.department.id //返回store实例的count状态
			},
		},
		methods: {
			optionChange(current, pageSize) {
				this.pagination.pageSize = pageSize;
				this.refreshGroup();
			},
			onShowSizeChange(page, pageSize) {
				console.log(page, pageSize)
				this.pagination.current = page;
				this.refreshGroup();
			},

			handleSubmit(e) {
				this.refreshGroup();
				console.log(this.queryForm)
			},
			refresh() {
				this.refreshGroup();
			},
			onChangeStart(date, dateString) {
				this.queryForm.startTime = dateString;
			},
			onChangeEnd(date, dateString) {
				this.queryForm.endTime = dateString;
			},

			refreshGroup() {
				let that = this;
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/system/monitor-alarm',
					data: Object.assign(that.queryForm, {
						'alarm':that.is_warning?1:0,
						'fault':that.is_error?1:0,
						'department_id': that.departmentID,
						'p': that.pagination.current,
						'n': that.pagination.pageSize
					}) // 参数
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.pagination.total = parseInt(udata.data.robotAlarm.count); //数据总条数
						that.dataList = udata.data.robotAlarm.list;
					}
				});
			}
		},
		created: function() {
			this.refreshGroup();
		},
		mounted() {},
		beforeUpdate() {}
	}
</script>
<style>
	.background-color {
		height: calc(100vh - 90px);
		overflow-y: auto;
	}
</style>
<style lang="less" scoped>
	.tab {
		margin: 20px 20px 50px 20px;
	}
	
	.monitorManage .col-margin {
		padding: 20px 20px 0px;
	}
	
	.background-color {
		background: #fff;
	}
	
</style>