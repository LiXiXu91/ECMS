<style lang="less" scoped>
    .new_friend {
        height: calc(~"100vh - 90px");
        overflow: auto;
        background: #ffffff;
        padding: 25px;
    }
</style>
<style>
    .new_friend .ant-table-thead > tr > th,.new_friend .ant-table-tbody > tr > td {
        padding: 10px;
    }
</style>
<template>
    <div class="new_friend">
        <div class="tabs">
            <a-tabs :defaultActiveKey="selectTab" @change="tabChange">
                <a-tab-pane tab="新的朋友" key="1"></a-tab-pane>
                <!--<a-tab-pane tab="操作记录" key="2"></a-tab-pane>-->
            </a-tabs>
        </div>
        <div >
            <div v-if="selectTab==1" class="contact-info">
                <a-table :columns="columns_friend" :dataSource="newFriendList" :pagination="false">
                    <template slot="avatar_url" slot-scope="text, record, index">
                        <div>
                            <a-avatar :src="text" :size="48" style="border-radius: 5px"/>
                        </div>
                    </template>
                    <template slot="action" slot-scope="text, record, index">
                        <div>
                            <a href="javascript:void(0);" @click="agree(record)" style="padding-right: 20px;">同意</a>
                            <a href="javascript:void(0);" @click="ignore(record.id)">忽略</a>
                        </div>
                    </template>
                </a-table>
                <br>
                <a-pagination showQuickJumper showSizeChanger :showTotal="total => `总共${total}条`"	v-model="page" :pageSize="page_size" :total="total" :pageSizeOptions="['10', '20', '30', '40', '50']" @change="onFriendChange" @showSizeChange="onFriendSizeChange" style="text-align: right"/>
                <br>
            </div>
            <div v-if="selectTab==2" class="contact-info">
                这是操作记录页面
            </div>

        </div>

    </div>
</template>
<script>
    export default {
        name: ""
        ,data(){
            return{
                selectTab:'1',
                newFriendList:[],
                columns_friend:[
                    {
                        title: '编号',
                        align:'center',
                        dataIndex: 'id'
                    },
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
                        title: '所属机器人',
                        align:'center',
                        dataIndex: 'assistant_name'
                    },
                    {
                        title: '招呼消息',
                        align:'center',
                        dataIndex: 'hello_msg'
                    },
                    {
                        title: '性别',
                        align:'center',
                        dataIndex: 'sex',
                        customRender:function (text, record, index) {
                            return text==10?'男':text==10?'女':'未知'
                        }
                    },
                    {
                        title: '请求来源',
                        align:'center',
                        dataIndex: 'friend_from'
                    },
                    {
                        title: '请求时间',
                        align:'center',
                        dataIndex: 'created'
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
                page:1,
                page_size:10,
                total:0
            }
        },
        mounted () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        updated () {
            this.$store.dispatch('setting/getBreadcrumb',this.$route)
        },
        methods:{
            tabChange(key) {
                this.selectTab = key
                switch (this.selectTab) {
                    case '1':
                        this.getNewFriend()
                        break
                    case '2':
                        this.getActionHistory()
                        break
                }
            },
            onFriendChange(page,pageSize) {
                this.page = page
                this.page_size = pageSize
                this.getCustomer()
            },
            onFriendSizeChange(current, size) {
                this.page = 1
                this.page_size = size
                this.getNewFriend()
            },
            getNewFriend() {
                this.$axios({
                    method: 'GET',
                    url: '/index.php?r=uc/customer/new-friend',
                    params:{p:this.page,n:this.page_size,department_id:this.$store.state.user.user.department.id}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.newFriendList = udata.data.list
                        this.total = parseInt(udata.data.count)
                    }
                });
            },
            getActionHistory(){
                console.log('获取操作记录')
            },
            agree(item) {
                if(item.flag) {
                    this.$message.success('已发送添加指令，请等待或刷新页面')
                    return
                }
                item.flag =true
                let _this = this
                let data = {
                    cmd:2026,
                    fromClientId:this.$store.state.user.user.user_id,
                    toClientId:item.assistant_username,
                    cmdData:{
                        username:item.username,
                        ticket:item.ticket
                    },
                    priority:0
                }
                this.$ws.sendMsgFun(data)
                this.$message.success('同意好友请求已发送')
                this.$ws.cmd2026 = function () {
                    item.flag = false
//                给go发送指令之后收到回应之后
                    _this.$router.push({path:'/home/customerDetails',query:{'id':item.id}});
                }
            },
            ignore(id) {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/customer/agree',
                    data:{friend_id:id,type:20}
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.getNewFriend()
                    }
                });
            }
        },
        created(){
            this.getNewFriend()
        }
    }
</script>
