<template>
	<div style="position: relative;margin: 20px 20px 50px 20px;">
	
		<div class="mag_push_title" >
			{{
				tabs_key==1?createState==1?'添加文本素材':'编辑文本素材':
				tabs_key==2?createState==1?'添加图片素材':'编辑图片素材':
				tabs_key==3?createState==1?'添加链接素材':'编辑链接素材':
				tabs_key==4?createState==1?'添加名片素材':'编辑名片素材':
				tabs_key==5?createState==1?'添加小程序素材':'编辑小程序素材':
				tabs_key==6?createState==1?'添加朋友圈素材':'编辑朋友圈素材':''
			}}
			<a-button type="default" icon="left" @click="back()" style="float:right;z-index: 1;">返回</a-button>
		</div>

		<a-row justify="center" style="padding: 50px 0;position: relative;background: #fff;" class="container_box">
			<a-col span="18" push="3">

				<template v-if="tabs_key==1">
					<a-form>
					    <a-form-item   :labelCol="labelCol" :wrapperCol="wrapperCol" label='素材内容：' :validateStatus='savFlg?"":sendObj.text?"success":"error"' :help='savFlg?"":sendObj.text?"":"请输入文本。。。"'>
							<!--1.文本素材-->
							<div class="input-content" style="position: relative">
								<div class="tools">
									<div>
										<a-icon type="smile" @click="showEmoji()" id="showEmoji" />
										<div v-if="emojiFlag" id="emoji">
											<a href="javascript:;" v-for="(item,index) in emojiList" v-bind:class="item.className" class="qqemoji" :title_name="item.title" @click="emojiAdd($event);" style="cursor: pointer"></a>
										</div>
									</div>
								</div>
								<div class="input-content-area">
									<div-edit-area id="text_area" :formItem="sendObj" ref="div_edit" @change='getSel()' style="height:inherit"> </div-edit-area>
								</div>
							</div>
						</a-form-item>
				</a-form>
				</template>

				<template v-if="tabs_key==2">
					<a-form>
					    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='素材图片：' :validateStatus='savFlg?"":mediapath?"success":"error"' :help='savFlg?"":mediapath?"":"请上传图片。。。"'>
					      
						<!--2.图片素材 -->
						<a-upload-dragger class="bgsty" name="file" :headers="headers" @change="handleChange" listType="picture-card" :beforeUpload="beforeUpload" :multiple="true" :showUploadList="false" action="/index.php?r=uc/user/upload">
							<p class="ant-upload-drag-icon">
								<a-icon type="inbox" />
							</p>
							<p class="ant-upload-text">点击或将文件拖拽到这里上传图片(文件大小不能超过1M,支持文件类型jpg,png)</p>
							
						</a-upload-dragger>
					</a-form-item>
					
					<div class="ant-upload-list ant-upload-list-picture-card">
						<a-icon type="loading" v-if="loading" class="loading"/>
						<div class="ant-upload-list-item ant-upload-list-item-done" v-if="mediapath">
							<div class="ant-upload-list-item-info">
								<span>
									<a href="javascript:void(0)" rel="noopener noreferrer" class="ant-upload-list-item-thumbnail">
										<img  :src="mediapath" alt="mediapath">
									</a>
								</span>
							</div>
							<span class="ant-upload-list-item-actions">
								<a href="javascript:void(0)">
									<a-icon type="eye" @click="handlePreview(mediapath)"></a-icon>
								</a>
								<a-icon type="delete"  @click="deleteFn(2)"></a-icon>
							</span>
						</div>
					</div>
				</a-form>
				</template>
				<template v-if="tabs_key==3">
					<!--3.链接素材 -->
					  <a-form>
					    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='链接标题：' :validateStatus='savFlg?"":paramsObj.title?"success":"error"' :help='savFlg?"":paramsObj.title?"":"请输入链接标题"'>
					      <a-input placeholder='请输入链接标题' v-model="paramsObj.title" />
					    </a-form-item>
					     <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='链接地址：' :validateStatus='savFlg?"":paramsObj.url?"success":"error"' :help='savFlg?"":paramsObj.url?"":"请输入链接地址"'>
					      <a-input placeholder='请输入链接地址'  v-model="paramsObj.url"/>
					    </a-form-item>
					     <a-form-item  :labelCol="labelCol" :wrapperCol="wrapperCol" label='链接描述：' :validateStatus='savFlg?"":paramsObj.desc?"success":"error"' :help='savFlg?"":paramsObj.desc?"":"请输入链接描述"'>
					      <a-input placeholder='请输入链接描述'  v-model="paramsObj.desc" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }"/>
					    </a-form-item>
					    
					    
					     <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='素材图片：' :validateStatus='savFlg?"":mediapath?"success":"error"' :help='savFlg?"":mediapath?"":"请上传图片素材"'>
					      
							<a-upload-dragger name="file" :headers="headers" @change="handleChange" listType="picture-card" :beforeUpload="beforeUpload" :multiple="true" :showUploadList="false" action="/index.php?r=uc/user/upload">
								<p class="ant-upload-drag-icon">
									<a-icon type="inbox" />
								</p>
								<p class="ant-upload-text">点击或将文件拖拽到这里上传图片(文件大小不能超过1M,支持文件类型jpg,png)</p>
								
							</a-upload-dragger>
					 	</a-form-item>
					 	
					 	<div class="ant-upload-list ant-upload-list-picture-card" style="position: relative;height: 112px;width: 112px;">
									<a-icon type="loading" v-if="loading" style="position: absolute;top: 50%;left: 50%;margin-top: -7px;margin-left: -7px;"/>
								<div class="ant-upload-list-item ant-upload-list-item-done" v-if="mediapath">
									<div class="ant-upload-list-item-info">
										<span>
											<a href="javascript:void(0)" target="_blank" rel="noopener noreferrer" class="ant-upload-list-item-thumbnail">
												<img  :src="mediapath" alt="mediapath">
											</a>
										</span>
									</div>
									<span class="ant-upload-list-item-actions">
										<a href="javascript:void(0)">
											<a-icon type="eye" @click="handlePreview(mediapath)"></a-icon>
										</a>
										<a-icon type="delete"  @click="deleteFn(2)"></a-icon>
									</span>
								</div>
							</div>
					</a-form>
  
				</template>
				<template v-if="tabs_key==4">
					<!--4.名片素材 -->
					<a-form>
					    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='公众号原始ID：' :validateStatus='savFlg?"":paramsObj.orginid?"success":"error"' :help='savFlg?"":paramsObj.orginid?"":"请输入公众号原始ID"'>
					      <a-input placeholder='请输入公众号原始ID (gh_ 开头)' v-model="paramsObj.orginid" />
					    </a-form-item>
					     <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='公众号全称：' :validateStatus='savFlg?"":paramsObj.title?"success":"error"' :help='savFlg?"":paramsObj.title?"":"请输入公众号全称"'>
					      <a-input placeholder='请输入公众号全称'  v-model="paramsObj.title"/>
					    </a-form-item>
					</a-form>
					
				</template>
				<template v-if="tabs_key==5">
					<!--5.小程序素材 -->
					<a-form>
					    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='小程序名称：' :validateStatus='savFlg?"":paramsObj.title?"success":"error"' :help='savFlg?"":paramsObj.title?"":"请输入小程序名称"'>
					      <a-input placeholder='请输入小程序名称' v-model="paramsObj.title" />
					    </a-form-item>
					     <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='小程序APPID：' :validateStatus='savFlg?"":paramsObj.appid?"success":"error"' :help='savFlg?"":paramsObj.appid?"":"请输入小程序APPID"'>
					      <a-input placeholder='请输入小程序APPID'  v-model="paramsObj.appid"/>
					    </a-form-item>
					     <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='小程序原始ID：' :validateStatus='savFlg?"":paramsObj.orginid?"success":"error"' :help='savFlg?"":paramsObj.orginid?"":"请输入小程序原始ID"'>
					      <a-input placeholder='请输入小程序原始ID'  v-model="paramsObj.orginid"/>
					    </a-form-item>
					    
					    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='小程序标题：' :validateStatus='savFlg?"":paramsObj.desc?"success":"error"' :help='savFlg?"":paramsObj.desc?"":"请输入小程序标题"'>
					      <a-input placeholder='请输入小程序标题'  v-model="paramsObj.desc"/>
					    </a-form-item>
					    
					    
					     <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='小程序图标：' :validateStatus='savFlg?"":iconurl?"success":"error"' :help='savFlg?"":iconurl?"":"请上传小程序图标"'>
					      
							<a-upload-dragger name="file" :headers="headers" @change="icon_handleChange" listType="picture-card" :beforeUpload="beforeUpload" :multiple="true" :showUploadList="false" action="/index.php?r=uc/user/upload">
								<p class="ant-upload-drag-icon">
									<a-icon type="inbox" />
								</p>
								<p class="ant-upload-text">点击或将文件拖拽到这里上传图片(文件大小不能超过1M,支持文件类型jpg,png)</p>
							</a-upload-dragger>
					 	</a-form-item>
					 	
					 	<a-col span="24">
					 		<div class="ant-upload-list ant-upload-list-picture-card" style="position: relative;height: 112px;width: 112px;">
							<a-icon type="loading" v-if="icon_loading" style="position: absolute;top: 50%;left: 50%;margin-top: -7px;margin-left: -7px;"/>
								<div class="ant-upload-list-item ant-upload-list-item-done" v-if="iconurl">
									<div class="ant-upload-list-item-info">
										<span>
											<a href="javascript:void(0)" target="_blank" rel="noopener noreferrer" class="ant-upload-list-item-thumbnail">
												<img  :src="iconurl" :alt="iconurl">
											</a>
										</span>
									</div>
									
									<span class="ant-upload-list-item-actions">
										<a href="javascript:void(0)">
											<a-icon type="eye" @click="handlePreview(iconurl,1)"></a-icon>
										</a>
										<a-icon type="delete"  @click="deleteFn(1)"></a-icon>
									</span>
								</div>
							</div>
					 	</a-col>
					 	
							
							
							<a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='小程序封面图片：' :validateStatus='savFlg?"":mediapath?"success":"error"' :help='savFlg?"":mediapath?"":"请上传小程序封面图片"'>
					      
								<a-upload-dragger name="file" :headers="headers" @change="handleChange" listType="picture-card" :beforeUpload="beforeUpload" :multiple="true" :showUploadList="false" action="/index.php?r=uc/user/upload">
									<p class="ant-upload-drag-icon">
										<a-icon type="inbox" />
									</p>
									<p class="ant-upload-text">点击或将文件拖拽到这里上传图片(文件大小不能超过1M,支持文件类型jpg,png)</p>
									
								</a-upload-dragger>
						 	</a-form-item>
					 	
					 	<a-col span="24">
						 	<div class="ant-upload-list ant-upload-list-picture-card" style="position: relative;height: 112px;width: 112px;">
								<a-icon type="loading" v-if="loading" style="position: absolute;top: 50%;left: 50%;margin-top: -7px;margin-left: -7px;"/>
									<div class="ant-upload-list-item ant-upload-list-item-done" v-if="mediapath">
										<div class="ant-upload-list-item-info">
											<span>
												<a href="javascript:void(0)" target="_blank" rel="noopener noreferrer" class="ant-upload-list-item-thumbnail">
													<img  :src="mediapath" :alt="mediapath">
												</a>
											</span>
										</div>
										<span class="ant-upload-list-item-actions">
											<a href="javascript:void(0)">
												<a-icon type="eye" @click="handlePreview(mediapath)"></a-icon>
											</a>
											<a-icon type="delete"  @click="deleteFn(2)"></a-icon>
										</span>
									</div>
								</div>
						</a-col>
					</a-form>
					
				</template>
				<template v-if="tabs_key==6">
					<!--6.朋友圈素材-->
					
					<a-form>
						
					    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='素材名称：' :validateStatus='savFlg?"":paramsObj.title?"success":"error"' :help='savFlg?"":paramsObj.title?"":"请输入素材名称"'>
					      <a-input placeholder='请输入素材名称' v-model="paramsObj.title" />
					    </a-form-item>
					    
					    
					     <a-form-item  :labelCol="labelCol" :wrapperCol="wrapperCol" label='素材内容：' :validateStatus='savFlg?"":sendObj.text?"success":"error"' :help='savFlg?"":sendObj.text?"":"请输入素材内容"'>
					     	<div class="input-content" style="position: relative">
								<div class="tools">
									<div>
										<a-icon type="smile" @click="showEmoji()" id="showEmoji" />
										<div v-if="emojiFlag" id="emoji">
											<a href="javascript:;" v-for="(item,index) in emojiList"  v-bind:class="item.className" class="qqemoji" :title_name="item.title" @click="emojiAdd($event);" style="cursor: pointer"></a>
										</div>
									</div>
								</div>
								<div class="input-content-area" >
									<div-edit-area id="text_area" :formItem="sendObj" ref="div_edit" @change='getSel()' ></div-edit-area>
								</div>
							</div>
					     
					     </a-form-item>
					     <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='素材图片：' :validateStatus='savFlg?"":fileList.length>0?"success":"error"' :help='savFlgfileList.length>0?"":"请上传图片素材"'>
							 <div class="clearfix tabs_key">
							 <a-col span="24">
						 		 <div class="clearfix ant-upload-list ant-upload-list-picture-card">
									 <div class="ant-upload-list-item ant-upload-list-item-done" v-for="(item,index) in fileList">
										 <div class="ant-upload-list-item-info">
											 <span>
												<a href="javascript:void(0)" target="_blank" rel="noopener noreferrer" class="ant-upload-list-item-thumbnail">
													<img  :src="item.src" :alt="item.src">
												</a>
											</span>
										 </div>
										 <span class="ant-upload-list-item-actions">
											 <a href="javascript:void(0)">
												 <a-icon type="eye" @click="uphandlePreview(item.src)"></a-icon>
											 </a>
											 <a-icon type="delete"  @click="updeleteFn(index)"></a-icon>
										 </span>
									 </div>
									 <a-upload-dragger name="file" :headers="headers"  @change="uphandleChange" :beforeUpload="beforeUpload" listType="picture-card" :multiple="true" :showUploadList="false" action="/index.php?r=uc/user/upload">
									 <div>
									 	 <a-icon type="plus" />
							         	 <div class="ant-upload-text">上传图片</div>
									 </div>
									 </a-upload-dragger>
								</div>
							</a-col>
						
							</div>
					 	</a-form-item>
					</a-form>
				</template>
			</a-col>
			<a-col :span="18" :push="3">
				<div style="text-align: right">
					<a-button  type="primary" @click="save()">保存</a-button>
					<a-button  @click="back">取消</a-button>
				</div>
			</a-col>
		</a-row>
		
		
		
		<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
			<img alt="example" style="width: 100%" :src="previewType==1?iconurl:previewType==2?previewImage:mediapath" />
		</a-modal>
	</div>
