<template>
	<div style="margin: 24px 24px 0;">
		
		<div class="card-list" ref="content">
	    <a-list
	      :grid="{gutter: 24,xl:6, lg: 4, md: 3, sm: 1, xs: 1}"
	      :dataSource="dataSource"
	    >
	      <a-list-item slot="renderItem" slot-scope="item, index" class="card-box">
	        <a-card hoverable style="padding-bottom: 24px;">
	        	<div class="ant-card-meta">
	        			<div class="ant-card-meta-detail">
	        				<div class="ant-card-meta-title">
	        					{{item.title}}
	        				</div>
	        				<div class="ant-card-meta-description">
	        					<span v-html="item.content"></span>
	        				</div>
	        			</div>
	        		</div> 
	        		<div class="clearFloat img_box" >
	        			<div slot="cover" class="bgImg" :style="{ background:' url('+img_src.src+') no-repeat center',backgroundSize:'contain',width:'100%',height:'100%'}"  v-for="(img_src,img_index) in item.album" ></div>
								<!-- <img alt="example" :src="img_src.src" slot="cover" v-for="(img_src,img_index) in item.album" /> -->
	        		</div>
			</a-card>
			<div class="ant-card-actions">
            	<a-row>
            		<a-col span="12">
            			 <a-button type="primary" @click="editFn(item.id,item.title,item.content,item.album,item.type)" block>编辑</a-button>
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
		 
		components: {
		},
		data() {
			return {
			}
		},
		
		methods: {
			editFn(id,title,content,album,type){
	    		this.$router.push({
          			path: '/dataManage/editMaterial',
          			query: {'id':id,'tabs_key':6}
        		})
	    	},
	    	deleteFn(id){
	    		this.$emit('headCallBackDel', id); //第一个参数是父组件中v-on绑定的自定义回调方法，第二个参数为传递的参数
	    	},
	    	 cancel (e) {
		    }
		},
		created() {}
	}
</script>

<style lang="less" scoped>

.img_box{
    margin-top: 20px;
    width: 190px;
    height: 150px;
    margin-right: 0;
    margin: 20px auto 0;

}
.clearFloat:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}
	
	.clearFloat {
		zoom: 1
	}
	
	.fr {
		float: right;
	}
	
	.fl {
		float: left;
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
  .card-box{
  	
  .div-edit{
    	height: auto;
	    border: 0;
	    overflow-y: initial;
	    padding: 0;
	    outline: none;
	    word-break: break-all;
	    word-wrap: break-word;
	    white-space: pre-wrap;
	    max-width: initial;
	    margin: 0;
    }
  }
</style>