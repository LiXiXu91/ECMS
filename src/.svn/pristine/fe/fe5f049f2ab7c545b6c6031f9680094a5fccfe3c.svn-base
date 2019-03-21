<style lang="less" scoped>
    .permission-manage {
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
    <div class="permission-manage">
        <div class="header">
            <a-button class="add-user" type='primary' @click="add">新增</a-button>
        </div>
        <div class="content">
            <a-table :columns="columns" :dataSource="permissionList" :pagination="false">
                <template slot="action" slot-scope="text, record, index">
                    <div>
                        <a href="javascript:void(0);" @click="edit(record)" style="padding-right: 15px;">编辑</a>
                        <a href="javascript:void(0);" @click="del(record.id)" style="padding-right: 15px;">删除</a>
                        <a href="javascript:void(0);" @click="assignPermission(record.id)" style="padding-right: 15px;">分配权限</a>
                        <!--<a href="javascript:void(0);" @click="maintainUser(record)">维护成员</a>-->
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
    var storage = require('../../common/store')
    export default {
        name: ""
        ,data(){
            return{
                page:1,
                page_size:10,
                total:0,
                permissionList:[],
                columns:[

                    {
                        title: '角色',
                        align:'center',
                        dataIndex: 'name'
                    },
                    {
                        title: '描述',
                        align:'center',
                        dataIndex: 'description'
                    },
                    {
                        title: '权限',
                        align:'center',
                        dataIndex: 'auth_list',
                        customRender:function (text, record, index) {
                            let text1 = ''
                            text.forEach(el=>{
                                text1 += el + '、'
                            })
                            return text1
                        }
                    },
                    {
                        title: '操作',
                        dataIndex: 'action',
                        align:'center',
                        scopedSlots: {
                            customRender: 'action'
                        }
                    }
                ]
            }
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        methods:{
            onChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.getPermission()
            },
            onShowSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.getPermission()
            },
            getPermission() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/permission',
                    data:{
                        department_id:this.$store.state.user.user.department.id,
                        p:this.page,
                        n:this.page_size
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.permissionList = udata.data.auth_item
                        this.total = parseInt(udata.data.authCount)
                    }
                });
            },
            add() {
                storage.store.remove('editPermission');
                this.$router.push({path:'/groupManage/addPermission'});
            },
            edit(item) {
                storage.store.set('editPermission', item);
                this.$router.push({path:'/groupManage/editPermission',query:{'id':item.id}});
            },
            assignPermission(id) {
                this.$router.push({path:'/groupManage/assignPermission',query:{'id':id}});
            },
            maintainUser(item) {

            },
            del(id) {
                let _this =this
                this.$confirm({
                    title:'确定删除当前角色？',
                    onOk:function () {
                        _this.$axios({
                            method: 'POST',
                            url: '/index.php?r=uc/organization/permission-del',
                            data:{
                                id_arr:[id]
                            }
                        }).then(res=> {
                            let udata = res.data
                            if (udata.status == 1) {
                                _this.$message.success('删除成功')
                                _this.getPermission()
                            }
                        });
                    }
                })
            }
        },
        created(){
            this.getPermission()
        }
    }
</script>
