<style lang="less" scoped>
    .customer-list {
        background: #ffffff;
        height: calc(~"100vh - 90px");
        overflow-y: auto;
        .header {
            padding: 20px;
        }
        .content {
            padding: 0 20px;
        }

    }
</style>
<style>
    .customer-list .ant-table-thead > tr > th,.customer-list .ant-table-tbody > tr > td {
        padding: 10px;
    }
</style>
<template>
    <div class="customer-list">
        <div class="header">
            <a-form @submit="handleSubmit" layout="inline" :form="form" style="padding: 10px;background: #fff">
                <a-row>
                    <a-col :span="8">
                        <a-form-item>
                            <span>搜索用户：</span>
                            <a-input v-model="queryParam.key" placeholder='请输入微信昵称、用户姓名' style="width: 300px;" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item>
                            <span>选择标签：</span>
                            <a-select mode="multiple"  v-model="queryParam.label" @change="handleLabelChange"  style="width: 300px;"  placeholder='请选择标签'>
                                <a-select-option v-for="(item,index) in labelList" :key="item.id">
                                    {{item.title}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8" style="height: 39px;line-height: 39px;text-align: right">
                        <a-button type='primary' htmlType='submit'>查询</a-button>
                        <a-button @click="clear">重置</a-button>
                        <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
                            <span>{{expand?'收起':'展开'}}</span>
                            <a-icon :type="expand ? 'up' : 'down'" />
                        </a>
                    </a-col>
                </a-row>
                <a-row v-show="expand" style="padding-top: 5px">
                    <a-col :span="8">
                        <a-form-item>
                            <span>选择部门：</span>
                            <a-select @change="handleChange" v-model="queryParam.department_id" style="width: 300px;" >
                                <a-select-option v-for="(item,index) in departmentList" :key="item.id">
                                    {{item.name}}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-item>
                            <span>添加时间：</span>
                            <a-range-picker @change="onChangeDate" style="width: 300px" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="8" style="height: 39px;line-height: 39px;text-align: right">
                        <a-button type='primary' @click="exportContact">导出联系人</a-button>
                    </a-col>
                </a-row>
            </a-form>
        </div>
        <div class="content">
            <!--<a-table :columns="columns" :dataSource="customerList" :pagination="false" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :rowKey="(record) => record.id">-->
            <a-table :columns="columns" :dataSource="customerList" :pagination="false">
                <template slot="avatar_url" slot-scope="text, record, index">
                    <div>
                        <a-avatar :src="text" :size="48" style="border-radius: 5px"/>
                    </div>
                </template>
                <template slot="action" slot-scope="text, record, index">
                    <div>
                        <a href="javascript:void(0);" @click="sendMsg(record.id)" style="padding-right: 15px;">发消息</a>
                        <a href="javascript:void(0);" @click="getDetail(record.id)" style="padding-right: 15px;">详细信息</a>
                        <a href="javascript:void(0);" @click="upInfo(record)">更新信息</a>
                    </div>
                </template>
            </a-table>
            <br>
            <a-pagination showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right"/>
            <br>
        </div>
    </div>
</template>
<script>
    import moment from 'moment';
    export default {
        name: ""
        ,data(){
            return{
                form: this.$form.createForm(this),
                queryParam:{
                    key:'',
                    label:[],
                    department_id:'',
                    startTime:'',
                    endTime:''
                },
                departmentList:[],
                labelList:[],
                expand:false,   //搜索状态，展开还是收起
                customerList:[],
                columns:[
                    {
                        title: '头像',
                        dataIndex: 'avatar_url',
                        align:'center',
                        scopedSlots: {
                            customRender: 'avatar_url'
                        }
                    },
                    {
                        title: '昵称',
                        align:'center',
                        dataIndex: 'nickname'
                    },
                    {
                        title: '所属机器人昵称',
                        align:'center',
                        dataIndex: 'assistant_name'
                    },
                    {
                        title: '姓名',
                        align:'center',
                        dataIndex: 'real_name'
                    },
                    {
                        title: '电话',
                        align:'center',
                        dataIndex: 'tel'
                    },
                    {
                        title: '生日',
                        align:'center',
                        dataIndex: 'birth',
                        customRender:function (text, record, index) {
                            if(text=='0000-00-00') {
                                return ''
                            }else {
                                return text
                            }
                        }
                    },
//                    {
//                        title: '加好友日期',
//                        align:'center',
//                        dataIndex: 'agree_on'
//                    },
                    {
                        title: '操作',
                        dataIndex: 'action',
                        align:'center',
                        scopedSlots: {
                            customRender: 'action'
                        }
                    }
                ],
                page_size:10,
                page:1,
                total:0,
//                selectedRowKeys:[]
            }
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        methods: {
            moment,
            toggle() {
                this.expand = !this.expand
            },
            clear() {
                this.queryParam = {
                    key:'',
                    label:[],
                    department_id:this.departmentList[0].id,
                    startTime:'',
                    endTime:''
                }
                this.getCustomer()
            },
            exportContact() {
                location.href = '/index.php?r=uc/customer/export-friends&key=' + this.queryParam.key +  '&label='+  this.queryParam.label + '&department_id='+ this.queryParam.department_id  + '&startTime='+ this.queryParam.startTime  + '&endTime='+ this.queryParam.endTime
            },
            handleLabelChange(value) {
                this.queryParam.label = value
            },
            handleChange(value) {
                this.queryParam.department_id = value
            },
            onChangeDate(date,dateStrings) {
                this.queryParam.startTime = dateStrings[0];
                this.queryParam.endTime = dateStrings[1];
            },
//            onSelectChange(selectedRowKeys) {
//                this.selectedRowKeys = selectedRowKeys
//            },
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
            handleSubmit() {
                this.page = 1
                this.page_size = 10
                this.getCustomer()
            },
            getAllCustonerLabel() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/material/customer-label',
                    data:{
                        department_id:this.$store.state.user.user.department.id,
                        company:1
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.labelList = udata.data
                    }
                });
            },
            getDepartment() {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/customer/get-department',
                    params:{
                        department_id:this.$store.state.user.user.department.id,
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.departmentList = udata.data
                        this.queryParam.department_id = udata.data[0].id
                        this.getCustomer()
                    }
                });
            },
            getCustomer() {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/customer/list',
                    params:Object.assign(this.queryParam,{p:this.page,n:this.page_size})
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.customerList = udata.data.list
                        this.total = parseInt(udata.data.count)
                    }
                });
            },
            getDetail(id) {
                this.$router.push({path:'/home/customerDetails',query:{'id':id}});
            },
            sendMsg(id) {
                this.$router.push({path:'/customerChat/liveChat',query:{'id':id}});
            },
            upInfo(item) {
                let data = {
                    cmd:2036,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:item.robot_username,
                    cmdData:{
                        username:item.friend_user_name
                    }
                }
                this.$ws.sendMsgFun(data)
                this.$message.success('已更新，需要刷新页面获取最新信息')
            }
        }
        ,created(){
            this.getAllCustonerLabel()
            this.getDepartment()
//            this.getCustomer()
        }
    }
</script>