</template>
<script>
	import divEditArea from '../../components/dataManage/divEditArea'
	var emoji = require('../../common/emojiMap');
	var storage = require('../../common/store')

	export default {
		name: "editMaterial",
		components: {
			divEditArea,
		},
		data() {
			return {
				savFlg:true,
				labelCol: {
			        xs: { span: 24 },
			        sm: { span: 6 },
			     },
			     wrapperCol: {
			        xs: { span: 24 },
			        sm: { span: 18 },
			    },
				paramsObj: {}, //所有内容编辑参数集合
				emojiList: emoji.emojiList,
				sendObj: {
					text: '',
					imgList: ''
				},
				tabpage:'',
				range: null,
				sel: null,
				tabs_key: '',
				previewVisible: false,
				previewImage:'',//朋友圈图片预览地址
				previewType:1,//图片预览
				loading: false,
				icon_loading:false,
				fileList:[],//朋友圈图片列表
				iconurl:'',//小程序小图标
				mediapath:'',
				createState:'',//新增或者编辑状态
	            headers:{
	                Authorization: storage.store.get('token')
	            },
                ask:'',//区分素材和快捷回复
			}
		},
		computed: {
			departmentID() {
				return this.$store.state.user.user.department.id //返回store实例的count状态
			},
			emojiFlag() {
				return this.$store.state.liveChat.emojiFlag
			},
		},
		mounted() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
			this.globalClick(this.closeEmoji);
		},
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		methods: {
			back() {
                if(!!this.ask) {
                    this.$router.push({
                        path: '/dataManage/fastReply'
                    })
                } else {
                    this.$router.push({
                        path: '/dataManage/materialMange',
                        query:{'tabpage':this.$route.query.tabs_key}
                    })
                }

			},
			handleCancel() {
				this.previewVisible = false
			},
			uphandlePreview(url){
				 this.previewImage = url;
      			this.previewVisible = true
      			this.previewType = 2;
			},
			handlePreview(img,num) {
				if(num==1){
					this.iconurl = img;
					this.previewType = 1;
				}else{
					this.mediapath = img;
					this.previewType = '';
				}
				this.previewVisible = true
			},
			updeleteFn(index){
				this.fileList.splice(index,1);
			},
			deleteFn(num){
				if(num==1){
					this.iconurl = '';
				}else{
					this.mediapath = '';
				}
			},
			beforeUpload(file) {
				console.log(file.type === 'image/jpeg')
				const isJPG = file.type === 'image/jpeg' ? true : file.type === 'image/png' ? true : file.type === 'image/jpg' ? true : false
				if(!isJPG) {
					this.$notification['warning']({
			          message: '文件格式不正确',
			          description: '文件格式不正确，请选择JPG或PNG。',
			        });
				}
				const isLt2M = file.size / 1024 / 1024 < 1
				if(!isLt2M) {
					this.$notification['warning']({
			          message: '超出文件大小限制',
			          description: '图像不能大于1MB！',
			        });
					this.$message.error('图像不能大于1MB！')
				}
				return isJPG && isLt2M
			},
			uphandleChange(info){
				let that = this;
				if (info.file.status === 'uploading') {
			        return
			    }
				if (info.file.status === 'done') {
					if(info.file.response.status==1) {
					    if(that.fileList.length>=9) {
                            this.$message.warning('最多只能上传9张图片')
							return
						}
						that.fileList.push({'src':info.file.response.data.path});
						console.log(that.fileList)
                    } else {
                    	that.$notification['warning']({
				          message: '上传错误',
				          description: info.file.response.msg,
				        });
                    }
				} else if (info.file.status === 'error') {
                	 that.$notification['warning']({
			          message: '上传失败',
			          description: '文件'+ info.file.name +'上传失败',
			        });
                }
			},
			handleChange(info) {
				 if (info.file.status === 'uploading') {
			        this.loading = true
			        return
			      }
                if (info.file.status === 'done') {
                    if(info.file.response.status==1) {
                    	this.mediapath  = info.file.response.data.path;
                    	this.loading = false;
                    } else {
                    	this.$notification['warning']({
				          message: '上传错误',
				          description: info.file.response.msg,
				        });
                    }
                } else if (info.file.status === 'error') {
                	 this.$notification['warning']({
			          message: '上传失败',
			          description: '文件'+ info.file.name +'上传失败',
			        });
                }
			},
			icon_handleChange(info){
				
				 if (info.file.status === 'uploading') {
			        this.icon_loading = true
			        return
			      }
                if (info.file.status === 'done') {
                    if(info.file.response.status==1) {
						 this.icon_loading = false;
                         this.iconurl  = info.file.response.data.path;
                    } else {
                    	this.$notification['warning']({
				          message: '上传错误',
				          description: info.file.response.msg,
				        });
                    }
                } else if (info.file.status === 'error') {
                	 this.$notification['warning']({
			          message: '上传失败',
			          description: '文件'+ info.file.name +'上传失败',
			        });
                }
			
			},

			/*表情 start*/
			showEmoji() {
				this.$store.commit('liveChat/setEmojiFlag', !this.emojiFlag)
			},
			closeEmoji() {
				this.$store.commit('liveChat/setEmojiFlag', false)
			},
			emojiAdd(e) {
				document.getElementById('text_area').focus()
				let html = "<img src='static/img_file/emojiBG.png' class= '" + e.currentTarget.classList.value + "' title_name='" + e.currentTarget.attributes.title_name.nodeValue + "'>"
				this.emojiAddInPosition(html)
				this.$refs.div_edit.changeTxt()
			},
			emojiAddInPosition(html, t) {
				let sel, range;
				if(t || this.getRange(), window.getSelection) {
					!t && this.range ? (sel = this.sel, range = this.range) : (sel = window.getSelection(), range = sel.getRangeAt(0)), range.deleteContents();
					sel = window.getSelection(); //返回一个Selection对象，用来表示用户选择的文本范围或插入符当前位置。
					let frag, node, lastNode;
					if(range.createContextualFragment) {
						frag = range.createContextualFragment(html)
					} else {
						let el = document.createElement("div");
						el.innerHTML = html;
						frag = document.createDocumentFragment()
						while((node = el.firstChild)) {
							lastNode = frag.appendChild(node);
						}
					}
					let ran = frag.lastChild;
					range.insertNode(frag);
					range.setStartAfter(ran); //重新定位range（光标位置）
					sel.removeAllRanges(); //清除所有选中
					sel.addRange(range); //将新定位的range加入
					let x = document.getElementById('text_area')
					let l = ran.offsetTop - 55 + ran.offsetHeight - x.offsetHeight;
					x.scrollTop < l && (x.scrollTop = l)
				} else if(document.selection && document.selection.type != "Control") {
					// IE < 9
					document.selection.createRange().pasteHTML(html);
				}
			},
			getSel() {
				window.getSelection ? (this.sel = window.getSelection(), this.range = this.sel.getRangeAt(0)) : this.range = document.selection.createRange()
		
		},
			getRange() {
				this.range ? window.getSelection ? (this.sel.removeAllRanges(), this.sel.addRange(this.range)) : this.range.select() : this.setRange()
			},
			setRange() {
				let x = document.getElementById('text_area')

				var e, t;
				document.createRange ? (e = document.createRange(), e.selectNodeContents(x), e.collapse(!1), t = window.getSelection(), t.removeAllRanges(), t.addRange(e)) : document.selection && (e = document.body.createTextRange(), e.moveToElementText(x), e.collapse(!1), e.select())
			},
			/*表情 end*/
			
			save() {
				let that = this;
				//                这里只发送文字，图片不插入到输入框中，不然比较麻烦
				//				console.log(emoji.htmlToString(this.sendObj.text))

				//num: 1.文本素材 2.图片素材 3.链接素材 4.名片素材 5.小程序素材 6.朋友圈素材
				
				//this.paramsObj.type:  1 文本；2 图片；3 链接；7 名片；8 小程序；9 朋友圈素材
				
				let num = parseInt(this.tabs_key);
				if(num == 1 && !emoji.htmlToString(this.sendObj.text)) {
					this.savFlg = false;
					return false;
				} else if(num == 2 && !this.mediapath) {
					this.savFlg = false;
					return false;
				}else if( num==3 && (!this.paramsObj.desc || !this.mediapath || !this.paramsObj.title || !this.paramsObj.url)){
					this.savFlg = false;
					return false;
				}else if(num==4 && (!this.paramsObj.orginid || !this.paramsObj.title)){
					this.savFlg = false;
					return false;
				}else if(num==5 && (!this.paramsObj.title||!this.paramsObj.appid||!this.paramsObj.orginid||!this.paramsObj.desc||!this.iconurl||!this.mediapath)){
					this.savFlg = false;
					return false;
				}else if(num==6 && (!this.paramsObj.title || !emoji.htmlToString(this.sendObj.text) || this.fileList.length==0?true:false ||this.fileList.length>9)){
				    if(this.fileList.length>9) {
                        this.$message.warning('最多只能上传9张图片')
					}
					this.savFlg = false;
					return false;
				}
				
				let arr = [];
				for(let item of this.fileList){
					arr.push(item.src);
				}
				
				if(this.createState=='1'){//新建
					this.paramsObj.department_id = this.departmentID;
					switch(num) {
						case 1: //1 文本
							this.paramsObj.type = 1;
							this.tabpage = 1;
							this.paramsObj.content = emoji.htmlToString(this.sendObj.text);
							break;
						case 2: //2 图片
							this.paramsObj.type = 2;
							this.tabpage = 2;
							this.paramsObj.mediapath = this.mediapath;
							break;
						case 3: //3 链接
							this.paramsObj.type = 3;
							this.tabpage = 3;
							this.paramsObj.mediapath = this.mediapath;
							break;
						case 4: //4 名片素材
							this.paramsObj.type = 7;
							this.tabpage = 4;
							this.paramsObj.mediapath = this.mediapath;
							break;
						case 5: //5小程序素材
							this.paramsObj.type = 8;
							this.tabpage = 5;
							this.paramsObj.mediapath = this.mediapath;
							this.paramsObj.iconurl = this.iconurl;
							break;
						case 6: //6.朋友圈素材
							this.paramsObj.type = 9;
							this.tabpage = 6;
							this.paramsObj.album = arr; //链接地址数组
							this.paramsObj.album_type = 0; //链接类型（0图片；10 音频；20 视频）
							this.paramsObj.content = emoji.htmlToString(this.sendObj.text);
							break;
					}


				}else{//编辑
				
					switch(num) {
						case 1: //1 文本
							this.paramsObj.content = emoji.htmlToString(this.sendObj.text);
							break;
						case 2: //2 图片
							this.paramsObj.mediapath = this.mediapath;
							break;
						case 3: //3 链接
							this.paramsObj.mediapath = this.mediapath;
							break;
						case 4: //4 名片素材
							this.paramsObj.mediapath = this.mediapath;
							break;
						case 5: //5小程序素材
							this.paramsObj.mediapath = this.mediapath;
							this.paramsObj.iconurl = this.iconurl;
							break;
						case 6: //6.朋友圈素材
							this.paramsObj.album = arr; //链接地址数组
							this.paramsObj.content = emoji.htmlToString(this.sendObj.text);
							break;
					}
				}
				
				let url_link = that.createState=='1'?'/index.php?r=uc/material/materialadd':'/index.php?r=uc/material/materialupdate';
				if(that.ask!='') {
                    that.paramsObj.ask = that.ask
				}
				this.$axios({
					method: 'POST',
					url: url_link,
					data: that.paramsObj // 参数
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.$notification['success']({
				          message: '成功',
				          description: '保存成功',
				          duration:2
				        });
				        if(!!that.ask) {
//                            setTimeout(()=>{
                                that.$router.push({
																		path: '/dataManage/fastReply',
																		query:{'tabpage':that.$route.query.tabs_key}
                                })
//                            },2000);
						} else {
//                            setTimeout(()=>{
	 								that.$router.push({
                        path: '/dataManage/materialMange',
                        query:{'tabpage':that.$route.query.tabs_key}
                    })
                  //               that.$router.push({
									// path: '/dataManage/materialMange',
									// query:{'tabpage':that.tabpage}
                  //               })
//                            },2000);
						}

					} else {
//						that.$message.warning(udata.msg, 2);
					}
				});

			},
			refreshGroup(){
				let that = this;
				let num = parseInt(this.tabs_key);
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/material/material-one',
					data: {"id":that.$route.query.id,'ask':this.ask} // 参数
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						console.log(udata.data)
						that.paramsObj = udata.data;
						switch(num) {
							case 1: //1 文本
								that.sendObj.text = emoji.stringToHtml(that.paramsObj.content);
								break;
							case 2: //2 图片
								that.mediapath = that.paramsObj.mediapath;
								break;
							case 3: //3 链接
								that.mediapath = that.paramsObj.mediapath;
								break;
							case 4: //4 名片素材
								that.mediapath = that.paramsObj.mediapath;
								break;
							case 5: //5小程序素材
								that.mediapath = that.paramsObj.mediapath;
								that.iconurl = that.paramsObj.iconurl;
								break;
							case 6: //6.朋友圈素材
								that.fileList = that.paramsObj.album; //链接地址数组
								that.sendObj.text = emoji.stringToHtml(that.paramsObj.content);
								break;
						}
						
					}
				});
			}
		},
		created() {
			this.sendObj = {text: '',imgList: ''}
			this.paramsObj = {};
			this.tabs_key = this.$route.query.tabs_key;
			this.ask= this.$route.query.ask
			this.createState = this.$route.query.create;
			if(!this.createState  == '1'){
				this.refreshGroup();
			}
		}
	}
