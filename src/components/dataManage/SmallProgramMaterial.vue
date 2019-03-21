<template>
	<div style="margin: 24px 24px 0;">
		<div class="card-list" ref="content">
	    <a-list
				:grid="{gutter: 24,xl:6, lg: 4, md: 3, sm: 1, xs: 1}"
	      :dataSource="dataSource"
	    >
	      <a-list-item slot="renderItem" slot-scope="item, index" class="card-box">
	        <a-card :hoverable="true" class="ant-card-body">
	        	<a-card-meta :title="item.title" :description="item.desc">
			    	<a-avatar slot="avatar" :src="item.iconurl" />
			  </a-card-meta>
		       <!-- <img alt="example" :src="item.mediapath" slot="cover" /> -->
					 <div slot="cover" class="bgImg" :style="{ background:' url('+item.mediapath+') no-repeat center',backgroundSize:'contain',width:'100%',height:'100%'}"></div>
	        </a-card>
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
		 props:['dataSource'],
		data() {
			return {}
		},
		
		methods: {
	    	editFn(item){
	    		 this.$router.push({
          			path: '/dataManage/editMaterial',
                     query: {'id':item.id,'tabs_key':5,'ask':item.ask}
        		})
	    	},
	    	deleteFn(id){
	    		this.$emit('headCallBackDel', id); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
	    	},
		    cancel (e) {
		    }
		},
		created() {
		}
	}
</script>

<style lang="less" scoped>

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