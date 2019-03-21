<template>
	<div class="background-color">

		<a-row style="padding: 20px 20px 0 20px">
			<a-col span="12" style="text-align: left;">
				<a-select v-model="select_id" placeholder="请选择类别" style="width: 150px;margin-right: 20px;" @change="selChange">
			      <a-select-option v-for="(item,index) in selectList" :key="item.id">{{item.title}}</a-select-option>
			    </a-select>
				<a-input-search placeholder="请输入货号、名称查询" style="width: 200px;margin-bottom: 20px;" @search="onSearch" />
			</a-col>
			<a-col span="12" style="text-align: right;">
				<!--<a-button type="primary" @click="batch_create" style="margin-right: 20px;">批量新建</a-button>-->
				<a-button type="primary" @click="new_create">新建</a-button>
			</a-col>
		</a-row>
		
		
		<div class="tab">
			<a-table :columns="columns" :dataSource="dataList"  @change="onShowSizeChange" :pagination="pagination">
				<template slot="src" slot-scope="text, record, index">
					<a-popover  trigger="hover" placement="right" v-if="record.src.length>0?true:false">
					    <template slot="content">
					       <img :src="record.src[0].src" width="200px"  />
					    </template>
					    <img :src="record.src[0].src" width="60px"  height="60px" />
					</a-popover>
				</template>
				
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
	</div>
</template>
<script>
	const columns = [{
		title: '货号',
		dataIndex: 'item_number',
		align:'center',
		scopedSlots: {
			customRender: 'item_number'
		},
	}, 
	{
		title: '图片',
		dataIndex: 'src',
		align:'center',
		scopedSlots: {
			customRender: 'src'
		},
	},
	{
		title: '名称',
		dataIndex: 'title',
		align:'center',
		scopedSlots: {
			customRender: 'title'
		},
	}, 
	
	{
		title: '类别',
		dataIndex: 'class_name',
		align:'center',
		scopedSlots: {
			customRender: 'class_name'
		},
	}, 
	
	
	{
		title: '单价（元）',
		dataIndex: 'price',
		align:'center',
		scopedSlots: {
			customRender: 'price'
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
		name: "productInfo",
		components: {
		},
		data() {
			return {
				columns,
				searchKey: '',
				select_id:'',//分类id
				dataList:[],
				selectList:[],//分类列表
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
		methods: {
			onShowSizeChange(obj) {
				this.pagination.current = obj.current;
				this.pagination.pageSize = obj.pageSize;
				this.refreshGroup();
			},
			onSearch(value) {
				this.searchKey = value;
				this.refreshGroup();
			},
			
			selChange(value){
				this.select_id = value;//分类id
				this.refreshGroup();
			},
			deleteFn (id) {//删除
		   		let that = this;
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/product/goods-del',
					data:  {
						'id':id,
						'status':'10'//0-正常；10-删除
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
		    batch_create(){//批量新建
		    	this.$router.push({path:'/productManage/batch_add'});
		    },
			new_create() {//新建
				this.$router.push({path:'/productManage/new_add',query:{'create':'1','id':0}});
			},
			editFn(id){//编辑
				this.$router.push({path:'/productManage/new_add',query:{'create':'2','id':id}});
			},
			getSelect(){
				let that = this;
				this.$axios({//请求分类下拉列表
					method: 'GET',
					url: '/index.php?r=uc/product/get-class',
					params:{}
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.selectList = udata.data;
						that.select_id = that.selectList[0].id;
						that.refreshGroup();
					}
				});
			},
			refreshGroup(){
				let that = this;
				
				this.$axios({
					method: 'GET',
					url: '/index.php?r=uc/product/goods-list',
					params:{
						'p':that.pagination.current,			//页码
						'n':that.pagination.pageSize,			//每页条数
						'key':that.searchKey,
						'class_id':that.select_id				//分类id
					}
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.pagination.total = parseInt(udata.data.count);
						that.dataList = udata.data.list;
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
		computed: {
			
        },
		created() {
			this.getSelect();
		}
	}
</script>
<style>
	.background-color {
		background: #fff;
		height: calc(100vh - 90px);
		overflow-y: auto;
	}
</style>
<style scoped>
	.tab {
		margin: 0px 20px 50px 20px;
	}
</style>