</script>

<style>
	

	
	.ant-form-item-control .ant-form-explain{
		margin-top:12px;
	}
.ant-upload-list {
		position: relative;
	    height: 112px;
	    width: 112px;
	    margin-left: 25%;
	}
	.tabs_key .ant-upload-list {
		 height: auto;
	    width: auto;
		margin-left: 0px;
	}
	
	.ant-upload-select-picture-card i {
		font-size: 32px;
		color: #999;
	}
	.bgsty{
		background:#fcfcfc;
	}
	.ant-upload.ant-upload-drag p.ant-upload-text{
		margin-top: 8px;
		color: #666;
		padding: 0 20px;
	}
.tabs_key .ant-upload{
	height: 104px;
	width: 104px;
	display: inline-block;
}
.ant-upload-list-item-actions svg{
	font-size: 20px;
}
.ant-upload-drag-icon svg{
	font-size: 60px;
}
.tabs_key .anticon-plus svg{
	font-size: 30px;
}

</style>

<style scoped lang="less">
	.container_box {
		height: calc(~'100vh - 200px');
		overflow-y: auto;
		/*max-height: 500px;*/
	}
	.ant-form-split{
		margin-left:46px;
	}
	.loading{
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -7px;
		margin-left: -7px;
	}
	.mag_push_title {
		// border-bottom: 1px solid rgb(187, 187, 187);
		background: #fff;
		margin: 0 0 10px 0;
		padding: 17px 38px;
		font-size: 16px;
	}

	
	
	.input-content {
		// min-height: 100px;
		padding: 10px 0;
		.tools {
			position: absolute;
			bottom: -14px;
			left: -10px;
			display: flex;
			>div {
				padding: 0 10px;
				cursor: pointer;
				.anticon svg {
					font-size: 20px;
				}
				#emoji {
					position: absolute;
					top: -165px;
					width: 390px;
					height: 155px;
					left: 0;
					border: 1px solid #cccccc;
					padding: 5px;
					z-index: 10;
					line-height: 1;
					background: #ffffff;
					box-shadow: 0px 1px 10px 3px #ccc;
					&::after {
						margin-top: -1px;
						border: 7px solid transparent;
						border-top-color: #fff;
						content: "";
						position: absolute;
						left: 16px;
						top: 100%;
						margin-left: -5px;
					}
				}
			}
		}
		#edit .div-edit{
			border:1px solid #ccc;
		}
		.input-content-area {
			word-wrap: break-word;
			white-space: normal;
			#emoji {
				position: absolute;
				top: -160px;
				width: 390px;
				height: 155px;
				left: 0;
				border: 1px solid #cccccc;
				padding: 5px;
				z-index: 10;
				line-height: 1;
				background: #ffffff;
			}
		}
	}

</style>