<template>
	<div>
		<a-table :columns="columns" :dataSource="dataSource" @change="onShowSizeChange" :pagination="pagination">
			<!--<template slot="sort" slot-scope="text, record, index">
				<div class='editable-row-operations'>
					<span>
			          {{index<9?'00'+(index+1):index<100?'0'+(index+1):index}}
			        </span>
				</div>
			</template>-->
			
			<template slot="content" slot-scope="text, record , index">
				<div v-html="record.content"></div>
			</template>

			<template slot="operation" slot-scope="text, record, index">
				<div class='editable-row-operations'>
					<span>
						<a-popconfirm title="确定要删除吗?" @confirm="deleteFn(record.id)" @cancel="cancel" okText="确定" cancelText="取消">
				   			<a href="javascript:void(0);">删除</a>
						</a-popconfirm>
			        </span>
				</div>
			</template>
		</a-table>
	</div>
</template>
<script>
	

	
	const columns = [{
			title: '排序',
			dataIndex: 'id',
			//		width: '25%',
			scopedSlots: {
				customRender: 'id'
			},
		}, {
			title: '标签',
			dataIndex: 'label_names',
			//		width: '15%',
			scopedSlots: {
				customRender: 'label_names'
			},
		}, {
			title: '用户数',
			dataIndex: 'num',
			//		width: '40%',
			scopedSlots: {
				customRender: 'num'
			},
		}, {
			title: '发送内容',
			dataIndex: 'content',
			scopedSlots: {
				customRender: 'content'
			},
		},
		{
			title: '发送时间',
			dataIndex: 'send_time',
			scopedSlots: {
				customRender: 'send_time'
			},
		},
		{
			title: '操作',
			dataIndex: 'operation',
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
			deleteFn(id) {
				this.$emit('headCallBackDel', id);
			},
			cancel(e) {},
			onShowSizeChange(obj) {
				this.$emit('paginationFn', {
					'current': obj.current,
					'pageSize': obj.pageSize
				});
			},
		},
	}
</script>
<style scoped></style>