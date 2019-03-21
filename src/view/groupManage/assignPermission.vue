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
<style>
    .user-manage .content .ant-checkbox-group-item {
        margin-bottom: 5px;
        width: 150px;
    }
</style>
<template>
    <div class="user-manage">
        <div class="header">
            分配权限
        </div>
        <div class="content">
            <div>
                <a-checkbox @change="onChangeAll" :checked="checkedAll" :indeterminate="allIndeterminate" style="margin-bottom: 30px">全选</a-checkbox>
                <div v-for="(item,index) in permissionList" :key="index" style="margin-bottom: 30px">
                    <a-checkbox
                            :indeterminate="item.indeterminate"
                            @change="onCheckAllChange($event,item,index)"
                            :checked="item.checked"
                            style="display: block;margin-bottom: 5px;font-weight: 700"
                    >
                        {{item.name}}：
                    </a-checkbox>
                    <a-checkbox-group :options="item.list" v-model="item.checkedList" @change="onChange(item,index)"/>
                </div>
            </div>
            <div style="text-align: center">
                <a-button @click="back" style="margin-right: 10px">返回</a-button>
                <a-button @click="handleSubmit" type='primary' style="margin-left: 10px">保存</a-button>
            </div>
        </div>
    </div>
</template>
<script>
    var storage = require('../../common/store')
    export default {
        name: ""
        ,data(){
            return{
                role_id:this.$route.query.id,
                title:'分配权限',
                permissionList:[],
                checkedAll:false,
                allIndeterminate:false
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
                let name_arr = []
                this.permissionList.forEach(el=>{
                    el.checkedList.forEach(item=>{
                        name_arr.push(item)
                    })
                })
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/permission-change',
                    data:{
                        role_id:this.role_id,
                        name_arr:name_arr
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$message.success('分配成功')
                        this.back()
                    }
                });
            },
            getPermission() {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/organization/permission-list',
                    data:{role_id:this.role_id}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.permissionList = this.dataTrans(udata.data.permissionList)
                        this.getAllChecked(true)
                    }
                });
            },
            dataTrans(list) {
                let arr = []
                list.forEach(el=>{
                    let flag = 0
                    el.checkedList = []
                    el.list.forEach(item=>{
                        if(item.auth==1) {
                            flag +=1
                            el.checkedList.push(item.name)
                        }
                        item.label = item.description
                        item.value = item.name
                    })
                    if(flag == el.list.length) {
                        el.checked = true
                    }else {
                        el.checked = false
                    }
                    if(!!flag && (flag < el.list.length)) {
                        el.indeterminate = true
                    } else {
                        el.indeterminate = false
                    }
                })
                arr = list
                return arr
            },
            onChange (item,index) {
                item.indeterminate = !!item.checkedList.length && (item.checkedList.length < item.list.length)
                item.checked = item.checkedList.length === item.list.length
                this.getAllChecked(false)
            },
            onCheckAllChange (e,item,index) {
                item.checked = !item.checked
                item.indeterminate = false
                item.checkedList =[]
                if(item.checked) {
                    item.list.forEach(el=>{
                        item.checkedList.push(el.name)
                    })
                } else {
                    item.checkedList =[]
                }
                this.getAllChecked(false)
            },
            onChangeAll(e) {
                this.checkedAll = e.target.checked
                this.allIndeterminate = false
                if(e.target.checked) {
//                    全选
                    this.permissionList.forEach(el=>{
                        el.checkedList = []
                        el.list.forEach(el1=>{
                            el.checkedList.push(el1.name)
                        })
                        el.checked = true
                    })
                } else {
//                    取消全选
                    this.permissionList.forEach(el=>{
                        el.indeterminate = false
                        el.checked = false
                        el.checkedList = []
                    })
                }
            },
            getAllChecked(init) {
                if(init) {
                    let flag = false
                    let flag1 = false
                    this.permissionList.forEach(el=>{
                        el.list.forEach(item=>{
                            if(item.auth==0) {
                                flag = true
                            }
                            if(item.auth==1) {
                                flag1 = true
                            }
                        })
                    })
                    if(flag&&flag1) {
                        this.checkedAll = false
                        this.allIndeterminate = true
                    } else if(flag&&!flag1) {
                        this.checkedAll = false
                        this.allIndeterminate = false
                    } else if(!flag&&flag1||!flag1&&flag) {
                        this.checkedAll = true
                        this.allIndeterminate = false
                    }
                }else {
                    let flag = 0
                    let flag1 = 0
                    let flag2 = 0
                    this.permissionList.forEach(el=>{
                        if(el.checkedList.length === el.list.length) {
                            flag += 1
                        } else if(el.checkedList.length== 0) {
                            flag1 += 1
                        } else {
                            flag2 += 1
                        }
                    })
                    if(flag == this.permissionList.length) {
                        this.checkedAll = true
                        this.allIndeterminate = false
                    } else if(flag1==this.permissionList.length) {
                        this.checkedAll = false
                        this.allIndeterminate = false
                    } else {
                        this.checkedAll = true
                        this.allIndeterminate = true
                    }

                }

            }
        },
        created(){
            this.getPermission()
        },
        destroyed() {

        }
    }
</script>
