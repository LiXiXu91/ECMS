<template>
	<div class="background-color">

		<a-row style="padding: 20px 20px 0 20px">
			<a-col span="12" style="text-align: left;">
				<a-input-search placeholder="请输入标签名称搜索" style="width: 200px;margin-bottom: 20px;" @search="onSearch" />
			</a-col>
			<a-col span="12" style="text-align: right;">
				<a-button type="primary" @click="new_create">新建</a-button>
			</a-col>
		</a-row>
		
		
		<div class="tab">
			<a-table :columns="columns" :dataSource="dataList"  @change="onShowSizeChange" :pagination="pagination">
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
		

		<a-modal :title="robotFlag==1?'添加机器人标签':'修改机器人标签'" :footer="null" :visible="visible" @cancel="com_handleCancel">
			<a-form @submit="com_handleOk" :form="form">
				<a-form-item :wrapperCol="{span: 24}" label="标签名称：">
					<a-input @change="this.input_name" placeholder='请输入标签名称。。。' v-decorator="[ 'title', {rules: [{ required: true, message: '不能为空' }]}]" />
				</a-form-item>

				<a-form-item :wrapperCol="{span: 24}" label="标签备注：">
					<a-input @change="this.desc" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }" placeholder='请输入标签备注。。。' v-decorator="[ 'desc']" />
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
	
                
	const columns = [{
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
		name: "robotTag",
		components: {
		},
		data() {
			return {
				columns,
				visible: false,
				searchKey: '',
				edit_id:'',//编辑ID
				robotFlag:1,  //机器人 -->区分新建还是编辑 1：新建   2：编辑
				dataList:[],
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
		beforeCreate() {
			this.form = this.$form.createForm(this);
			this.form.getFieldDecorator('desc', {
				initialValue: ['']
			});
			this.form.getFieldDecorator('title', {
				initialValue: ['']
			});
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
			com_handleCancel() {
				this.visible = false;
			},
			desc(value) {
				this.form.setFieldsValue({
					desc: value,
				})
			},
			input_name(value) {
				this.form.setFieldsValue({
					title: value,
				})
			},
			deleteFn (id) {//删除
		   		let that = this;
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/material/robot-labeldel',
					data:  {
						'id_arr':[id]
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
			new_create() {//新建
				this.visible = true;
				this.edit_id = '';
				this.robotFlag = 1;//机器人 -->区分新建还是编辑 1：新建   2：编辑
				this.form.setFieldsValue({
					title: '',
					desc: '',
				})
			},
			editFn(id,title,desc){//编辑
				this.robotFlag = 2;//机器人 -->区分新建还是编辑 1：新建   2：编辑
				this.edit_id = id;
				this.form.setFieldsValue({
					title: title,
				})
				this.form.setFieldsValue({
					desc: desc,
				})
				
				this.visible = true;
			},
			com_handleOk(e) {
				let that = this;
				e.preventDefault()
				this.form.validateFields((err, values) => {
					if(err) {
						console.log('Received values of form: ', values)
						return false;
					}
				
				let resUrl = that.robotFlag==1?'robot-labeladd':'robot-labelupdate';
				
					this.$axios({
						method: 'POST',
						url: '/index.php?r=uc/material/'+resUrl,
						data:  Object.assign(values,{
							'id':that.robotFlag==2?that.edit_id:''   //编辑时传标签ID
						})
					}).then(function(d) {
						// 响应成功回调
						var udata = d.data;
						if(udata.status == 1) {
							that.$message.success(that.robotFlag == 1?'新建成功':'保存成功', 2);
							that.visible = false;
							that.refreshGroup();
						}
					});
				
				})
			},
			refreshGroup(){
				let that = this;
				
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/material/robot-label',
					data:  {
						'p':this.pagination.current,			//页码
						'n':this.pagination.pageSize,			//每页条数
						'searchKey':that.searchKey
					}
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.pagination.total = parseInt(udata.data.total);
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
			this.refreshGroup();
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