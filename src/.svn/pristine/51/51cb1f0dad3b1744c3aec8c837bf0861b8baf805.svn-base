<template>
	<div style="position: relative;margin-top: 50px;">
		<a-button type="default" icon="left" @click="cancel" style="position: absolute;top: -50px;left:20px;z-index: 1;">返回</a-button>
		<div style="position: relative;background: #fff;margin: 50px 20px 50px 20px;" class="background-color">
			<div class="mag_push_title">新建推送</div>
	
			<a-form :form="form" id='components-form-demo-normal-login' @submit="handleSubmit" class='login-form'>
				<a-row type="flex" justify="start">
					<a-col :span="24" class="col-margin">
						<a-form-item fieldDecoratorId="userLabel" :label="pushType=='10'?'推送范围':'谁可以看：'"  v-bind="formItemLayout">
							 <a-radio-group @change="onChangeRadio" v-model="queryForm.visble_type">
							    <a-radio :value="10">{{pushType=='10'?'全部推送':'全部可见'}}</a-radio>
							    <a-radio :value="20">{{pushType=='10'?'部分推送':'部分可见'}}</a-radio>
							    <a-radio :value="30">{{pushType=='10'?'不给谁推':'不给谁看'}}</a-radio>
							  </a-radio-group>
						</a-form-item>
						
						
						<a-form-item fieldDecoratorId="userLabel" label="选择标签："  v-bind="formItemLayout" v-if="queryForm.visble_type==20||queryForm.visble_type==30">
						
							
							<!--<a-radio-group buttonStyle="solid" :value="queryForm.friendsChecked" @change="onChangeRobot" style="margin-right: 20px;">
								<a-radio-button :value="false">包含</a-radio-button>
								<a-radio-button :value="true">不包含</a-radio-button>
							</a-radio-group>-->
	
							<!--机器人标签列表-->
							<!--<a-select :allowClear="true" placeholder="请选择。。。" @change="handleChangeRobot" mode="multiple" style="max-width: 300px" v-decorator="['userLabel', {rules: [{ required: true, message: '不能为空!', type: 'array' }]}]">
								<a-select-option :key="items.id" v-for="(items,index) in userLabel">
									{{items.title}}
								</a-select-option>
							</a-select>-->
							
							<div class="ant-select ant-select-enabled ant-select-allow-clear" @click="clickChangeUser(3)" id="userLabel" style="min-width: 20%;display: inline-block;width: initial;" v-decorator="['userLabel', {rules: [{ required: false, message: '不能为空!', type: 'array' }]}]">
								<div class="ant-select-selection ant-select-selection--multiple" style="cursor: pointer;">
									<div class="ant-select-selection__rendered">
										<div unselectable="on" class="ant-select-selection__placeholder"  v-if="select_label.length==0?true:false" style="display: block; user-select: none;">请选择。。。</div>
										<ul v-if="select_label.length>0?true:false">
											<li unselectable="unselectable" :title="item.title" class="ant-select-selection__choice" style="user-select: none;" v-for="(item,index) in select_label">
												<div class="ant-select-selection__choice__content">
													{{item.title}}
												</div>
												<span class="ant-select-selection__choice__remove" style="top: 0;" @click.stop="clear_label_user(index)">
													<i class="ant-select-remove-icon anticon anticon-close">
														<svg viewBox="64 64 896 896" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true">
															<path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
															</path>
														</svg>
													</i>
												</span>
											</li>
										</ul>
									</div>
									<span unselectable="unselectable" class="ant-select-selection__clear"  @click.stop="clear_label_all"  v-if="select_label.length==0?false:true">
										<i class="ant-select-clear-icon anticon anticon-close-circle">
											<svg viewBox="64 64 896 896" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" class="">
												<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z">
												</path>
											</svg>
										</i>
									</span>
								</div>
							</div>
							
							
						</a-form-item>
					</a-col>
	
					<a-col :span="24" class="col-margin"  v-if="queryForm.visble_type==20||queryForm.visble_type==30">
						<a-form-item fieldDecoratorId="friendsId"  label="选择用户："  v-bind="formItemLayout">
							<!--<a-radio-group buttonStyle="solid" :value="queryForm.userChecked" @change="onChangeUser" style="margin-right: 20px;">
								<a-radio-button :value="false">包含</a-radio-button>
								<a-radio-button :value="true">不包含</a-radio-button>
							</a-radio-group>-->
							<!--用户标签列表-->
							<!--<a-select :allowClear="true" placeholder="请选择。。。"  @change="handleChangeUser" mode="multiple" style="max-width: 300px;" v-decorator="['friendsId', {rules: [{ required: true, message: '不能为空!', type: 'array' }]}]">
								<a-select-option :key="item.id" v-for="(item,index) in friendsId">
									{{item.title}}
								</a-select-option>
							</a-select>-->
							
							
							<div class="ant-select ant-select-enabled ant-select-allow-clear" @click="clickChangeUser(2)" id="friendsId" style="min-width: 20%;display: inline-block;width: initial;" v-decorator="['friendsId', {rules: [{ required: false, message: '不能为空!', type: 'array' }]}]">
								<div class="ant-select-selection ant-select-selection--multiple" style="cursor: pointer;">
									<div class="ant-select-selection__rendered">
										<div unselectable="on" class="ant-select-selection__placeholder"  v-if="select_user.length==0?true:false" style="display: block; user-select: none;">请选择。。。</div>
										<ul v-if="select_user.length>0?true:false">
											<li unselectable="unselectable" :title="item.nickname" class="ant-select-selection__choice" style="user-select: none;" v-for="(item,index) in select_user">
												<div class="ant-select-selection__choice__content">
													{{item.nickname}}
												</div>
												<span class="ant-select-selection__choice__remove" style="top: 0;" @click.stop="clear_user(index)">
													<i class="ant-select-remove-icon anticon anticon-close">
														<svg viewBox="64 64 896 896" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true" class="">
															<path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z">
															</path>
														</svg>
													</i>
												</span>
											</li>
										</ul>
									</div>
									<span unselectable="unselectable" class="ant-select-selection__clear"  @click.stop="clear_user_all"  v-if="select_user.length==0?false:true">
										<i class="ant-select-clear-icon anticon anticon-close-circle">
											<svg viewBox="64 64 896 896" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" class="">
												<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z">
												</path>
											</svg>
										</i>
									</span>
								</div>
							</div>
							
						</a-form-item>
					</a-col>
					<a-col :span="20" :push="2" class="col-margin">
						<div class="ant-alert">
							<a-icon type="info-circle" class="circle_icon" theme="twoTone" />
							<!--<span class="ant-info">
								已选择<span>
									{{queryForm.userChecked?friendsId.length - queryForm.friendsId.length:queryForm.friendsId.length}}
								</span>个用户标签<span>
									{{queryForm.friendsChecked?userLabel.length - queryForm.userLabel.length:queryForm.userLabel.length}}
								</span>个机器人标签， 共计<span>{{userTotal}}</span>个用户 <span class="pointer" @click="clearLabel">清空</span>
							</span>-->
							
							<span class="ant-info" v-if="userTotal==0?true:false">
								所有用户不可见
							</span>
							
							<span class="ant-info" v-else>
								已选择<span>{{userTotal}}</span>个用户 <span class="pointer" @click="clearLabel">清空</span>
							</span>
						</div>
					</a-col>
	
					<a-col :span="24" class="col-margin" style="margin-top: 20px;">
						<a-form-item fieldDecoratorId="queryForm.sendValue"  label="发送时间："  v-bind="formItemLayout">
							<a-radio-group @change="onChangeSend" v-model="queryForm.sendValue">
								<a-radio :value="20" style="margin: 0 10px 20px 0;">立即发送</a-radio>
								<a-radio :value="10" style="margin-bottom: 20px;">定时发送</a-radio>
							</a-radio-group>
							
							<div v-if="queryForm.sendValue==10?true:false">
								<div>
									<span style="position: relative;">
				      					 <a-form-item style="display: inline-block;margin-right:6px;"  v-for="(k, index) in form.getFieldValue('date_keys')" :required="false" :key="k">
							      			<a-date-picker :allowClear="false" :value="queryForm.datePicker" @openChange="openDateFn(index)" @change="onChangeDate" :format="dateFormat" v-decorator="[`date_picker[${k}]`,config_date,'date-picker',]" />
							      			<a-icon type="close-circle" class="close" style="margin-right: 22px;cursor: pointer;font-size: 18px;color: #E51C23;" @click.native="datePickerDel(k,index)"  v-if="form.getFieldValue('date_keys').length > 1" />
						      		 	</a-form-item>
				      				</span>
		
									<a-button  style="margin:4px 0 0 10px;" icon="plus" @click.native="addDatePicker">
										添加日期
									</a-button>
								</div>
		
								<div>
									<span style="position: relative;">
				      					 <a-form-item style="display: inline-block;margin-right:6px;" v-for="(k,index) in  form.getFieldValue('time_keys')" :required="false" :key="k">
							      			<a-time-picker :allowEmpty="false" :value="queryForm.timePicker"  @openChange="openTimeFn(index)" @change="onChangeTime" format="HH:mm:ss" showTime  v-decorator="[`time_picker[${k}]`,config,'time-picker']"  />
							      			<a-icon type="close-circle"  class="close" style="margin-right: 22px;cursor: pointer;font-size: 18px;color: #E51C23;" @click.native="timePickerDel(k,index)"  v-if="form.getFieldValue('time_keys').length > 1" />
				      					 </a-form-item>
					      			</span>
									<a-button  style="margin:4px 0 0 10px;" icon="plus" @click.native="addTimePicker">
										添加时间
									</a-button>
								</div>
		
								
									<div class="time" v-if="timeShow.length"  ref="liCon">
										<template v-for="(item,index) in timeShow">
											{{item}}{{timeShow.length==index+1||timeShow.length==1?'':'、'}}
										</template>
										
										<div class="more" v-for="(item,index) in timeShow" @click="open(timeShow)" v-if="timeShow.length>7">
											<img src="../../assets/up.png"   v-if="!timeShow.openFlag" />
											<img src="../../assets/down.png"  v-else />
										</div>
									</div>
									
								
							</div>
						</a-form-item>
					</a-col>
	
					<a-col :span="24" class="col-margin">
						<a-row>
							<a-form-item fieldDecoratorId="textarea_val"  label="发送内容："  v-bind="formItemLayout">
								<a-col :span="14" style="padding: 0 20px 0 0">
									<!--<template v-if="view_material.length>0?true:false">-->
										<!--<view-material v-for="(item,index) in view_material" :key="item.id" :dataItem="item" @click="delMaterial()"></view-material>-->
									<!--</template>-->
									<template >
										<a-form-item v-for="(k,index) in  sendMsgContent" :required="false" :key="index" class="material_content">
											<div v-if="k.type==2">
												<view-material v-for="(item,index1) in k.materialItem" :key="item.id" :dataItem="item" @click="delMaterial(index,index1)"></view-material>
											</div>
											<a-textarea v-else v-model="k.content" :placeholder="pushType=='10'?'{用户姓名}您好，今天是您生日，可享受部分商品到店6折优惠。':'朋友圈推送'" :autosize="{'minRows': 4, 'maxRows': 6 }"  />
											<a-icon
													v-if="index > 0"
													class='dynamic-delete-button'
													type='minus-circle-o'
													@click="() => remove(index)"
													style="position: absolute;right: -26px;top: 50%;transform: translateY(-50%);cursor: pointer;"
											/>
											<a-button style="position: absolute;right: -150px;top: 50%;transform: translateY(-50%);cursor: pointer;" @click="useMaterial(index)">使用素材</a-button>
										</a-form-item>
										<!--<a-form-item v-for="(k,index) in  form.getFieldValue('textarea_val')" :required="false" :key="k">-->
											<!--<a-textarea :value="queryForm.textareaVal" @change="textareaChange" placeholder="{用户姓名}您好，今天是您生日，可享受部分商品到店6折优惠。" :autosize="{'minRows': 4, 'maxRows': 6 }" v-decorator="[`textareaVal[${k}]`,{rules: [{ required: true, message: '请输入内容。。。', whitespace: true }]}]" />-->
											<!--<a-icon-->
											     <!--v-if="form.getFieldValue('textarea_val').length > 1"-->
											     <!--class='dynamic-delete-button'-->
											     <!--type='minus-circle-o'-->
											     <!--:disabled="form.getFieldValue('textarea_val').length === 1"-->
											     <!--@click="() => remove(k)"-->
											     <!--style="position: absolute;right: -26px;top: -26px;cursor: pointer;"-->
											   <!--/>-->
										<!--</a-form-item>-->
										<p v-if="pushType=='10'">在文本中输入标签系统替换对应的类容：{用户姓名}，{微信昵称}，{手机号}，{用户生日}</p>
										<a-button type="dashed" @click.native="addTextarea" block icon="plus">添加</a-button>
									</template>
								</a-col>
								<!--<a-col :span="3">-->
									<!--<a-button @click="useMaterial">使用素材</a-button>-->
								<!--</a-col>-->
							</a-form-item>
						</a-row>
						<!--<a-row>
							<a-col span="20">
								<a-form-item fieldDecoratorId="textarea_val"  label="保存素材："  v-bind="formItemLayout">
									<a-checkbox @change="checkBoxChange" v-model="sel_save_material"></a-checkbox>
								</a-form-item>
							</a-col>
						</a-row>-->
					</a-col>
					<a-col :span="2" style="margin-top: 20px">
					</a-col>
					<a-col :span="22" style="margin-top: 20px">
						<a-row>
							<a-col :span="14" style="padding: 0 20px 0 0;text-align: right">
								<a-button type="primary" htmlType='submit'>保存</a-button>
								<a-button @click.native="cancel">取消</a-button>
							</a-col>
						</a-row>
					</a-col>
					<!--<div v-if="!fixed_show" style="position: fixed;bottom: 0;right: 0;background: #f0f2f5;width: 100%;text-align: right;padding: 10px 0;">-->
						<!--<a-button type="primary" htmlType='submit'>保存</a-button>-->
						<!--<a-button @click.native="cancel" style="margin: 0 100px 0 20px;">取消</a-button>-->
					<!--</div>-->
				</a-row>
			</a-form>
	
			<a-modal :title="visible==2?'选择用户':'选择标签'" :footer="null" :visible="visible>1?true:false" @cancel="com_handleCancel" width="80%">
				<a-row>
					<a-col :xl="{span:6}" :lg="{span:12}">
						<a-input-search placeholder="请输入搜索内容。。。" v-model="searchKey_friend" style="width: 100%" @search="onSearch_friend"  v-if="visible==2?true:false"/>
						<a-input-search placeholder="请输入搜索内容。。。" v-model="searchKey_user" style="width: 100%" @search="onSearch_user"  v-if="visible==3?true:false"/>
					</a-col>
					<a-col :xl="{span:6,offset:1}" :lg="{span:24}" class="sel_user">
						<div class="ant-alert info">
							<a-icon type="info-circle" theme="twoTone" class="circle_icon"/>
							
							<span class="ant-info" v-if="visible==2?true:false">
								已选择<span>{{queryForm.friendsId.length}}</span>个用户 
								<span class="pointer" @click.stop="clear_user_all">清空</span>
							</span>
							
							<span class="ant-info" v-if="visible==3?true:false">
								已选择<span>{{queryForm.userLabel.length}}</span>个标签，
								涉及<span>{{numTotal}}</span>个用户
								<span class="pointer" @click.stop="clear_label_all">清空</span>
							</span>
							
						</div>
					</a-col>
	
	
					<a-col :xl="{span:11}" :lg="{span:24}" class="pagination_box" v-if="visible==2?true:false">
						<a-pagination showQuickJumper showSizeChanger :pageSizeOptions="user_pagination.pageSizeOptions" :pagination="user_pagination" :total="user_pagination.total" :showTotal="total => `总共 ${total} 项`" :pageSize="user_pagination.pageSize" v-model="user_pagination.current" @change="user_onShowSizeChange" @showSizeChange="user_optionChange"  />
					</a-col>
					<a-col :xl="{span:11}" :lg="{span:24}" class="pagination_box" v-if="visible==3?true:false">
						<a-pagination showQuickJumper showSizeChanger :pageSizeOptions="label_pagination.pageSizeOptions" :pagination="label_pagination" :total="label_pagination.total" :showTotal="total => `总共 ${total} 项`" :pageSize="label_pagination.pageSize" v-model="label_pagination.current" @change="select_user_onShowSizeChange" @showSizeChange="select_user_optionChange"  />
					</a-col>
				</a-row>
				
				<a-form :form="form" v-if="visible==2?true:false">
					<a-checkbox-group  @change="sel_select_user" v-model="queryForm.friendsId" style="margin: 20px 5px 0 0;width: 100%;"  class="checkbox_content">
						<a-row type="flex"  align="middle" :gutter="16">
							<a-col :xs="12" :sm="6" :md="4"  :offset="index%5!=0?1:0" v-for="(item,index) in friendsId" :key="item.id">
								<a-checkbox :value="item.id" style="width: 100%;">
									<div class="user_box user_active">
										<div class="select_user">
											<div class="user_avatar">
												<img :src="item.avatar_url" />
											</div>
											<div class="user_name">{{item.nickname}}</div>
										</div>
									</div>
								</a-checkbox>
							</a-col>
						</a-row>

						<!--<a-list :grid="{ gutter: 16, xl: 5,lg:5,md: 4, sm: 2, xs: 1}"  :dataSource="friendsId">-->
							<!--<a-list-item slot="renderItem" slot-scope="item, index">-->
								<!--<a-checkbox :value="item.id" style="width: 100%;">-->
									<!--<div class="user_box user_active">-->
										<!--<div class="select_user">-->
											<!--<div class="user_avatar">-->
												<!--<img :src="item.avatar_url" />-->
											<!--</div>-->
											<!--<div class="user_name">{{item.nickname}}</div>-->
										<!--</div>-->
									<!--</div>-->
								<!--</a-checkbox>-->
							<!--</a-list-item>-->
						<!--</a-list>-->
					</a-checkbox-group>
					<a-form-item :wrapperCol="{span: 24}" style="margin-bottom: 0;border-top:1px solid #E5E5E5 ;text-align: right;">
						<a-button type='default' @click="com_cancel" style="margin:25px 20px 0 0;">取消</a-button>
						<a-button type='primary' :disabled="select_user.length==0?true:false" @click="com_handleOk">完成</a-button>
					</a-form-item>
				</a-form>
				
				
				<a-form :form="form" v-if="visible==3?true:false">
					 <a-checkbox-group  @change="sel_label" v-model="queryForm.userLabel" style="margin: 20px 5px 0 0;width: 100%;"  class="checkbox_content">
						 <a-row type="flex"  align="middle" :gutter="16">
							 <a-col :xs="12" :sm="6" :md="4"  :offset="index%5!=0?1:0" v-for="(item,index) in userLabel" :key="item.id">
								 <a-checkbox :value="item.id" style="width: 100%;">
									 <div class="user_box user_active">
										 <div class="select_user">
											 <div class="select_user_name">{{item.title}}</div>
											 <div class="num">{{item.friendNum}}</div>
										 </div>
									 </div>
								 </a-checkbox>
							 </a-col>
						 </a-row>

						<!--<a-list :grid="{ gutter: 16, column: 6}" :dataSource="userLabel">-->
							<!--<a-list-item slot="renderItem" slot-scope="item, index">-->
								<!--<a-checkbox :value="item.id" style="width: 100%;">-->
									<!--<div class="user_box user_active">-->
										<!--<div class="select_user">-->
											<!--<div class="select_user_name">{{item.title}}</div>-->
											<!--<div class="num">{{item.friendNum}}</div>-->
										<!--</div>-->
									<!--</div>-->
								<!--</a-checkbox>-->
							<!--</a-list-item>-->
						<!--</a-list>-->
					</a-checkbox-group>
					<a-form-item :wrapperCol="{span: 24}" style="margin-bottom: 0;border-top:1px solid #E5E5E5 ;text-align: right;">
						<a-button type='default' @click="com_cancel" style="margin:25px 20px 0 0;">取消</a-button>
						<a-button type='primary' :disabled="select_label.length==0?true:false" @click="com_handleOk">完成</a-button>
					</a-form-item>
				</a-form>
				
			</a-modal>
	
	
			<a-modal title="使用素材" :footer="null" :visible="visible==1?true:false" @cancel="com_handleCancel" width="80%">
	
				<a-row>
					<a-col :xl="{span:8}" :lg="{span:12}">
						<a-input-search placeholder="请输入搜索内容。。。" style="width: 100%" v-model="searchKey" @search="onSearch" />
					</a-col>
	
					<a-col :xl="{span:16}" :lg="{span:24}" class="pagination_box">
						<a-pagination showQuickJumper showSizeChanger :pageSizeOptions="pagination.pageSizeOptions" :pagination="pagination" :total="pagination.total" :showTotal="total => `总共 ${total} 项`" :pageSize="pagination.pageSize" v-model="pagination.current" @change="onShowSizeChange" @showSizeChange="optionChange"  />
					</a-col>
				</a-row>
	
				<a-form :form="form">
					<a-checkbox-group  @change="sel_Material" v-model="modalIsChecked" style="margin: 0 5px 0 0;width: 100%;" class="checkbox_content sel_material">
					<!--<a-radio-group @change="sel_Material" v-model="modal_isRadio" style="margin: 0 5px 0 0;width: 100%;" class="checkbox_content">-->
						<a-tabs @change="tab_callback" type="card" class="modal_tabs" :activeKey="activeKey">
							
							<a-tab-pane tab="文本" key="1">
									<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="textData">
										<a-list-item slot="renderItem" slot-scope="item, index">
											<a-checkbox :value="item.id" style="width: 100%;">
												<div class="text">
													<div class="div-edit" v-html="item.content"></div>
												</div>
											</a-checkbox>
											<!--<a-radio :value="item.id" style="width: 100%;">-->
												<!--<div class="text">-->
													<!--<div class="div-edit" v-html="item.content"></div>-->
												<!--</div>-->
											<!--</a-radio>-->
		
										</a-list-item>
									</a-list>
							</a-tab-pane>
							<a-tab-pane tab="图片" key="2">
									<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="imgData">
										<a-list-item slot="renderItem" slot-scope="item, index">
											<a-checkbox :value="item.id" style="width: 100%;">
												<a-card hoverable class="img_box">
													<img alt="example" :src="item.mediapath" slot="cover" />
												</a-card>
											</a-checkbox>
											<!--<a-radio :value="item.id" style="width: 100%;">-->
												<!--<a-card hoverable>-->
													<!--<img alt="example" :src="item.mediapath" slot="cover" />-->
												<!--</a-card>-->
											<!--</a-radio>-->
										</a-list-item>
									</a-list>
							</a-tab-pane>
							<a-tab-pane tab="链接" key="3">
									<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="linkData">
										<a-list-item slot="renderItem" slot-scope="item, index">
											<a-checkbox :value="item.id" style="width: 100%;">
												<a-card hoverable class="link_box">
													<img alt="example" :src="item.mediapath" slot="cover" />
													<a-card-meta :title="item.title">
														<template slot="description">{{item.url}}</template>
													</a-card-meta>
												</a-card>
											</a-checkbox>
											<!--<a-radio :value="item.id" style="width: 100%;">-->
												<!--<a-card hoverable class="link_box">-->
													<!--<img alt="example" :src="item.mediapath" slot="cover" />-->
													<!--<a-card-meta :title="item.title">-->
														<!--<template slot="description">{{item.url}}</template>-->
													<!--</a-card-meta>-->
												<!--</a-card>-->
											<!--</a-radio>-->
										</a-list-item>
									</a-list>
							</a-tab-pane>
							<a-tab-pane tab="名片" key="4" v-if="pushType=='10'">
									<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="cardData">
										<a-list-item slot="renderItem" slot-scope="item, index">
											<a-checkbox :value="item.id" style="width: 100%;">
												<div class="ant-card ant-card-bordered ant-card-hoverable card_box">
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
											</a-checkbox>
											<!--<a-radio :value="item.id" style="width: 100%;">-->
												<!--<div class="ant-card ant-card-bordered ant-card-hoverable">-->
													<!--<div class="ant-card-body">-->
														<!--<div class="ant-card-meta top_box">-->
															<!--<div class="ant-card-meta-avatar">-->
																<!--<span  class="ant-avatar ant-avatar-circle ant-avatar-image car_box">-->
																	<!--{{item.title}}-->
																<!--</span>-->
															<!--</div>-->
															<!--<div class="ant-card-meta-detail">-->
																<!--<div class="ant-card-meta-title">{{item.alias}}</div>-->
															<!--</div>-->
														<!--</div>-->
													<!--</div>-->
													<!--<div class="bottom_box">公众号名片</div>-->
												<!--</div>-->
											<!--</a-radio>-->
										</a-list-item>
									</a-list>
							</a-tab-pane>
							<a-tab-pane tab="小程序" key="5" v-if="pushType=='10'">
									<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="programData">
										<a-list-item slot="renderItem" slot-scope="item, index">
											<a-checkbox :value="item.id" style="width: 100%;">
												<a-card hoverable class="link_box">
													<img alt="example" :src="item.mediapath" slot="cover" />
													<a-card-meta :title="item.title" :description="item.desc">
														<a-avatar slot="avatar" :src="item.iconurl" style="height:50px;width:50px" />
													</a-card-meta>
												</a-card>
											</a-checkbox>
											<!--<a-radio :value="item.id" style="width: 100%;">-->
												<!--<a-card hoverable class="link_box">-->
													<!--<img alt="example" :src="item.mediapath" slot="cover" />-->
													<!--<a-card-meta :title="item.title" :description="item.desc">-->
														<!--<a-avatar slot="avatar" :src="item.iconurl" style="height:50px;width:50px" />-->
													<!--</a-card-meta>-->
												<!--</a-card>-->
											<!--</a-radio>-->
										</a-list-item>
									</a-list>
							</a-tab-pane>
							<a-tab-pane tab="图文素材" key="6" v-if="pushType=='20'">
									<a-list :grid="{ gutter: 16, xl: 6,lg:4,md: 4, sm: 2, xs: 1}" :dataSource="text_imgData">
										<a-list-item slot="renderItem" slot-scope="item, index">
											<a-checkbox :value="item.id" style="width: 100%;">
												<a-card hoverable class="link_box">
													<div class="ant-card-meta">
														<div class="ant-card-meta-detail">
															<div class="ant-card-meta-title">
																{{item.title}}
															</div>
															<div class="ant-card-meta-description">
																<div class="div-edit" v-html="item.content"></div>
															</div>
														</div>
													</div>
													<div class="clearFloat" style="margin-top: 20px;">
														<img :class="img_index%2==0?'fl':'fr'" alt="example" style="width: 49%;margin-bottom: 4px;" :src="img_src.src" slot="cover" v-for="(img_src,img_index) in item.album" />
													</div>
												</a-card>
											</a-checkbox>
											<!--<a-radio :value="item.id" style="width: 100%;">-->
												<!--<a-card hoverable class="link_box">-->
													<!--<div class="ant-card-meta">-->
									        			<!--<div class="ant-card-meta-detail">-->
									        				<!--<div class="ant-card-meta-title">-->
									        					<!--{{item.title}}-->
									        				<!--</div>-->
									        				<!--<div class="ant-card-meta-description">-->
									        					<!--<div class="div-edit" v-html="item.content"></div>-->
									        				<!--</div>-->
									        			<!--</div>-->
									        		<!--</div> -->
									        		<!--<div class="clearFloat" style="margin-top: 20px;">-->
														<!--<img :class="img_index%2==0?'fl':'fr'" alt="example" style="width: 49%;margin-bottom: 4px;" :src="img_src.src" slot="cover" v-for="(img_src,img_index) in item.album" />-->
													<!--</div>-->
												<!--</a-card>-->
											<!--</a-radio>-->
										</a-list-item>
									</a-list>
							</a-tab-pane>
						</a-tabs>
					</a-checkbox-group>
					<!--</a-radio-group>-->
					<a-form-item :wrapperCol="{span: 24}" style="margin-bottom: 0;border-top:1px solid #E5E5E5 ;text-align: right;">
						<a-button type='default' @click="com_cancel" style="margin:25px 20px 0 0;">取消</a-button>
						<a-button type='primary' :disabled="disabled" @click="com_handleOk('3')">完成</a-button>
					</a-form-item>
				</a-form>
			</a-modal>
	
			<div v-if="fixed_show" class="fixed_success">
				<div class="center_box">
					<div>
						<a-icon class="icon" type="check-circle" style=""></a-icon>
						<div class="decs">提交成功</div>					
					</div>
					
					<div class="text">
						<p>1.点击“完成”进入列表页面</p>
						<p>2.点击“克隆”复制前一条推送信息并跳到新建页面</p>
					</div>
					<div class="btn_box clearFloat">
						<a-button class="fl" type='primary' @click="cancel">完成</a-button>
						<a-button class="fr" type='primary' @click="cloneFn">克隆</a-button>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	var emoji = require('../../common/emojiMap');
	import viewMaterial from './viewMaterial'
	import moment from 'moment';
	import 'moment/locale/zh-cn';
	moment.locale('zh-cn');
	var myDate = new Date(); //获取系统当前时间
	let id = 0
	export default {
		name: "NewPush",
		components: {
			viewMaterial
		},
		data() {
			window.form = this
			return {
				provinceData: [{//发送内容选择框数据
					'key': '1',
					'val': '文本'
				}, {
					'key': '2',
					'val': '图片'
				}, {
					'key': '3',
					'val': '链接'
				}, {
					'key': '4',
					'val': '名片'
				}, {
					'key': '5',
					'val': '小程序'
				}, {
					'key': '6',
					'val': '图文素材'
				}],
				formItemLayout: {
			        labelCol: {
			          lg: { span: 24 },
			          xl: { span: 2 },
			        },
			        wrapperCol: {
			          lg: { span: 24 },
			          xl: { span: 22 },
			        },
			    },
				modal_isRadio: '', //弹窗框点击选择单选素材

                modalIsChecked:[],  //弹窗多选的素材
                sendMsgContent:[{
				    type:'1',
					content:'',
                    materialItem:[]
				}],//发送内容数组
				selectMateriaIndex:'',
				dateFormat: 'YYYY/MM/DD',//日期格式
				queryForm: {
					friendsId: [], //好友id [1,2]
//					userChecked: false, //true-排除当前选择 -- 用户
					userLabel: [], //用户标签 [1,2]
//					friendsChecked: false, //true-排除当前选择--机器人
					sendValue: 20, //10 定时发送 20 立即发送
					timePicker: moment(), //当前时间
					datePicker: moment(), //当前日期
					textareaVal: '', //文本域
					visble_type:10		//10 公开 20 部分可见 30 不给谁看
				},
				timePicker_index:'',//当前时间索引
				datePicker_index:'',//当前日期索引
				sel_save_material:false,//保存素材选择框
				view_material: [], //展示选择素材
				timePickerArr: [],//选择时间
				datePickerArr: [],//选择日期
				textareaValArr: [],//素材输入框
				timeShow: [],//创建日期和时间集合
				userLabel: [], //用户标签 [1,2]
				friendsId: [], //好友id [1,2]
				userTotal: 0, //用户总数
				fixed_show:false,//显示完成界面
				config: {//自定义验证
					rules: [{
						type: 'object',
						required: true,
						message: '请选择时间!'
					}],
				},
				config_date: {
					rules: [{
						type: 'object',
						required: true,
						message: '请选择日期!'
					}],
				},
				liConHeight: 49, // 两行文字的高度
                pushType:this.$route.query.pushType,
				/*----model 数据 start----*/
				text_imgData: [],//图文素材
				programData: [],//小程序素材
				cardData: [],//名片素材
				linkData: [],//链接素材
				textData: [],//文字素材
				imgData: [],//图片素材
				visible: false,//model 显示
				disabled: true,//model 是否禁用完成按钮
				pagination: { //素材分页
					pageSizeOptions: ['10', '20', '30', '40', '50'],
					current: 1,
					pageSize: 10,
					total: 0,
				},
				user_pagination: { //用户标签分页
					pageSizeOptions: ['10', '20', '30', '40', '50'],
					current: 1,
					pageSize: 10,
					total: 0,
				},
				label_pagination: { //用户标签分页
					pageSizeOptions: ['10', '20', '30', '40', '50'],
					current: 1,
					pageSize: 10,
					total: 0,
				},
				select_user:[],//用户昵称集合
				select_label:[],
				numTotal:0,
				searchKey:'',//modal弹出框搜索
				searchKey_friend:'',
				searchKey_user:'',
				activeKey: '1',//tabs组件 当前激活 tab 面板的 key
				
				
				/*----model 数据 end----*/
			}
		},
		watch: {
			'modalIsChecked': {
				handler: function(value) {
					value ? this.disabled = false : this.disabled = true;
				},
				deep: true
			}
		},
		mounted() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},

		computed: {
			departmentID() {
				return this.$store.state.user.user.department.id //返回store实例的count状态
			},
		},
		methods: {
			moment,

			optionChange(current, pageSize) {//素材分页
                this.pagination.current = current;
				this.pagination.pageSize = pageSize;
				this.getMaterialData();
			},
			onShowSizeChange(page, pageSize) {//素材分页
				this.pagination.current = page;
				this.getMaterialData();
			},
			user_onShowSizeChange(page, pageSize){//用户分页
				this.user_pagination.current = page;
				this.getUserList();
			},
			user_optionChange(current, pageSize) {//用户分页
                this.user_pagination.current = current
				this.user_pagination.pageSize = pageSize;
				this.getUserList();
			},
			
			select_user_onShowSizeChange(page, pageSize){//用户分页
				this.label_pagination.current = page;
				this.refreshGroup();
			},
			select_user_optionChange(current, pageSize) {//用户分页
                this.label_pagination.current = current
				this.label_pagination.pageSize = pageSize;
				this.refreshGroup();
			},
			
//			onChangeUser(e) { //排除用户标签
//				console.log(`checked = ${this.queryForm.userChecked}`)
//				this.queryForm.userChecked = !this.queryForm.userChecked;
//				this.getLabelTotal();
//			},
//			onChangeRobot(e) { //true-排除当前好友
//				console.log(`checked = ${e.target.checked}`)
//				this.queryForm.friendsChecked = !this.queryForm.friendsChecked;
//				this.getLabelTotal();
//			},
			onChangeRadio(e){
				 this.queryForm.visble_type = e.target.value;
				 this.getLabelTotal();
			},
//			handleChangeRobot(value) { //用户标签
//				this.queryForm.userLabel = value;
//			},
			clickChangeUser(num){//选择用户标签弹窗
				if(num==2){
					this.getUserList();
				}else{
					this.refreshGroup();
				}
				this.visible = num;
			},
			
			clear_label_user(index){//清除用户已选择签
				this.queryForm.userLabel.splice(index,1);
				this.select_user_filter();
				if(this.queryForm.userLabel.length==0){
					this.form.resetFields('userLabel', {
						initialValue: []
					})
				}
				this.getLabelTotal();
			},
			
			clear_user(index){//清除好友id已选择签
				this.queryForm.friendsId.splice(index,1);
				this.user_filter();
				if(this.queryForm.friendsId.length==0){
					this.form.resetFields('friendsId', {
						initialValue: []
					})
				}
				this.getLabelTotal();
			},
			clear_user_all(){//清除好友id已选标签
				this.form.resetFields('friendsId', {
					initialValue: []
				})
				this.queryForm.friendsId = [];
				this.user_filter();
				this.getLabelTotal();
			},
			
			clear_label_all(){
				this.form.resetFields('userLabel', {
					initialValue: []
				})
				this.queryForm.userLabel = [];
				this.select_user_filter();
				this.getLabelTotal();
			},
//			handleChangeUser(value) { //选择好友id标签
//				this.queryForm.friendsId = value;
//			},
			clearLabel() { //清除所有标签
				this.form.resetFields('friendsId', {
					initialValue: []
				})
				this.form.resetFields('userLabel', {
					initialValue: []
				})
				this.queryForm.friendsId = [];
				this.queryForm.userLabel = [];
				this.user_filter();
				this.select_user_filter();
				this.getLabelTotal();
			},
			onChangeSend(e) { //10 定时发送 20 立即发送
				this.queryForm.sendValue = e.target.value;
			},
			
			openTimeFn(index){
				this.timePicker_index = index;//当前时间索引
			},
			openDateFn(index){
				this.datePicker_index = index;//当前日期索引
			},
			onChangeDate(time) { //选择日期

				let index = this.datePicker_index;
				let that = this;
				this.form.getFieldValue('date_keys').forEach((item)=>{
					that.datePickerArr.push('');
				});
				this.datePickerArr.splice(index,1,time.format('YYYY-MM-DD'));
				
				console.log('日期',time.format('YYYY-MM-DD'))
				console.log('index',index)
				console.log('长度',this.datePickerArr.length)
				
				this.queryForm.datePicker = time;
				this.mergeTime();
			},
			onChangeTime(time) { //选择时间
				let index = this.timePicker_index;
				let that = this;
				this.form.getFieldValue('time_keys').forEach((item)=>{
					that.timePickerArr.push('');
				});
				this.timePickerArr.splice(index,1,time.format('HH:mm:ss'));
				
				console.log('时间',time.format('HH:mm:ss'))
				console.log('index',index+1)
				console.log('长度',this.timePickerArr.length)
				
				this.queryForm.timePicker = time;
				this.mergeTime();
			},
			mergeTime() {//处理时间
				this.timeShow = [];
				let datePickerArr = this.datePickerArr;
				let timePickerArr = this.timePickerArr;
				
				for(let i = 0; i < datePickerArr.length; i++) {
					for(let j = 0; j < timePickerArr.length; j++) {
						if(datePickerArr[i]&&timePickerArr[j]){
							this.timeShow.push(datePickerArr[i] + ' ' + timePickerArr[j]);
						}
					}
				}
			},
			timePickerDel(k, index) { //删除时间
				this.timePickerArr.splice(index, 1)
				this.mergeTime();
				const {
					form
				} = this
				const time_keys = form.getFieldValue('time_keys');
				form.setFieldsValue({
					time_keys: time_keys.filter(key => key !== k),
				})
			},
			datePickerDel(k, index) { //删除日期
				this.datePickerArr.splice(index, 1)
				this.mergeTime();
				const {
					form
				} = this
				const date_keys = form.getFieldValue('date_keys')
				form.setFieldsValue({
					date_keys: date_keys.filter(key => key !== k),
				})
			},

			addTimePicker() { //添加时间
				const {
					form
				} = this;
				const time_keys = form.getFieldValue('time_keys')
				const nextKeys = time_keys.concat(++id);
				form.setFieldsValue({
					time_keys: nextKeys,
				})
			},
			addDatePicker() { //添加日期
				const {
					form
				} = this;
				const date_keys = form.getFieldValue('date_keys')
				const nextKeys = date_keys.concat(++id)
				form.setFieldsValue({
					date_keys: nextKeys,
				})
			},
			open(item) {
				const liCon = this.$refs.liCon
				var height = liCon.offsetHeight
				if(height === this.liConHeight) { // 展开
					liCon.style.height = 'auto'
					height = liCon.offsetHeight
					liCon.style.height = this.liConHeight + 'px'
					var f = document.body.offsetHeight // 必加
					liCon.style.height = height + 'px'
				} else { // 收缩
					liCon.style.height = this.liConHeight + 'px'
				}
				if(!item.openFlag) {
					this.$set(item, 'openFlag', true)
				} else {
					this.$set(item, 'openFlag', false)
				}
			},
			
			tab_callback(key) {//model tab切换
				console.log(key)
				this.activeKey = key;
				this.getMaterialData();
			},
            remove(index){//删除输入框
                this.sendMsgContent.splice(index,1)
            },
//			remove(k){//删除输入框
//				const { form } = this;
//				const keys = form.getFieldValue('textarea_val');
//				form.setFieldsValue({
//			        textarea_val: keys.filter(key => key !== k),
//				});
//			},
			sel_label(checkedValues){
				this.queryForm.userLabel = checkedValues;
				
				this.form.setFieldsValue({
                    userLabel: checkedValues
                })
				this.select_user_filter();
				this.getLabelTotal();
			},
			sel_select_user(checkedValues){//选择好友id标签
				this.queryForm.friendsId = checkedValues;
				this.form.setFieldsValue({
					friendsId: checkedValues
				})
				this.user_filter();
				this.getLabelTotal();
			},
			select_user_filter(){
				//处理用户标签
				let that = this;
				that.select_label = [];
				let num = 0;

				that.queryForm.userLabel.forEach((val)=>{
					that.userLabel.forEach((item)=>{
						if(val==item.id){
							num = num + parseInt(item.friendNum);
							that.numTotal = num;
							that.select_label.push({'title':item.title});
						}
					})
				})
			
			},
			user_filter(){//处理好友id标签
				let that = this;
				that.select_user = [];

				that.queryForm.friendsId.forEach((val)=>{
					that.friendsId.forEach((item)=>{
						if(val==item.id){
							that.select_user.push({'nickname':item.nickname});
						}
					})
				})
			},
            sel_Material(checkedValue) { //选择素材
				console.log('checkedValue',checkedValue)
                this.modalIsChecked = checkedValue
            },
//			sel_Material(e) { //选择素材
//				let allList = this.activeKey==1?this.textData:
//				this.activeKey==2?this.imgData:
//				this.activeKey==3?this.linkData:
//				this.activeKey==4?this.cardData:
//				this.activeKey==5?this.programData:
//				this.activeKey==6?this.text_imgData:"";
//				this.modal_isRadio = e.target.value;
//				console.log('checked = ', e.target.value)
//
//				this.view_material = [];
//				for(let val of allList){
//					if(val.id == e.target.value){
//						this.view_material.push(val);
//						return false;
//					}
//				}
//			},
			useMaterial(index) { //使用素材按钮
				if(this.selectMateriaIndex!=index) {
                    this.modalIsChecked = []
				}
				this.selectMateriaIndex = index
				this.getMaterialData();
				this.visible = 1;
			},
			checkBoxChange(e) { //保存素材选择框
				this.sel_save_material = e.target.checked;
				console.log('保存素材选择框==',this.sel_save_material)
			},
			com_handleCancel() { //modal弹出框取消
				this.visible = false;
			},
			onSearch_friend(value){
				this.searchKey_friend = value;
				this.getUserList();
			},
			onSearch_user(value){
				this.searchKey_user = value;
				this.refreshGroup();
			},
			onSearch(value) { //modal弹出框搜索
				this.searchKey = value;
				this.getMaterialData();
			},
            delMaterial(index,itemIndex){//删除素材
                this.sendMsgContent[index].material_id.splice(itemIndex,1)
                this.sendMsgContent[index].materialItem.splice(itemIndex,1)
				if(this.sendMsgContent[index].materialItem.length==0) {
                    this.sendMsgContent[index].type= '1'
				}
            },
//			delMaterial(){//删除素材
//				this.modal_isRadio = '';
//				this.view_material = [];
//			},
			com_cancel() {//modal弹出框关闭
				this.visible = false;
				this.modal_isRadio = '';
				this.view_material = [];
			},
			com_handleOk(type) { //modal弹出框选择
				if(type=='3') {
				    if(this.pushType == '20') {
                        let arr1 = [].concat(this.textData,this.linkData,this.text_imgData)
						let flag =true
						if(this.modalIsChecked.length>1) {
                            arr1.forEach(el=>{
                                this.modalIsChecked.forEach(item=>{
                                    if(el.id ==item) {
                                        flag =false
                                    }
                                })
                            })
						}
						if(flag) {
                            if(this.modalIsChecked.length>9) {
                                this.$message.warning('最多只能选取九张图片');
                                return
							}
                            let arr2 = [].concat(this.textData,this.imgData,this.linkData,this.cardData,this.programData,this.text_imgData)
                            arr2.forEach(el=>{
                                this.modalIsChecked.forEach(item=>{
                                    if(el.id ==item) {
                                        this.sendMsgContent[this.selectMateriaIndex].materialItem.push(el)
                                    }
                                })
                            })
						} else {
                            this.$message.warning('同一条消息非图片素材只能选择一项');
                            return
						}
					}

				    this.sendMsgContent[this.selectMateriaIndex].type = '2';
                    this.sendMsgContent[this.selectMateriaIndex].material_id = this.modalIsChecked
                    this.sendMsgContent[this.selectMateriaIndex].materialItem = []
					let arr = [].concat(this.textData,this.imgData,this.linkData,this.cardData,this.programData,this.text_imgData)
					arr.forEach(el=>{
                        this.modalIsChecked.forEach(item=>{
                            if(el.id ==item) {
                                this.sendMsgContent[this.selectMateriaIndex].materialItem.push(el)
							}
						})
					})
				}
                this.visible = false;
			},
			textareaChange(e) {//素材输入框
				//				this.queryForm.textareaVal = e.target.value;
				this.textareaValArr.push(e.target.value);
			},

            addTextarea() {
                if(this.pushType==20) {
                    if(this.sendMsgContent[0].type=='2') {
                        let flag = true
                        this.textData.forEach(el=>{
                            if(el.id==this.sendMsgContent[0].material_id[0]) {
                                flag = false
                            }
                        })
						if(flag) {
                            this.$message.warning('第一条是素材，第二条不能是文本');
                            return false;
						}
					}
                    if(this.sendMsgContent.length > 1) {
                        this.$message.warning('朋友圈推送消息数不能超过两个');
                        return false;
					}
				}
				if(this.sendMsgContent.length > 2) {
					this.$message.warning('消息数不能超过3个');
					return false;
				}
                this.sendMsgContent.push({
					type:'1',
					content:'',
                    materialItem:[]
				})
			},
//			addTextarea() { //添加textArea
//				const {
//					form
//				} = this;
//				const textarea_val = form.getFieldValue('textarea_val');
//				if(textarea_val.length > 2) {
//					this.$message.warning('消息数不能超过3个');
//					return false;
//				}
//				const nextKeys = textarea_val.concat(++id)
//				form.setFieldsValue({
//					textarea_val: nextKeys,
//				})
//			},
			cancel() { //返回上一级页面
				//10 私聊推送 20 朋友圈推送
				let jump_url = this.pushType == '10'?'/pushMange/privatePush':'/pushMange/friendCirclePush';
				this.$router.push({
					path: jump_url
				});
			},
			cloneFn(){
				this.fixed_show = false;
			},
			handleSubmit(e) {//提交
				e.preventDefault()
				let that = this;
				if(this.pushType=='20') {
				    if(that.sendMsgContent.length>1) {
                        if(that.sendMsgContent[1].type=='1') {
                            this.$message.warning('第二段必须为素材');
                            return false
                        }
                        if(this.sendMsgContent[0].type=='2') {
                            let flag = true
                            this.textData.forEach(el=>{
                                if(el.id==this.sendMsgContent[0].material_id[0]) {
                                    flag = false
                                }
                            })
                            if(flag) {
                                this.$message.warning('第一条不是文本素材，不能添加第二条消息');
                                return false;
                            }
                            if(that.sendMsgContent[1].type=='2') {
                                let flag2 = true
                                this.textData.forEach(el=>{
                                    if(el.id==that.sendMsgContent[1].material_id[0]) {
                                        flag2 = false
                                    }
                                })
                                if(!flag&&!flag2) {
                                    this.$message.warning('不能发送两段文字素材');
                                    return false
                                } else if(flag&&flag2) {
                                    this.$message.warning('不能发送两段素材');
                                    return false
                                } else {
                                    let flag3 = true
                                    this.text_imgData.forEach(el=>{
                                        if(el.id==that.sendMsgContent[0].material_id[0]||el.id==that.sendMsgContent[1].material_id[0] ) {
                                            flag3 =false
                                        }
                                    })
									if(!flag3) {
                                        this.$message.warning('朋友圈素材必须单独使用')
                                        return false
									}
                                }
							}
                        }
						if(that.sendMsgContent[0].type=='1') {
				            if(that.sendMsgContent[1].type=='1') {
                                this.$message.warning('不能发送两段文字');
                                return false
							} else {
				                let flag4 =true
                                let flag5 =true
                                this.text_imgData.forEach(el=>{
                                    if(el.id==that.sendMsgContent[1].material_id[0] ) {
                                        flag4 = false
									}
								})
								if(!flag4) {
                                    this.$message.warning('朋友圈素材必须单独使用');
                                    return false
								}
                                this.textData.forEach(el=>{
                                    if(el.id==that.sendMsgContent[1].material_id[0] ) {
                                        flag5 = false
                                    }
                                })
                                if(!flag5) {
                                    this.$message.warning('不能发送两段文字');
                                    return false
				                }
							}
						}
					}

				}


				this.form.validateFields((err, fieldsValue) => {
					if(err) {
						return
					}
					let datePicker = [];
					let timePicker = [];
					let textareaValArr = [];
					if(that.queryForm.sendValue == 10) {//10 定时发送 20 立即发送

						for(let i = 0; i < fieldsValue.date_picker.length; i++) {
							if(fieldsValue.date_picker[i]) {
								datePicker.push(fieldsValue.date_picker[i].format('YYYY-MM-DD'));
							}
						}
						for(let j = 0; j < fieldsValue.time_picker.length; j++) {
							if(fieldsValue.time_picker[j]) {
								timePicker.push(fieldsValue.time_picker[j].format('HH:mm:ss'));
							}
						}
						
						delete fieldsValue.date_picker;
						delete fieldsValue.time_picker;
					}
					
					delete fieldsValue.date_keys;
					delete fieldsValue.time_keys;

//					if(that.view_material.length==0){//没有选择素材
//
//						for(let s = 0; s < fieldsValue.textareaVal.length; s++) {
//							if(fieldsValue.textareaVal[s]) {
//								textareaValArr.push(fieldsValue.textareaVal[s]);
//							}
//						}
//					}
					
					delete fieldsValue.textarea_val;
					delete fieldsValue.textareaVal;

					const values = {
						...fieldsValue,
						'datePicker': datePicker,//日期
						'timePicker': timePicker,//时间
						'textareaVal': textareaValArr//输入框内容
					}
					console.log('Received values of form: ', values)

					this.$axios({
						method: 'POST',
						url: '/index.php?r=uc/sale/push-add',
						data: Object.assign(values, {
//							'save_material': that.sel_save_material,	//是否保存素材
							'pushType':      	that.pushType, //10 私聊推送 20 朋友圈推送
//							'userChecked':   	that.queryForm.userChecked, //true-排除当前选择 -- 用户
//							'friendsChecked':   that.queryForm.friendsChecked, //true-排除当前好友
							'visble_type':        that.queryForm.visble_type, //10 公开 20 部分可见 30 不给谁看
							'sendValue':        that.queryForm.sendValue, //10 定时发送 20 立即发送
							'FriendsNum':    	that.userTotal, //顾客个数
							'data': that.sendMsgContent
						}) // 参数
					}).then(function(d) {
						// 响应成功回调
						var udata = d.data;
						if(udata.status == 1) {
							that.$message.success('发送成功', 2);
							that.fixed_show = true;
						}
					});

				})
			},
			getMaterialData() { //获取所有素材接口
				let that = this;

				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/material/material',
					data: {
						'department_id': that.departmentID,
						'all': 1,
						'searchKey':that.searchKey,
						'p': that.pagination.current,
						'n': that.pagination.pageSize,
						'type':that.activeKey==1?1:that.activeKey==2?2:that.activeKey==3?3:that.activeKey==4?7:that.activeKey==5?8:that.activeKey==6?9:"",
					}
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.pagination.total = parseInt(udata.data.total); //数据总条数
                        !!udata.data.list.textData&&(that.textData = udata.data.list.textData)
                        !!udata.data.list.imgData&&(that.imgData = udata.data.list.imgData)
                        !!udata.data.list.linkData&&(that.linkData = udata.data.list.linkData)
                        !!udata.data.list.cardData&&(that.cardData = udata.data.list.cardData)
                        !!udata.data.list.programData&&(that.programData = udata.data.list.programData)
                        !!udata.data.list.text_imgData&&(that.text_imgData = udata.data.list.text_imgData)

//						that.textData = !!udata.data.list.textData?udata.data.list.textData:[];
//						that.imgData = !!udata.data.list.imgData?udata.data.list.imgData:[];
//						that.linkData = !!udata.data.list.linkData?udata.data.list.linkData:[];
//						that.cardData = !!udata.data.list.cardData?udata.data.list.cardData:[];
//						that.programData = !!udata.data.list.programData?udata.data.list.programData:[];
//						that.text_imgData = !!udata.data.list.text_imgData?udata.data.list.text_imgData:[];


						for(let i = 0; i < that.textData.length; i++) {
							that.textData[i].content = emoji.stringToHtml(that.textData[i].content);
						}
						
						for(let j = 0; j < that.text_imgData.length; j++) {
							that.text_imgData[j].content = emoji.stringToHtml(that.text_imgData[j].content);
						}

					}
				});
			},
			
				
			getUserList(){//获取用户标签
				let that = this;

				this.$axios({
					method: 'GET',
					url: '/index.php?r=uc/customer/list',
					params: {
						'department_id': that.departmentID,
						'key':that.searchKey_friend,
//						'friendsChecked':  that.queryForm.friendsChecked, //true-排除当前好友  不需要这个参数
//						'label':that.queryForm.userLabel,//用户标签                                                                  不需要这个参数
						'p': that.user_pagination.current,
						'n': that.user_pagination.pageSize,
					}
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.user_pagination.total = parseInt(udata.data.count); //数据总条数
						that.friendsId = udata.data.list;
					}
				});
				
			},
			refreshGroup() {//请求标签
				let that = this;
				
				//获取所有标签接口
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/material/customer-label',
					data:{
						'department_id': that.departmentID,
						'searchKey':that.searchKey_user,
						'p': that.label_pagination.current,
						'n': that.label_pagination.pageSize,
					}
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.label_pagination.total = parseInt(udata.data.total); //数据总条数
						that.userLabel = udata.data.list;
					}
				});
			},
			getLabelTotal() {//请求用户总数
				let that = this;
				this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/sale/label-friends-num',
					data: Object.assign({},{
						'department_id': that.departmentID,
						'userLabel':that.queryForm.userLabel,
						'friendsId':that.queryForm.friendsId,
//						'friendsChecked':that.queryForm.friendsChecked,
						'visble_type':that.queryForm.visble_type, //10 公开 20 部分可见 30 不给谁看
//						'userChecked':that.queryForm.userChecked
					}) // 参数
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						that.userTotal = udata.data;
					}
				});
			},
			resendFn(resend_id){//重新发送
					this.$axios({
					method: 'POST',
					url: '/index.php?r=uc/sale/send-restart',
					data: {
						'id':resend_id
					}
				}).then(function(d) {
					// 响应成功回调
					var udata = d.data;
					if(udata.status == 1) {
						console.log(udata.data)
					}
				});
			},
		},
		beforeCreate() {
			this.form = this.$form.createForm(this);

			this.form.getFieldDecorator('date_keys', {
				initialValue: [++id]
			});
			this.form.getFieldDecorator('time_keys', {
				initialValue: [++id]
			});
			this.form.getFieldDecorator('textarea_val', {
				initialValue: [++id]
			});
			this.form.getFieldDecorator('friendsId', {
				initialValue: []
			});
			this.form.getFieldDecorator('userLabel', {
				initialValue: []
			});
		},
		created() {
			if(!!this.$route.query.resend_id){
				this.resendFn(this.$route.query.resend_id);//重新发送
			}
			this.getLabelTotal();
		}
	}
