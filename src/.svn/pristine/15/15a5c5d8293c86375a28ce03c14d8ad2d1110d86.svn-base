<template>
	<div class="background-color">

		<a-row style="padding: 20px 20px 0 20px">
			<a-col span="12" style="text-align: left;">
				<a-input-search placeholder="请输入编号、标签名称" style="width: 200px;margin-bottom: 20px;" @search="onSearch" />
			</a-col>
			<a-col span="12" style="text-align: right;">
				<a-button type="primary" @click="new_create">新建</a-button>
			</a-col>
		</a-row>

		<a-tabs @change="callback">
			<a-tab-pane tab="部门标签" key="1">
				<departmental-label :pagination="pagination" :dataSource="dataList" v-on:paginationFn="pageDataFn" v-on:headCallBackDel="headCallDel" v-on:callBackEdit="editFn" class="tab"></departmental-label>
			</a-tab-pane>
			<a-tab-pane tab="公司标签" key="2">
				<departmental-label :pagination="pagination" :dataSource="dataList" v-on:paginationFn="pageDataFn" v-on:headCallBackDel="headCallDel" v-on:callBackEdit="editFn" class="tab"></departmental-label>
			
			</a-tab-pane>
		</a-tabs>

		<a-modal :title="flag==1?customerFlag==1?'添加客户标签':'编辑客户标签':flag==2?companyFlag==1?'添加公司标签':'编辑公司标签':''" :footer="null" :visible="visible" @cancel="com_handleCancel">
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
	import DepartmentalLabel from '../../components/dataManage/DepartmentalLabel'
	export default {
		name: "customerTag",
		components: {
			DepartmentalLabel,
		},
		data() {
			return {
				visible: false,
				tabs_key: 1,
				searchKey: '',
				department_id: this.$store.state.user.user.department.id, //部门id（公司的话就传0）
				edit_id:'',//编辑ID
				customerFlag:1,  //客户 -->区分新建还是编辑 1：新建   2：编辑
				companyFlag:1,  //公司 -->区分新建还是编辑 1：新建   2：编辑
				flag:1,//  1：客户  2：公司
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
			callback(key) { //tab切换返回值
				console.log(key)
				this.tabs_key = key;
				if(this.tabs_key == 1) {
					this.flag = 1;  //1：客户  2：公司
					this.department_id = this.$store.state.user.user.department.id; //部门
				} else {
					this.department_id = 0; //公司
					this.flag = 2  //1：客户  2：公司
				}
				this.refreshGroup();
			},
			new_create() {
				this.visible = true;
				this.edit_id = '';
				if(this.flag==1){
					this.customerFlag = 1;//客户 -->区分新建还是编辑 1：新建   2：编辑
				}else{
					this.companyFlag = 1;  //公司 -->区分新建还是编辑 1：新建   2：编辑
				}
				this.form.setFieldsValue({
					title: '',
					desc: '',
				})
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
			pageDataFn(obj) {
				console.log(obj)
				this.pagination.current = obj.current;
				this.pagination.pageSize = obj.pageSize;
				this.refreshGroup();
			},
			editFn(id,title,desc){
				if(this.flag==1){
					this.customerFlag = 2;//客户 -->区分新建还是编辑 1：新建   2：编辑
				}else{
					this.companyFlag = 2;  //公司 -->区分新建还是编辑 1：新建   2：编辑
				}
				
				
				this.edit_id = id;
				this.form.setFieldsValue({
					title: title,
				})
				this.form.setFieldsValue({
					desc: desc,
				})
				
				this.visible = true;
				console.log(title)
			},
			com_handleOk(e) {
				let that = this;
				e.preventDefault()
				this.form.validateFields((err, values) => {
					if(err) {
						console.log('Received values of form: ', values)
						return false;
					}

					let resUrl = '';
					if(this.flag==1){
						 resUrl = that.customerFlag==1?'/index.php?r=uc/material/customer-labeladd':'/index.php?r=uc/material/customer-labelupdate';
					}else{
						 resUrl = that.companyFlag == 1?'/index.php?r=uc/material/customer-labeladd':'/index.php?r=uc/material/customer-labelupdate';
					}
				
					this.$axios({
						method: 'POST',
						url: resUrl,
						data:  Object.assign(values,{
							'department_id':that.department_id,
							'id':that.edit_id   //编辑时传标签ID
						})
					}).then(function(d) {
						// 响应成功回调
						var udata = d.data;
						if(udata.status == 1) {
							that.$message.success(that.flag==1?that.customerFlag == 1?'新建成功':'保存成功':that.companyFlag==1?'新建成功':'保存成功', 2);
							that.visible = false;
							that.refreshGroup();
						}
					});
				
				})
			},
		   	headCallDel(id){
		   		let that = this;
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/material/customer-labeldel',
					data:  {
						'id':that.department_id,
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
			refreshGroup(){
				let that = this;
				
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/material/customer-label',
					data:  {
						'p':that.pagination.current,			//页码
						'n':that.pagination.pageSize,			//每页条数
						'department_id':that.department_id,
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