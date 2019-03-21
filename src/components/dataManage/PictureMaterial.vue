<template>
	<div style="margin: 24px 24px 0;" class="img_style">
		<a-list :grid="{gutter: 24,xl:6, lg: 4, md: 3, sm: 1, xs: 1}" :dataSource="dataSource" >
	        <a-list-item slot="renderItem" slot-scope="item, index">
	            <a-card hoverable>
					<!-- <img alt="example" :src="item.mediapath" slot="cover" /> -->
					<div slot="cover" class="bgImg" :style="{ background:' url('+item.mediapath+') no-repeat center',backgroundSize:'contain',width:'100%',height:'100%'}"></div>
					<div class="cover_box"  slot="cover">
						<div class="cover" slot="cover"></div>
						<a-icon type="form" class="btn" @click="editFn(item)" />
						<span >
							<a-popconfirm title="确定要删除吗?" @confirm="deleteFn(item.id)" @cancel="cancel" okText="确定" cancelText="取消">
								<a-icon class="btn" type="delete" />
							</a-popconfirm>
						</span>
					</div>
				</a-card>
	        </a-list-item>
	    </a-list>
	</div>
</template>


<script>
	export default {
		name: "PictureMaterial",
		 props:['dataSource'],
		data() {
			return {
//				dataSource
			}
		},
		
		methods: {
			editFn (item) { //回调方法，接收子组件传的参数
				this.$router.push({
          			path: '/dataManage/editMaterial',
                    query: {'id':item.id,'tabs_key':2,'ask':item.ask}
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
<style>
	 .ant-card-bordered {
		 border: 1px dashed #5da6e8;
	 }
	 .img_style .ant-card-cover > * {
		 width: auto;
		 display: block;
	 }
	 .img_style .ant-card-cover {
		 line-height: 145px;
		 text-align: center;
	 }
	 .img_style .ant-card-cover img {
		 /* width: 100%; */
		 /*height: 100%;*/
		  margin: 0 auto;
		  max-width: 100%;
		  max-height: 100%;
		  display: inline-block;
		  vertical-align: middle;
	}
</style>
<style lang="less">

	.btn svg{
		font-size: 20px;
	}
	.ant-card-cover{
		position: relative;
		.cover_box{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			text-align: center;
			.cover{
				opacity: 1;
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
				z-index: 10;
			}
			.btn{
				position: absolute;
				top: 50%;
				margin-top: -16px;
				z-index: 10;
				display: none;
			}
			
			.btn:nth-last-child(1){
				left: 53%;
			}
			.btn:nth-last-child(2){
				left: 30%;
			}
		}
		.cover_box:hover .btn{
			display: block;
			color: #fff;
		}
		.cover_box:hover .cover{
			opacity: 0.52;
			background-color: rgb(136, 136, 136);
		}
	}
	
</style>