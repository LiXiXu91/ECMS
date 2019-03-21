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
                <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 18 }" label='所属部门' v-if="!!type">
                    <span style="margin-left: 20px">{{departmentInfo.name}}</span>
                </a-form-item>
                <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 18 }" label='部门机器人' v-if="!!type">
                    <span v-for="item in departmentInfo.assistant" style="margin-right: 5px;margin-left: 20px">
                        {{item.nickname}}
                    </span>
                    <!--<a-select mode="multiple"  v-model="selectRobot" @change="handleLabelChange"  style="width: 300px;"  placeholder='请选择机器人'>-->
                        <!--<a-select-option v-for="(item,index) in robotList" :key="item.id">-->
                            <!--{{item.nickname}}-->
                        <!--</a-select-option>-->
                    <!--</a-select>-->
                </a-form-item>
                <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 18 }" label='部门参数码' v-if="!!type">
                    <div>
                        <a-tooltip placement="right">
                            <template slot='title'>
                                <img :src="departmentInfo.qrcode" alt="" style="width: 350px;height: 350px">
                            </template>
                            <img :src="departmentInfo.qrcode" alt="" style="width: 200px;height: 200px">
                        </a-tooltip>
                    </div>
                    <div style="background: #f0f2f5;padding: 20px;margin-top: 20px;color: rgb(0, 121, 254);font-size: 12px;line-height: 1.8;width: 80%">
                        功能：用于实现所属部门下新增机器人</br>
                        操作：1、打开手机端“绑定公司”APP</br>
                        &emsp;&emsp;&emsp;2、点击扫一扫，进入部门详情页，及机器人相关操作</br>
                        &emsp;&emsp;&emsp;3、确认部门信息后，点击授权绑定即可（已绑终端可选择更改授权，或者取消）
                    </div>

                </a-form-item>
                <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='部门名称' v-if="!type">
                    <a-input v-model="departmentInfo.name" placeholder='请输入部门名称' style="width: 80%;"/>
                </a-form-item>
                <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='上级部门' v-if="!type">
                    <a-select  v-model="departmentInfo.parent_id" placeholder='下拉选择上级部门' style="width: 300px;" :disabled="departmentInfo.parent_id==0">
                        <a-select-option v-for="(item,index) in departmentList" :key="item.id">
                            {{item.name}}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }" label='负责人' v-show="!!id" v-if="!type">
                    <a-select v-model="departmentInfo.leader_id" placeholder='下拉选择负责人' style="width: 300px;">
                        <a-select-option v-for="(item,index) in leaderList" :key="item.id">
                            {{item.real_name}}
                        </a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item :labelCol="{ span: 3 }" :wrapperCol="{ span: 18 }" label=' ' :colon="false">
                    <div style="width: 80%;text-align: right">
                        <a-button @click="back" style="margin-right: 10px">返回</a-button>
                        <a-button  v-if="!type" type='primary' htmlType='submit' style="margin-left: 10px">保存</a-button>
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
                type:this.$route.query.type,
                title:'修改用户',
                departmentInfo:{},
                departmentList:[],
                leaderList:[],
                robotList:[],
                selectRobot:[]
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
                this.$router.push({path: '/groupManage/departmentManage'});
//                this.$router.back(-1)
            },
            getDepartment() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/permission-dist-department',
                    data:{
                        department_id:!!this.id?this.departmentInfo.id:this.$store.state.user.user.department.id,
                        type: !!this.id?'1':'2'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.departmentList = udata.data.departmentList
                    }
                });
            },
            getLeader() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/user',
                    data:{
                        department_id:this.departmentInfo.id,
                        type:'1'
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.leaderList = udata.data.userList
                    }
                });
            },
            getRobot() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/assistant-list',
                    data:{
                        department_id:this.departmentInfo.id
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.robotList = udata.data
                    }
                });
            },
            getQrcode() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/department-details',
                    data:{
                        department_id:storage.store.get('editDepartment').id
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.departmentInfo = udata.data
                    }
                });
            },
            handleSubmit() {
                let url = ''
                let title = ''
                let data = {}
                if(!!this.type) {
//                    url = '/index.php?r=/uc/organization/set-department-ass'
//                    title='设置机器人成功'
//                    data= {
//                        department_id:this.departmentInfo.id,
//                        robot:this.selectRobot
//                    }
                    this.back()
                } else {
                    if(!!this.id) {
//                    修改
                        url = '/index.php?r=uc/organization/department-update'
                        title='修改部门成功'
                    } else {
//                    新增
                        url = '/index.php?r=uc/organization/department-add'
                        title='新增部门成功'
                    }
                    this.leaderList.forEach(el=>{
                        if(el.id==this.departmentInfo.leader_id) {
                            this.departmentInfo.leader = el.real_name
                        }
                    })
                    data = this.departmentInfo
                    this.$axios({
                        method: 'POST',
                        url: url,
                        data:data
                    }).then(res=> {
                        let udata = res.data
                        if (udata.status == 1) {
                            this.$message.success(title)
                            this.back()
                        }
                    });
                }


            },
            handleLabelChange(value){
                this.selectRobot = value
            }
        },
        created(){
            if(!!this.type) {
                this.title = '设置机器人'
//                this.departmentInfo = storage.store.get('editDepartment')
//                this.departmentInfo.assistant.forEach(el=>{
//                    this.selectRobot.push(el.id)
//                })
//                this.getRobot()
                this.getQrcode()
            } else {
                if(!!this.id) {
                    this.title = '修改部门'
                    this.departmentInfo = storage.store.get('editDepartment')
                    this.departmentInfo.leader_id = this.departmentInfo.leader_id==0?'':this.departmentInfo.leader_id
                } else {
                    this.title = '添加部门'
                }
                this.getDepartment()
                this.getLeader()
            }
        },
        destroyed() {
            storage.store.remove('editDepartment');
        }
    }
</script>
