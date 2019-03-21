
<style lang="less" scoped>
	/*清除浮动代码*/
	.hide {
		display: none;
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
    .customer-details {
        color: rgb(16,16,16);
        position: relative;
        height: calc(~"100vh - 90px");
        overflow: auto;
        .customer-info-wx {
            padding: 10px 25px;
            background: #ffffff;
            span {
                margin-left: 20px;
            }
        }
        .customer-info, .label-info, .order-info {
            background: #ffffff;
            .info-header {
                padding: 10px 25px;
                border-bottom: 2px solid #f0f2f5;
                height: 52px;
                line-height: 32px;
                span {
                    font-size: 16px;
                }
            }
            .info-content {
                padding: 10px 25px;
                .ant-tag:hover {
                    background: #1890ff;
                    color: #ffffff;
                    opacity: 1;
                }
                .ant-form-item {
                    margin-bottom: 12px;
                }
            }
        }
    }
    .tag-modal {
        .ant-tag:hover {
            background: #1890ff;
            color: #ffffff;
        }
        .ant-tag-checkable{
            border: 1px solid #d9d9d9;
            background: #fafafa;
        }
        .ant-tag-checkable-checked {
            background: #1890ff;
        }
    }
</style>
<template>
	<div class="customer-details">
        <div style="background: rgb(240,242,245)">
            <a-button type="default" icon="left" @click="back">返回</a-button>
        </div>
        <br>
        <div class="customer-info-wx">
            <a-avatar :src="contactInfo.avatar_url" :size="50" style="border-radius: 10px"/>
            <span style="font-size: 16px">{{contactInfo.nickname}}</span>
            <span style="color: rgb(136,136,136)">所属店铺：{{departmentInfo.name}}</span>
            <!--<span style="color: rgb(136,136,136)">初次到店：{{contactInfo.agree_on}}</span>-->
        </div>
        <br>
        <div class="customer-info">
            <div class="info-header">
                <span>用户信息</span>
                <a-button class="fr" type='primary' @click="edit_save" style="width: 70px">{{editStatus?'保存':'编辑'}}</a-button>
            </div>
            <div class="info-content">
                <a-form >
                    <a-row>
                        <a-col :xl='6' :md="12"  :xs="24">
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='姓名'>
                                <span v-if="!editStatus">{{contactInfo.real_name}}</span>
                                <a-input v-else v-model="contactInfo.real_name" />
                            </a-form-item>
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='生日'>
                                <span v-if="!editStatus">{{contactInfo.birthTime}}</span>
                                <a-date-picker v-else placeholder="生日" :defaultValue="moment(contactInfo.birth, 'YYYY-MM-DD')" @change="onChangeBirth"/>
                            </a-form-item>
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='会员卡号'>
                                <span v-if="!editStatus">{{contactInfo.cart_number}}</span>
                                <a-input v-else v-model="contactInfo.cart_number" />
                            </a-form-item>
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='销售顾问'>
                                <span v-if="!editStatus">{{contactInfo.adviser_name}}</span>
                                <a-select v-else  @change="handAdviserChange" :defaultValue="contactInfo.adviser_id">
                                    <a-select-option v-for="item in adviser_all" :key="item.id">
                                        {{item.user_name}}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :xl='6' :md="12"  :xs="24">
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='电话'>
                                <span v-if="!editStatus">{{contactInfo.tel}}</span>
                                <a-input v-else v-model="contactInfo.tel" />
                            </a-form-item>
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='性别'>
                                <span v-if="!editStatus">{{contactInfo.sex==20?'女':contactInfo.sex==10?'男':''}}</span>
                                <a-radio-group v-else name="radioGroup"  v-model="contactInfo.sex" >
                                    <a-radio value="10">男</a-radio>
                                    <a-radio value="20">女</a-radio>
                                </a-radio-group>
                            </a-form-item>
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='联系地址'>
                                <span v-if="!editStatus">{{contactInfo.detail}}</span>
                                <a-input v-else v-model="contactInfo.detail" />
                            </a-form-item>
                        </a-col>
                        <a-col :xl='12' :md="24"  :xs="24">
                            <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='备注'>
                                <p v-if="!editStatus">{{contactInfo.desc}}</p>
                                <a-textarea v-else :rows="6" v-model="contactInfo.desc" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </div>
        </div>
        <br>
        <div class="label-info">
            <div class="info-header">
                <span>用户信息</span>
                <a-button class="fr" type='primary' @click="addTag" style="width: 70px">打标签</a-button>
            </div>
            <div class="info-content">
                <!--<a-tag v-for="(item,index) in contactLabel" :closable="true" :key="item.id"  @close="closeTag($event,item,index)" v-model="item.showFlag" style="margin-bottom: 10px">-->
                <a-tag v-for="(item,index) in contactLabel" :key="item.id" style="margin-bottom: 10px">
                    {{item.label_name}}
                </a-tag>
            </div>
        </div>
        <br>
        <div class="order-info">
            <div class="info-header">
                <span>用户订单</span>
                <a-button class="fr" type='primary' @click="addOrder" style="width: 70px">新建</a-button>
            </div>
            <div class="info-content">
                <a-table :columns="columns" :dataSource="orderList" :pagination="false">
                    <template slot="action" slot-scope="text, record, index">
                        <div>
                            <a href="javascript:void(0);" @click="editOrder(record)" style="padding-right: 15px;">编辑</a>
                            <a href="javascript:void(0);" @click="del(record.id)" style="color: rgba(16,16,16,1)">删除</a>
                        </div>
                    </template>
                </a-table>
                <br>
                <a-pagination showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`" v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right"/>
                <br>
            </div>
        </div>

        <!--添加标签-->
        <a-modal
                title="选择标签"
                cancelText="取消"
                okText="确定"
                :visible="selectTagFlag"
                @ok="handleTagOk"
                @cancel="selectTagFlag=false"
                :confirmLoading="confirmLoading"
        >
            <div class="tag-modal">
                <a-checkable-tag v-for="(item,index) in allLabel"  :key="item.id" :checked="item.check" @change="(checked) => handleTagChange(item,index, checked)" style="margin-bottom: 5px">
                    {{item.title}}
                </a-checkable-tag>
            </div>
        </a-modal>
        <!--新建编辑订单modal-->
        <a-modal
                :title="orderTitle"
                cancelText="取消"
                okText="确定"
                :visible="orderFlag"
                @ok="handleOrderOk"
                @cancel="orderFlag=false"
        >
            <div class="order-modal">
                <a-form>
                    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='单号'>
                        <a-input v-model="orderDetail.order_id"/>
                    </a-form-item>

                    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='类型'>
                        <a-radio-group name="orderGroup"  v-model="orderDetail.order_type">
                            <a-radio value="10">购买</a-radio>
                            <a-radio value="20">赠送</a-radio>
                        </a-radio-group>
                    </a-form-item>

                    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='类别'>
                        <a-select v-model="orderDetail.goods_class_id" @change="handleClassChange">
                            <a-select-option v-for="(item,index) in goodsClass" :key="item.id" >
                                {{item.title}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>

                    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='名称'  >
                        <a-select v-model="orderDetail.goods_id">
                            <a-select-option v-for="(item,index) in goodsAll" :key="item.id">
                                {{item.title}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='数量'>
                        <a-input v-model="orderDetail.num" />
                    </a-form-item>
                    <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='备注'>
                        <a-textarea :rows="3" v-model="orderDetail.desc" />
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
	</div>
</template>

<script>
    import moment from 'moment';
	export default {
		name: "newMsg",
		data() {
			return {
                id:this.$route.query.id,
                contactInfo:{},
                contactLabel:[],
                allLabel:[],
                departmentInfo:{},
                adviser_all:[],
                editStatus:false,
                selectTagFlag:false,
                confirmLoading:false,
                page:1,
                page_size:10,
                total:0,
                orderList:[],
                columns:[
                    {
                        title: '单号',
                        align:'center',
                        dataIndex: 'order_id'
                    },
                    {
                        title: '名称',
                        align:'center',
                        dataIndex: 'title'
                    },
                    {
                        title: '类别',
                        align:'center',
                        dataIndex: 'order_type',
                        customRender:function (text, record, index) {
                            return text==10?'购买':'赠送'
                        }
                    },
                    {
                        title: '货号',
                        align:'center',
                        dataIndex: 'item_number'
                    },
                    {
                        title: '价格(元)',
                        align:'center',
                        dataIndex: 'price'
                    },
                    {
                        title: '数量',
                        align:'center',
                        dataIndex: 'num'
                    },
                    {
                        title: '时间',
                        align:'center',
                        dataIndex: 'created'
                    },
                    {
                        title: '备注',
                        align:'center',
                        dataIndex: 'desc'
                    },
                    {
                        title: '操作',
                        dataIndex: 'action',
                        align:'center',
                        scopedSlots: {
                            customRender: 'action'
                        }
                    }

                ],
                orderTitle:'新增订单',
                orderFlag:false,
                orderDetail:{},
                goodsClass:[],
                goodsAll:[]
			}
		},
		methods: {
            moment,
			back() {
				this.$router.back(-1)
			},
            getOrderList() {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/customer/order-list',
                    params:{id:this.id,p:this.page,n:this.page_size}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.orderList = udata.data.list
                        this.total = parseInt(udata.data.count)
                    }
                });
            },
            getDeatials() {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/customer/friend-details',
                    params:{id:this.id}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.contactInfo = udata.data.info
                        this.contactLabel = udata.data.label_own
                        this.allLabel = udata.data.label_all
                        this.departmentInfo = udata.data.department_own
                        this.adviser_all = udata.data.adviser_all
                        if(udata.data.adviser_own=='') {
                            this.contactInfo.adviser_id=  ''
                            this.contactInfo.adviser_name=  ''
                        } else {
                            this.contactInfo.adviser_id=  udata.data.adviser_own.id
                            this.contactInfo.adviser_name=  udata.data.adviser_own.user_name
                        }
                        this.contactLabel.forEach(el=>{
                            el.showFlag = true
                        })
                        if(this.contactInfo.birth=='0000-00-00') {
                            let date1 = new Date()
                            this.contactInfo.birth = date1.getFullYear() + '-' + (parseInt(date1.getMonth()) + 1) +'-' + date1.getDate()
                            this.contactInfo.birthTime = ''
                        } else {
                            this.contactInfo.birthTime = this.contactInfo.birth
                        }
                    }
                });
            },
            onChangeBirth(date, dateString) {
                this.contactInfo.birth = dateString;
            },
            edit_save() {
			    if(this.editStatus) {
//			        点击保存按钮
                    this.$axios({
                        method: 'POST',
                        url: '/index.php?r=uc/customer/friend-edit',
                        data:Object.assign(this.contactInfo)
                    }).then(res=> {
                        let udata = res.data
                        if (udata.status == 1) {
                            this.$message.success("修改成功")
                            this.editStatus = !this.editStatus
                            this.getDeatials()
                        }
                    });
                } else {
//			        点击编辑按钮
                    this.editStatus = !this.editStatus
                }
            },
            closeTag(e,item,index) {
                let _this =this;
                e.preventDefault()
                let msg = {
                    cmd:2040,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.contactInfo.assistant_username,
                    cmdData:{
                        username:this.contactInfo.username,
                        labels:[item.label_name]
                    }
                }
                this.$ws.sendMsgFun(msg)
                this.$ws.cmd2040 = function () {
                    item.showFlag = false
                    _this.$set(_this.contactLabel,index,item)
                    _this.$message.success('删除成功')
                }
            },
            addTag() {
                this.allLabel.forEach(el=>{
                    this.contactLabel.forEach(item=>{
                        if(el.id==item.label_id) {
                            el.check = true
                        }
                    })
                })
                this.selectTagFlag = true
            },
            handleTagChange(item,index,checked) {
                item.check = checked
                this.$set(this.allLabel,index,item)
            },
            handleTagOk() {
                let _this =this
//                let delTag = []
//                let addTag = []
                let selectTag = []
                this.allLabel.forEach(el=>{
                    if(el.check) {
                        selectTag.push(el.id+'_'+el.title)
                    }
                })
//                this.contactLabel.forEach(el=>{
//                    let flag = false;
//                    selectTag.forEach(item=>{
//                        if(el.label_name== item.title) {
//                            flag= true
//                        }
//                    })
//                    !flag&&delTag.push(el.label_name)
//                })
//                selectTag.forEach(item=>{
//                    let flag = false;
//                    this.contactLabel.forEach(el=>{
//                        if(el.label_name== item.title) {
//                            flag= true
//                        }
//                    })
//                    !flag&&addTag.push(item.title)
//                })
                let msg_add = {
                    cmd:2040,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:this.contactInfo.assistant_username,
                    cmdData:{
                        username:this.contactInfo.username,
                        labels:selectTag
                    },
                    priority:0
                }
//                let msg_del = {
//                    cmd:2040,
//                    fromClientId:this.$store.state.user.user.user_id,
//                    toClientId:this.contactInfo.assistant_username,
//                    cmdData:{
//                        username:this.contactInfo.username,
//                        labels:delTag
//                    },
//                    priority:0
//                }
//                addTag.length>0&&this.$ws.sendMsgFun(msg_add)
                this.$ws.sendMsgFun(msg_add)
                this.selectTagFlag=false
                this.$message.success('设置标签成功')
                this.$ws.cmd2040 = function (msg) {
                    _this.getDeatials()
                }
            },
            onChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.getCustomer()
            },
            onShowSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.getCustomer()
            },
            addOrder(item) {
                this.orderTitle = '新增订单'
                this.orderFlag  =true
                this.orderDetail = {
                    id:'',
                    order_time:'',
                    desc:''
                }
                this.getGoodsClass()
            },
            editOrder(item) {
                this.orderTitle = '编辑订单'
                this.orderFlag  =true
                this.orderDetail = item
                this.getGoodsClass()
                this.getGoodsAll(item.goods_class_id)
            },
            getGoodsClass() {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/customer/goods-class'
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.goodsClass = udata.data
                    }
                });
            },
            handleClassChange(value) {
                this.getGoodsAll(value)
            },
            getGoodsAll(classId) {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/customer/class-goods-all',
                    params:{classId:classId}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.goodsAll = udata.data
                        let flag =false
                        if(this.goodsAll.length==0) {
                            this.orderDetail.goods_id = ''
                            this.$message.warning('当前类别暂无商品，请先添加商品')
                            return
                        }
                        this.goodsAll.forEach(el=>{
                            if(el.id == this.orderDetail.goods_id) {
                                flag = true
                            }
                        })
                        !flag&&(this.orderDetail.goods_id = this.goodsAll[0].id)
                    }
                });
            },
            handleOrderOk() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/order-add',
                    data:Object.assign(this.orderDetail,{friends_id:this.contactInfo.id})
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success(`${this.orderTitle}成功`)
                        this.orderFlag = false
                        this.getOrderList()
                    }
                });
            },
            handAdviserChange(value) {
                this.contactInfo.adviser_id = value
            },
            del(id) {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/order-del',
                    data:{id:id}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success("删除成功")
                        this.getOrderList()
                    }
                });
            }
		},
		beforeCreate() {},
		mounted() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		updated() {
			this.$store.dispatch('setting/getBreadcrumb', this.$route)
		},
		created() {
            this.getDeatials()
            this.getOrderList()
		}
	}
</script>
