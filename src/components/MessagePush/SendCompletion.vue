<template>
	<div>
		<a-row type="flex" justify="start" class="group">
			<a-col span="24">
				<a-table :columns="columns" :dataSource="dataSource" @change="onShowSizeChange" :pagination="pagination">
					
					<template slot="content" slot-scope="text, record , index">
						<div v-html="record.content"></div>
					</template>
					
					<template slot="status" slot-scope="text, record, index">
						<!--0 未发送 10 发送中 20 已完成 30-已取消-->
							<div v-if="record.status==20?true:false">成功</div>
							<div  v-if="record.status==30?true:false" style="color: red;">失败{{record.failNum}}</div>
					</template>
					
					<template slot="operation" slot-scope="text, record, index">
						<span>-</span>
							<!--<a href="javascript:void(0)" @click="resend(record.id)">重发新用户</a>-->
					</template>

				</a-table>
			</a-col>
		</a-row>
	</div>
</template>

<script>
	
	const columns = [

		{
			title: '排序',
			dataIndex: 'id',
			align:'center',
			width:'10%',
			scopedSlots: {
				customRender: 'id'
			}
		},
		{
			title: '标签',
			dataIndex: 'label_names',
			align:'center',
			width:'12.5%',
			scopedSlots: {
				customRender: 'label_names'
			}
		},

		{
			title: '用户数',
			dataIndex: 'num',
			align:'center',
			width:'12.5%',
			scopedSlots: {
				customRender: 'num'
			}
		},
		{
			title: '发送内容',
			dataIndex: 'content',
			align:'left',
			width:'20%',
			scopedSlots: {
				customRender: 'content'
			}
		}, {
			title: '发送时间',
			dataIndex: 'send_time',
			align:'center',
			width:'12.5%',
			scopedSlots: {
				customRender: 'send_time'
			},
		},
//		{
//			title: '结束时间',
//			dataIndex: 'end_time',
//			align:'center',
//			width:'12.5%',
//			scopedSlots: {
//				customRender: 'end_time'
//			},
//		},
		{
			title: '状态',
			dataIndex: 'status',
			align:'center',
			width:'10%',
			scopedSlots: {
				customRender: 'status'
			},
		},
		{
			title: '操作',
			dataIndex: 'operation',
			align:'center',
			width:'10%',
			scopedSlots: {
				customRender: 'operation'
			},
		}
	]
	
	export default {
		props: ['dataSource', 'pagination'],
		data() {
			return {
				columns,
			}
		},
		methods: {
			resend(id){
				this.$router.push({path:'/pushMange/NewPush',query:{'resend_id':id}});
			},
			onShowSizeChange(obj) {
				this.$emit('paginationFn', {
					'current': obj.current,
					'pageSize': obj.pageSize
				});
			},
		},
	}
</script>

<style scoped>
	.rich_text {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		background: transparent;
		color: #101010;
		overflow: hidden;
		white-space: pre-wrap;
		word-break: break-word;
		word-wrap: break-word;
		text-overflow: ellipsis;
		-webkit-box-align: start;
		-ms-flex-align: start;
		align-items: flex-start;
		height: 51px;
		font-size: 12px;
		text-align: left;
		line-height: 2;
	}
</style>