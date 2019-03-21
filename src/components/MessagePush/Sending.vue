<template>
	<div style="margin-top: 50px;">
		
		<a-row type="flex" justify="start" class="group">
			<a-col span="2">
				<span>发送进度</span>
			</a-col>
			<a-col span="15" class="container">
				<div class="box" :style="{left: dataSource.progress+'%'}">
					<div class="arrow bottom-arrow"></div>
					<div class="text">已发送{{dataSource.sending_number}}条</div>
				</div>
				<a-progress :percent="dataSource.progress" />
			</a-col>
		</a-row>
		<a-row type="flex" justify="start" class="group">
			<a-col span="2">
				<span>选择分组</span>
			</a-col>
			<a-col span="15" class="container">
				<span>{{dataSource.label_names}}</span>
			</a-col>
		</a-row>
		
		<a-row type="flex" justify="start" class="group">
			<a-col span="2">
				<span>发送总量</span>
			</a-col>
			<a-col span="15" class="container">
				<span>{{dataSource.num}}</span>
			</a-col>
		</a-row>
		<a-row type="flex" justify="start" class="group">
			<a-col span="2">
				<span>发送内容</span>
			</a-col>
			<a-col span="15" class="container">
				<a-row type="flex" justify="start">
					<a-col span="7">
						<span  v-html="dataSource.content"></span>
					</a-col>
					<!--<a-col span="12" push="1">
						<img src="https://pro.modao.cc/uploads3/images/2861/28611746/v2_pjkg1s.png" height="77" width="75" />
						<img src="https://pro.modao.cc/uploads3/images/2861/28611746/v2_pjkg1s.png" height="77" width="75" />
						<img src="https://pro.modao.cc/uploads3/images/2861/28611746/v2_pjkg1s.png" height="77" width="75" />
					</a-col>-->
				</a-row>
			</a-col>
		</a-row>
		<!--<a-row type="flex" justify="start" class="group">-->
			<!--<a-col span="24">-->
				<!--<h2 style="font-size: 20px;">失败记录</h2>-->
			<!--</a-col>-->
			<!--<a-col span="24">-->
				<!--<a-table :columns="columns" :dataSource="dataSource.failList">-->
					<!--<template slot="avatar_url" slot-scope="text, record, index">-->
						<!--<div class='editable-row-operations'>-->
							<!--<img :src="text" height="38" width="38" />-->
						<!--</div>-->
					<!--</template>-->
				<!--</a-table>-->
			<!--</a-col>-->
		<!--</a-row>-->
	</div>
</template>

<script>
	const columns = [{
		title: '用户头像',
		dataIndex: 'avatar_url',
		scopedSlots: {
			customRender: 'avatar_url'
		},
	}, {
		title: '微信昵称',
		dataIndex: 'nick_name',
		scopedSlots: {
			customRender: 'nick_name'
		},
	}, {
		title: '失败原因',
		dataIndex: 'reason',
		scopedSlots: {
			customRender: 'reason'
		},
	},
	{
		title: '发送时间',
		dataIndex: 'created',
		scopedSlots: {
			customRender: 'created'
		},
	}
	]

	const data = []
	for(let i = 0; i < 100; i++) {
		data.push({
			key: i.toString(),
			avatar_url: `https://pro.modao.cc/uploads3/images/2861/28611746/v2_pjkg1s.png`,
			nick_name: `Edrward ${i}`,
			reason: `London Park no. ${i}`,
			sendingTime:'2018-12-25',
		})
	}
	export default {
		props: ['dataSource'],
		data() {
			this.cacheData = data.map(item => ({ ...item
			}))
			return {
				data,
				columns,
			}
		},
		methods: {},
	}
</script>
<style scoped>
	.group{
		padding: 12px 0;
	}
	.container {
		position: relative;
	}
	
	.box {
		position: absolute;
		width: 100px;
		height: 30px;
		top: -32px;
		margin-left: -43px;
		z-index: 978;
		color: rgb(255, 255, 255);
		background-color: rgb(16, 142, 233);
		border-radius: 5px;
		font-size: 14px;
		padding: 1px;
		border-width: 0px;
		text-align: center;
		line-height: 30px;
		font-weight: normal;
		font-style: normal;
		opacity: 0.85;
	}
	
	.arrow {
		position: absolute;
		bottom: -22px;
		left: 50%;
		margin-left: -20px;
	}
	
	.bottom-arrow:before {
		content: "";
		border: 7px solid rgb(16, 142, 233);
		border-bottom: none;
		border-right-color: transparent;
		border-left-color: transparent;
		position: relative;
		top: 9px;
		left: 6px;
		border-radius: 2px;
	}
</style>