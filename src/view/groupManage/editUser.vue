<style lang="less" scoped>
    .user-manage {
        background: #ffffff;
        height: calc(~"100vh - 90px");
        overflow-y: auto;
        .header {
            padding: 0 20px;
            height: 60px;
            line-height: 60px;
            border-bottom: 2px solid #f0f2f5;
        }
        .content {
            padding: 20px;
        }

    }
</style>

<template>
    <div class="user-manage">
        <div class="header">
            {{title}}
        </div>
        <div class="content">
            <a-form @submit="handleSubmit" :form="form">
                <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='真实姓名'>
                    <a-input v-model="userInfo.real_name" placeholder='请输入真实姓名' style="width: 80%;"/>
                </a-form-item>
                <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='用户名'>
                    <a-input v-model="userInfo.user_name" placeholder='请输入用户名' style="width: 80%;"/>
                </a-form-item>
                <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='密码'>
                    <a-input v-model="userInfo.pass_word" placeholder='请输入密码' style="width: 80%;"/>
                </a-form-item>

                <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='所属部门'>
                    <a-select  v-model="userInfo.department_id" placeholder='下拉选择所属部门' style="width: 80%;">
                        <a-select-option v-for="(item,index) in departmentList" :key="item.id">
                            {{item.name}}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='角色'>
                    <a-select v-model="userInfo.role_id" placeholder='下拉选择角色' style="width: 80%;">
                        <a-select-option v-for="(item,index) in roleList" :key="item.id">
                            {{item.name}}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='电话'>
                    <a-input v-model="userInfo.tel" placeholder='请输入电话' style="width: 80%;"/>
                </a-form-item>

                <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label=' ' :colon="false">
                    <div style="width: 80%;text-align: right">
                        <a-button @click="back" style="margin-right: 10px">返回</a-button>
                        <a-button type='primary' htmlType='submit' style="margin-left: 10px">保存</a-button>
                    </div>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script>
    var storage = require('../../common/store')
    export default {
        name: ""
        ,data(){
            return{
                form: this.$form.createForm(this),
                id:this.$route.query.id,
                title:'修改用户',
                userInfo:{

                },
                departmentList:[],
                roleList:[],
                role:{}
            }
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        methods:{
            back() {
                this.$router.push({path: '/groupManage/userManage'});
//                this.$router.back(-1)
            },
            getDepartment() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/permission-dist-department',
                    data:{
                        department_id:this.$store.state.user.user.department.id,
                        type:'2'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.departmentList = udata.data.departmentList
                    }
                });
            },
            getRole() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/role-list',
                    data:{
                        id:this.userInfo.id
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.roleList = udata.data.role_list
                        if(!!this.id) {
                            this.role = udata.data.role
                            let flag = false
                            this.roleList.forEach(el=>{
                                if(el.id == this.role.id) {
                                    flag = true
                                }
                            })
                            if(!flag) {
                                this.roleList.push(this.role)
                            }
                        }
                    }
                });
            },
            handleSubmit() {
                let url = ''
                let title = ''
                if(!!this.id) {
//                    修改
                    url = '/index.php?r=uc/organization/user-update'
                    title='修改用户成功'
                } else {
//                    新增
                    url = '/index.php?r=uc/organization/user-add'
                    title='新增用户成功'
                }
                this.$axios({
                    method: 'POST',
                    url: url,
                    data:this.userInfo
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success(title)
                        this.back()
                    }
                });
            },
        },
        created(){
            if(!!this.id) {
                this.title = '修改用户'
                this.userInfo = storage.store.get('editUser')
            } else {
                this.title = '添加用户'
            }
            this.getDepartment()
            this.getRole()
        },
        destroyed() {
            storage.store.remove('editUser');
        }
    }
</script>
