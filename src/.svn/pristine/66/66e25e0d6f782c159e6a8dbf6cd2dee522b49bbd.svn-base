<template>
	<div>
		<a-table :columns="columns" :dataSource="dataSource"  @change="onShowSizeChange" :pagination="pagination">
			<template slot="operation" slot-scope="text, record, index">
				<div class='editable-row-operations'>
					<span style="margin-right: 10px;">
			          	<a @click="() => editFn(record.id,record.title,record.desc)">编辑</a>
			        </span>
			        <span>
			        	<a-popconfirm title="你确定要删除吗？" placement="top" @confirm="deleteFn(record.id)" okText="确定" cancelText="取消">
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
		title: '编号',
		dataIndex: 'id',
		align:'center',
		width:'100px',
		scopedSlots: {
			customRender: 'id'
		},
	}, {
		title: '标签名称',
		dataIndex: 'title',
		align:'center',
		scopedSlots: {
			customRender: 'title'
		},
	}, {
		title: '标签备注',
		dataIndex: 'desc',
		align:'center',
		scopedSlots: {
			customRender: 'desc'
		},
	}, 
	{
		title: '操作',
		dataIndex: 'operation',
		align:'center',
		scopedSlots: {
			customRender: 'operation'
		},
	}]
	export default {
		props:['dataSource','pagination'],
		data() {
			return {
				columns,
			}
		},
		methods: {
			editFn(id,title,desc){
				this.$emit('callBackEdit', id,title,desc);
			},
			deleteFn (id) {
				this.$emit('headCallBackDel', id);
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
<style scoped></style>