<template>
	<div class="view-material">
		<a-row>
			<a-col span="10">
				<div style="max-width:100%;word-break: break-all;padding: 16px" v-if="dataItem!=null">

					<div v-if="dataItem.type=='1'">
						<div class="div-edit" v-html="dataItem.content"></div>
					</div>
					<div v-if="dataItem.type=='2'" style="text-align: center;border: 1px solid #c2c2c2">
						<!--<a-card hoverable>-->
							<img alt="example" :src="dataItem.mediapath" slot="cover" style="max-height: 150px"/>
						<!--</a-card>-->
					</div>
					<div v-if="dataItem.type=='3'">

						<a-card hoverable>
							<img alt="example" :src="dataItem.mediapath" slot="cover" />
							<a-card-meta :title="dataItem.title">
								<template slot="description">{{dataItem.url}}</template>
							</a-card-meta>
						</a-card>
					</div>
					<div v-if="dataItem.type=='7'">
						<div class="ant-card ant-card-bordered ant-card-hoverable">
							<div class="ant-card-cover">
								<div class="ant-card-body">
									<div class="top_box">
										<div class="car_box">{{dataItem.title}}</div>
										<span>{{dataItem.alias}}</span>
									</div>
								</div>
								<div class="bottom_box">公众号名片</div>
							</div>
						</div>
					</div>
					<div v-if="dataItem.type=='8'">
						<a-card hoverable>
							<img alt="example" :src="dataItem.mediapath" slot="cover" />
							<a-card-meta :title="dataItem.title" :description="dataItem.desc">
								<a-avatar slot="avatar" :src="dataItem.iconurl" style="height:50px;width:50px" />
							</a-card-meta>
						</a-card>
					</div>
					<div v-if="dataItem.type=='9'">
						<a-card hoverable>
							<div class="ant-card-meta">
								<div class="ant-card-meta-detail">
									<div class="ant-card-meta-title">
										{{dataItem.title}}
									</div>
									<div class="ant-card-meta-description">
										<div class="div-edit" v-html="dataItem.content"></div>
									</div>
								</div>
							</div>

							<div class="clearFloat" style="margin-top: 20px;">
								<img :class="img_index%2==0?'fl':'fr'" alt="example" style="width: 49%;margin-bottom: 4px;" :src="img_src.src" slot="cover" v-for="(img_src,img_index) in dataItem.album" />
							</div>
						</a-card>
					</div>

				</div>
				<a-icon class='dynamic-delete-button' type='minus-circle-o' @click="() => emit()" />
			</a-col>
		</a-row>
	</div>
</template>

<script>
	export default {
		name: "viewMaterial",
		components: {
		},
		props: {
			dataItem: {
				type: Object,
				default: {}
			},
		},
		data() {
			return {

			}
		},
		methods: {
			emit() {
				this.$emit('click')
			}
		}
	}
</script>

<style>

</style>
<style scoped lang="less">
	.top_box {
		.car_box {
			display: inline-block;
			height: 100px;
			width: 100px;
			background: #fef1bc;
			color: #333;
			text-align: center;
			line-height: 100px;
			border-radius: 50%;
			letter-spacing: 3px;
			vertical-align: middle;
		}
		span {
			font-size: 20px;
			margin-left: 10px;
		}
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
	
	p {
		margin-bottom: 0;
	}
	
	.view-material {
		position: relative;
		background: #ffffff;
		margin: 10px 0;
		color: rgb(16, 16, 16);
		border-radius: 5px;
		cursor: pointer;
		margin-left: -16px;
		/*display: inline-block;*/
		/*max-width: 250px;*/
		/*margin-right: 60px;*/
	}
	
	.dynamic-delete-button {
		position: absolute;
		right: -26px;
		top: 50%;
		margin-top: -9px;
		cursor: pointer;
	}
	
	.dynamic-delete-button svg {
		font-size: 18px;
	}
	
	.view-material .ivu-card-head {
		padding: 0!important;
	}
	
	.w-a {
		width: auto!important;
		padding: 4px!important;
	}
</style>

<style scoped>
	.div-edit {
	    height: 100px;
	    border: 1px solid #c2c2c2;
	    overflow-y: auto;
	    line-height: 1.4;
	    padding: 10px;
	    outline: none;
	    word-break: break-all;
	    word-wrap: break-word;
	    white-space: pre-wrap;
	    max-width: 870px;
	}

	.bottom_box {
		padding: 7px 0;
		background: #fafafa;
		font-size: 12px;
		color: #5f5f5f;
		padding-left: 24px;
	}
</style>