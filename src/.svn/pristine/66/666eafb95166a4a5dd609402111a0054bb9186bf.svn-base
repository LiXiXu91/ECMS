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
                <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='角色名称' >
                    <a-input v-model="roleInfo.name" placeholder='请输入角色名称' style="width: 80%;"/>
                </a-form-item>
                <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='角色描述' >
                    <a-textarea  v-model="roleInfo.description" placeholder='角色描述' style="width: 80%;" :rows="4"></a-textarea>
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
                roleInfo:{},
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
                this.$router.push({path: '/groupManage/permissionManage'});
//                this.$router.back(-1)
            },
            handleSubmit() {
                let url = ''
                let title = ''
                let data = {}
                if(!!this.id) {
//                修改
                    url = '/index.php?r=uc/organization/permission-update'
                    title='修改角色成功'
                } else {
//                新增
                    url = '/index.php?r=uc/organization/permission-add'
                    title='新增角色成功'
                }
                this.$axios({
                    method: 'POST',
                    url: url,
                    data:this.roleInfo
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
                this.title = '修改角色'
                this.roleInfo = storage.store.get('editPermission')
            } else {
                this.title = '添加角色'
            }
        },
        destroyed() {
            storage.store.remove('editPermission');
        }
    }
</script>
