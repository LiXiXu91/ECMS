<template>
	<div style="margin: 24px 24px 0;">
		<div class="card-list" ref="content">
			<a-list :grid="{gutter: 24,xl:6, lg: 4, md: 3, sm: 1, xs: 1}" :dataSource="dataSource">
				<a-list-item slot="renderItem" slot-scope="item, index"  class="card-box">

					<div class="ant-card ant-card-bordered ant-card-hoverable">
						<div class="ant-card-body">
							<div class="ant-card-meta top_box">
								<div class="ant-card-meta-avatar">
									<span  class="ant-avatar ant-avatar-circle ant-avatar-image car_box">
										{{item.title}}
									</span>
								</div>
								<div class="ant-card-meta-detail">
									<div class="ant-card-meta-title">{{item.alias}}</div>
								</div>
							</div>
						</div>
						<div class="bottom_box">公众号名片</div>
					</div>
												

					<div class="ant-card-actions">
		            	<a-row>
		            		<a-col span="12">
		            			 <a-button type="primary" @click="editFn(item)" block>编辑</a-button>
		            		</a-col>
		            		<a-col span="12">
		            			 <a-popconfirm title="确定要删除吗?" @confirm="deleteFn(item.id)" @cancel="cancel" okText="确定" cancelText="取消">
						   			<a-button class="waring_btn" block>删除</a-button>
								</a-popconfirm>
		            		</a-col>
		            	</a-row>
	            	</div>
				</a-list-item>
			</a-list>
		</div>

	</div>
</template>

<script>
	export default {
		name: "TextualMaterial",
		props: ['dataSource'],
		data() {
			return {
				//				dataSource
			}
		},

		methods: {
			editFn(item) {
				this.$router.push({
          			path: '/dataManage/editMaterial',
                    query: {'id':item.id,'tabs_key':4,'ask':item.ask}
        		})
			},
			deleteFn(id) {
				this.$emit('headCallBackDel', id); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
			},
			cancel (e) {
		    }
		},
		created() {}
	}
</script>

<style lang="less" scoped>
	/*.ant-card-bordered{*/
			/*border:1px solid #F4B06C;*/
			/*border-radius: 5px 5px 0 0;*/
	/*}*/
		.top_box {
			.car_box {
				display: inline-block;
			    height: 8em;
			    width: 8em;
			    background: #fef1bc;
			    color: #333;
			    text-align: center;
			    line-height: 8em;
			    border-radius: 50%;
			    letter-spacing: 3px;
			    vertical-align: middle;
			    font-size: 0.9em;
			    margin: 0 0 0 45px;
			}
			.ant-card-meta-detail{
				margin-top: 16%;
			}
		}
	
	.bottom_box {
		padding: 7px 0;
		background: rgb(240, 250, 255);
		font-size: 12px;
		color: #5f5f5f;
		text-align:center;
		margin-bottom: 33px;
	}
	
	

	.card-box:hover .ant-card-actions{
		opacity: 1;
	}
  .ant-card-actions {
	  	position: relative;
		top: -34px;
	  	opacity: 0;
	  	border-top: 1px solid #e8e8e8;
	    zoom: 1;
	    list-style: none;
	    margin: 0;
	    padding: 0;
	    background: #f7f9fa;
    .ant-btn{
    	border-radius: 0;
    	color: #fff;
    }
    .waring_btn{
    	background: #F4B06C;
    }
    .waring_btn:hover{
    	border: 1px solid #F4B06C;
    }
  }
</style>