<style lang="less" scoped>
    .department-manage {
        background: #ffffff;
        height: calc(~"100vh - 90px");
        overflow-y: auto;
        .header {
            padding: 0 20px;
            height: 60px;
            line-height: 60px;
            border-bottom: 2px solid #f0f2f5;
            .add-user {
                margin-top: 14px;
                float: right;
            }
        }
        .content {
            padding: 20px;
        }
    }
</style>

<template>
    <div class="department-manage">
        <div class="header">
            <a-input v-model="searchKey" placeholder='请输入负责人、部门、机器人名称查询' style="width: 300px;" @keyup.enter="searchList()">
                <a-icon v-show="searchKey" slot="suffix" type="close-circle" style="color: #000000" @click="emitEmpty" />
            </a-input>
            <a-button class="add-user" type='primary' @click="addDepartment">新增</a-button>
            <a-button class="add-user"  @click="delSelect" style="margin-right: 10px">删除</a-button>
        </div>
        <div class="content">
            <a-table :columns="columns" :dataSource="departmentList" :pagination="false" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :rowKey="(record) => record.id">
                <template slot="assistant" slot-scope="text, record, index">
                    <div style="position: relative;">
                        <div style="text-overflow: ellipsis;overflow:hidden; white-space:nowrap;max-width: 400px;display: inline-block;vertical-align: bottom">
                            <span v-for="item in text" style="margin-right: 5px">
                                [{{item.mobile_serial}}]{{item.nickname}}
                            </span>
                        </div>
                        <a v-if="text.length>0" style="position: absolute;right: -30px;top: 50%;transform: translateY(-50%)" href="javascript:void(0);" @click="showRobotModal(record)">详细</a>
                    </div>
                </template>
                <template slot="action" slot-scope="text, record, index">
                    <div>
                        <a href="javascript:void(0);" @click="setRobot(record)" style="padding-right: 15px;">新增机器人</a>
                        <a href="javascript:void(0);" @click="edit(record)" style="padding-right: 15px;">编辑</a>
                        <a href="javascript:void(0);" @click="del(record.id)">删除</a>
                    </div>
                </template>
            </a-table>
            <br>
            <a-pagination showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onChange" @showSizeChange="onShowSizeChange" style="text-align: right"/>
            <br>
        </div>
        <a-modal
                title="设备编号"
                :footer="null"
                :visible="robotModal"
                @cancel="robotModal=false"
                :bodyStyle="{
                    maxHeight:'500px',
                    overflowY:'auto'
                }"
        >
            <div class="">
                <a-form>
                    <a-form-item :colon="true" :labelCol="{span:4}" :wrapperCol="{span:20}" label="部门名称:">
                        <span>{{selectDepartment.name}}</span>
                    </a-form-item>
                    <a-form-item :colon="true" :labelCol="{span:4}" :wrapperCol="{span:20}" label="设备编号:">
                        <span v-for="item in selectDepartment.assistant" style="margin-right: 5px">
                            [{{item.mobile_serial}}]{{item.nickname}}
                        </span>
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>

    </div>
</template>
<script>
    var storage = require('../../common/store')
    export default {
        name: ""
        ,data(){
            return{
                searchKey:'',
                page:1,
                page_size:10,
                total:0,
                departmentList:[],
                columns:[

                    {
                        title: '编号',
                        align:'center',
                        dataIndex: 'id'
                    },
                    {
                        title: '部门名称',
                        align:'center',
                        dataIndex: 'name'
                    },
                    {
                        title: '上级部门',
                        align:'center',
                        dataIndex: 'parent_name'
                    },
                    {
                        title: '负责人',
                        align:'center',
                        dataIndex: 'leader'
                    },
                    {
                        title: '设备编号',
                        align:'center',
                        dataIndex: 'assistant',
                        width:500,
                        scopedSlots: {
                            customRender: 'assistant'
                        }
//                        customRender:function (text, record, index) {
//                            let text1 = ''
//                            text.forEach(el=>{
//                                text1 =  text1 + el.nickname + '、'
//                            })
//                            return text1
//                        }
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
                selectedRowKeys:[],
                robotModal:false,
                selectDepartment:{}
            }
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        methods:{
            searchList() {
                this.page = 1
                this.page_size = 10
                this.getDepartment()
            },
            emitEmpty() {
                this.page = 1
                this.page_size = 10
                this.searchKey = ''
                this.getDepartment()
            },
            onChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.getDepartment()
            },
            onShowSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.getDepartment()
            },
            getDepartment() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/department',
                    data:{
                        searchKey:this.searchKey,
                        p:this.page,
                        n:this.page_size
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.departmentList = udata.data.departmentList
                        this.total = parseInt(udata.data.departmentCount)
                    }
                });
            },
            setRobot(item) {
                storage.store.set('editDepartment', item);
                this.$router.push({path:'/groupManage/setRobot',query:{'type':'1'}});
            },
            addDepartment() {
                storage.store.remove('editDepartment');
                this.$router.push({path:'/groupManage/addDepartment'});
            },
            edit(item) {
                storage.store.set('editDepartment', item);
                this.$router.push({path:'/groupManage/editDepartment',query:{'id':item.id}});
            },
            del(id) {
                let _this =this
                this.$confirm({
                    title:'确定删除当前部门？',
                    content:'部门删除之后，角色会和被删除部门解绑,是否确定',
                    onOk:function () {
                        _this.$axios({
                            method: 'POST',
                            url: '/index.php?r=uc/organization/department-del',
                            data:{
                                id_arr:[id]
                            }
                        }).then(res=> {
                            let udata = res.data
                            if (udata.status == 1) {
                                _this.$message.success('删除成功')
                                _this.getDepartment()
                            }
                        });
                    }
                })
            },
            onSelectChange(selectedRowKeys) {
                this.selectedRowKeys = selectedRowKeys
            },
            delSelect() {
                if(this.selectedRowKeys.length==0) {
                    this.$message.warning('请选择需要删除的部门')
                    return
                }
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/department-del',
                    data:{
                        id_arr:this.selectedRowKeys
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success('删除成功')
                        this.getDepartment()
                    }
                });
            },
            showRobotModal(record) {
                this.selectDepartment = record
                this.robotModal = true
            }
        },
        created(){
            this.getDepartment()
        }
    }
</script>