</script>

<style lang="less">
	.modal_tabs {
		margin-top: 20px;
	}
	
	.modal_tabs .ant-radio {
		float: right;
	}
	
	.background-color {
		height: calc(~'100vh - 90px');
		overflow-y: auto;
	}
	
	.check_ck .ant-radio {
		position: absolute;
		top: 0;
		z-index: 10;
		width: 97px;
		display: inline-block;
		height: 36px;
		opacity: 0;
	}
	.ant-card-cover img {
	    width: 100%;
	    height: 100%;
	    padding: 10px;
	}
	.ant-radio-wrapper-checked .link_box  .ant-card-meta-detail div{
		color: #fff !important;
	}
	.checkbox_content .ant-checkbox,.checkbox_content .ant-radio{
		opacity: 0 !important;
	}
	.ant-checkbox-wrapper-checked  {
		.text,.img_box,.link_box,.card_box {
			background: #1890ff !important;
			color: #fff !important;
		}
	}
	.material_content {
		.ant-form-item-children {
			position: static;
		}
	}
</style>
<style scoped lang="less">

	@media only screen and (max-width: 1200px){
		.sel_user{
			text-align: left !important;
			display: block !important;
			margin-top: 20px;
		}
	}
	
	@media  (min-width: 320px){
		.pagination_box{
			text-align: left;
			margin-top: 20px;
		}
	}
	@media  (min-width: 1200px){
		.pagination_box{
			text-align: right;
			margin-top: 0;
		}
	}


	.user_box{
		border: 1px solid #bbb;
		padding: 10px;
		border-radius:5px ;
		.select_user{
			.user_avatar{
				/*max-height: 30%;*/
				/*max-width: 30%;*/
				height: 50px;
				width: 50px;
				border-radius:50% ;
				margin-right: 5%;
				display: inline-block;
				vertical-align: middle;
				img{
					border-radius: 10px;
					width: 100%;
					height: 100%;
				}
			}
			.user_name{
				max-width: 60%;
				color: #000000;
	    		font-size: 14px;
				display: inline-block;
				vertical-align: middle;
				overflow-x: hidden;
				text-overflow: ellipsis;
				word-break: break-all;
				white-space: nowrap;
			}
			.select_user_name{
				color: #000000;
	    		font-size: 14px;
	    		text-align: center;
			}
			.num{
				text-align: center;
				margin-top: 5px;
				color: #000000;
	    		font-size: 14px;
			}
		} 
	}
	.ant-radio-wrapper-checked{
		.div-edit,.ant-card,.bottom_box{
			background: #1890ff !important;
			color: #fff !important;
			border:1px solid #1890ff  !important;
		}
	}
	
	.ant-checkbox-wrapper-checked{
	 .user_active{
	 		background: #1890ff !important;
			border:1px solid #1890ff  !important;
	  		.user_name{
				color: #fff !important;
			}
			.select_user_name{
				color: #fff !important;
			}
			.num{
				color: #fff !important;
			}
	 	}
	}
	.sel_user .info{
		padding: 4px 15px 4px 37px;
	}
	.sel_user .info .circle_icon{
		top: 7px;
	}
	.login-form {
		margin-bottom: 160px;
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
	
	.mag_push_title {
		border-bottom: 1px solid rgb(187, 187, 187);
		margin: 0 0 20px 0;
		padding: 17px 38px;
		font-size: 16px;
	}
	
	.col-margin {
		margin: 0 0 0 38px;
	}
	
	.col-margin .time {
		position: relative;
		background: #E6F7FF;
		border: 1px solid #91D5FF;
		color: #101010;
		font-size: 14px;
		padding: 4px 6px;
		display: inline-block;
		border-radius: 4px;
		margin: 0px 0px 20px 0px;
		max-width: 75%;
		overflow-x:hidden ;
		padding-right: 40px;
	}
	
	.more{
		position: absolute;
		top: 0;
		right: 10px;
		width: 20px;
		height: 20px;
		cursor: pointer;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.ant-alert {
		font-size: 14px;
		font-variant: tabular-nums;
		line-height: 1.5;
		color: rgba(0, 0, 0, .65);
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		list-style: none;
		position: relative;
		padding: 8px 15px 8px 37px;
		border-radius: 4px;
		border: 1px solid #91d5ff;
		background-color: #e6f7ff;
		display: inline-block;
	}
	
	.circle_icon {
		top: 10.5px;
		left: 16px;
		position: absolute;
		svg{
			font-size: 16px;
		}
	}
	
	.ant-info span {
		color: #1890ff;
		margin: 0 2px;
	}
	
	.ant-info .pointer {
		cursor: pointer;
		margin-left: 20px;
	}
	.dynamic-delete-button svg{
		font-size: 18px;
	}
	.anticon.close svg {
		font-size: 18px;
		margin-left: 4px;
	}
	
	.modal_tabs {
		.text {
			min-height: 120px;
		}
		.div-edit {
			border: 1px solid #bbb;
			min-height: 120px;
			padding: 10px;
			height: auto;
			overflow-y: initial;
			outline: none;
			word-break: break-all;
			word-wrap: break-word;
			white-space: pre-wrap;
			max-width: initial;
			margin: 0;
		}
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
			    margin: 0;
			}
			.ant-card-meta-detail{
				margin-top: 16%;
			}
		}
		.bottom_box {
			padding: 7px 0;
			background: #fafafa;
			font-size: 12px;
			color: #5f5f5f;
			padding-left: 24px;
		}
	}
	
	
.fixed_success{
	position: fixed;
	top: 65px;
	left: 260px;
	width: 100%;
	height: 120%;
	background: #fff;
	z-index: 10;
	.center_box{
		width: 360px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin:-300px 0 0 -340px;
		text-align: center;
	}
	.icon{
		color: green;
		margin-bottom: 16px;
		svg{
			font-size: 72px;
		}
	}
	.decs{
		font-size: 24px;
	    color: rgba(0,0,0,.85);
	    font-weight: 500;
	    line-height: 32px;
	    margin-bottom: 20px;
	}
	.text{
		padding: 20px;
		background: #f0f2f5;
		text-align: left;
	}
	.btn_box{
		margin-top: 40px;
		padding: 0 90px;
	}
}

</style>