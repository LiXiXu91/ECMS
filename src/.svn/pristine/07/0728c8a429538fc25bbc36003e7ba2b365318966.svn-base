<template>
	<div class="background-color">

		<a-row >
			<a-col span="24" class="addBtn">
				<a-button type="primary" @click="new_create" style="z-index: 100">新建</a-button>
				<!--<a-button type="primary" @click="add_material">选择素材添加</a-button>style="padding: 20px 20px 0 20px"style="text-align: right;"-->
			</a-col>
		</a-row>
		
		<a-tabs @change="callback" :defaultActiveKey="tabPage">
			<a-tab-pane tab="文本素材" key="1">
				<textual-material class="tab" v-on:headCallBackDel="headCallDel" :dataSource="textData"></textual-material>
			</a-tab-pane>
			<a-tab-pane tab="图片素材" key="2">
				<picture-material class="tab" v-on:headCallBackDel="headCallDel" :dataSource="imgData"></picture-material>
			</a-tab-pane>
			<a-tab-pane tab="链接素材" key="3">
				<link-material class="tab"  v-on:headCallBackDel="headCallDel" :dataSource="linkData"></link-material>
			</a-tab-pane>
			<a-tab-pane tab="名片素材" key="4">
				<business-card-material class="tab"  v-on:headCallBackDel="headCallDel" :dataSource="cardData"></business-card-material>
			</a-tab-pane>
			<a-tab-pane tab="小程序素材" key="5">
				<small-program-material class="tab"  v-on:headCallBackDel="headCallDel" :dataSource="programData"></small-program-material>
			</a-tab-pane>
			<!--<a-tab-pane tab="朋友圈素材" key="6">-->
				<!--<friendship-circle-material class="tab"  v-on:headCallBackDel="headCallDel" :dataSource="text_imgData"></friendship-circle-material>-->
			<!--</a-tab-pane>-->
		</a-tabs>

	</div>
</template>
<script>

  
	import TextualMaterial from '../../components/dataManage/TextualMaterial'
	import PictureMaterial from '../../components/dataManage/PictureMaterial'
	import LinkMaterial from '../../components/dataManage/LinkMaterial'
	import BusinessCardMaterial from '../../components/dataManage/BusinessCardMaterial'
	import SmallProgramMaterial from '../../components/dataManage/SmallProgramMaterial'
	import FriendshipCircleMaterial from '../../components/dataManage/FriendshipCircleMaterial'
	var emoji = require('../../common/emojiMap');
	
	export default {
		name: "materialMange",
		components: {
			TextualMaterial,
			PictureMaterial,
			LinkMaterial,
			BusinessCardMaterial,
			SmallProgramMaterial,
			FriendshipCircleMaterial
		},
		data() {
			return {
				textData:[],
				imgData:[],
				linkData:[],
				tabpage:1,
				cardData:[],
				programData:[],
				text_imgData:[],
				tabs_key:1,
				quryForm: {
					department_id: [this.$store.state.user.user.department.id,"0"],
					searchKey: ''
				},
			}
		},

		beforeCreate() {
			
		},
		mounted() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		computed: {
			departmentID(){
				return this.$store.state.user.user.department.id //返回store实例的count状态
			},
			
        },
		methods: {
		   headCallDel(id){//文本素材
		   	let that = this;
		   		this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/material/materialdel',
					data: {'id_arr':[id],'ask':'1'} // 参数
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.$message.success('删除成功', 2);
						that.refreshGroup();
					}
				});
		   },
			callback(key) { //tab切换返回值
				this.tabs_key = key;
			},
			
			
			new_create() {//新建按钮
				this.$router.push({path: '/dataManage/editMaterial',query:{'create':'1','tabs_key':this.tabs_key,'ask':'1'}});
			},
			add_material(){
				
			},
			refreshGroup(){
				let that = this;
				var obj = {};
				obj.searchKey = that.quryForm.searchKey;
                obj.department_id = that.$store.state.user.user.department.id;
                obj.ask='1'
				obj.type='1'
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/material/material',
					data: obj // 参数
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						//1 文本；2 图片；3 链接；7 名片；8 小程序；9 朋友圈素材
                        that.textData = []

                        that.imgData = []
                        that.linkData = []
                        that.cardData = []
                        that.programData = []
                        udata.data.list.forEach(el=>{
                            switch (el.type) {
								case '1':
                                    that.textData.push(el)
								    break
								case '2':
                                    that.imgData.push(el)
								    break
                                case '3':
                                    that.linkData.push(el)
                                    break
                                case '7':
                                    that.cardData.push(el)
                                    break
                                case '8':
                                    that.programData.push(el)
                                    break
							}
						})
//						that.textData = udata.data.list.textData;
//
//						that.imgData = udata.data.list.imgData;
//						that.linkData = udata.data.list.linkData;
//						that.cardData = udata.data.list.cardData;
//						that.programData = udata.data.list.programData;
//						that.text_imgData = udata.data.list.text_imgData;


						for (let i=0;i<that.textData.length;i++) {
							that.textData[i].content = emoji.stringToHtml(that.textData[i].content);
						}
//						for (let i=0;i<that.text_imgData.length;i++) {
//							that.text_imgData[i].content = emoji.stringToHtml(that.text_imgData[i].content);
//						}
					}
				});
				
			
			}
		},
		created() {
			this.tabPage = this.$route.query.tabpage || '1';
			this.refreshGroup();
		}
	}
</script>
<style>
.ant-card-cover{
	height:150px;
}
.addBtn{
	text-align: right;
	position:absolute;
	top:6px;
	right:20px;
}
	.background-color {
		height: calc(100vh - 90px);
		overflow-y: auto;
	}
	/*.ant-card-cover img {*/
	    /*width: 100%;*/
	    /*height: 100%;*/
	/*}*/
</style>


<style scoped lang="less">

	.background-color {
		background: #fff;
	}
	
</style>