
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


	.newMsg {
        position: relative;
        margin: 50px 20px 50px 20px;
        height: calc(~"100vh - 150px");
        background: #ffffff;
	}


</style>
<template>
	<div class="newMsg">
		<a-button type="default" icon="left" @click="back" style="position: absolute;top: -50px;">返回</a-button>
        <div style="padding: 25px;overflow-y: auto;height: 100%">
            <a-table :columns="columns" :dataSource="newMessageList">
                <template slot="nickname" slot-scope="text, record, index">
                    <div style="min-width: 200px;max-width: 300px">
                        <a-avatar :src="record.avatar_url" :size="54" style="border-radius: 10px"/>
                        <span>{{text}}</span>
                    </div>
                </template>
                <template slot="content_text" slot-scope="text, record, index">
                    <div>
                        <span v-if="text!=''">{{text}}</span>
                        <div v-else>
                            <img v-for="item in record.album" :src="item.src" style="max-width: 200px;max-height: 200px">
                        </div>
                    </div>
                </template>
                <template slot="action" slot-scope="text, record, index">
                    <div style="width: 100px">
                        <a href="javascript:void(0);" @click="com_showModal(record)" style="padding-right: 15px;" v-if="record.type==2">回复</a>
                        <a href="javascript:void(0);" @click="com_detail(record.ass_id)">详情</a>
                    </div>
                </template>
            </a-table>

        </div>

		<a-modal title="回复评论" :footer="null" :visible="com_visible" @cancel="com_handleCancel">
			<p class="comment_con">
				<a href="javascript:void(0);">{{comment_con.nickname}}：</a>
				<span>{{comment_con.comment}}</span>
			</p>
			<a-form @submit="com_handleOk" :form="form">
				<a-form-item :wrapperCol="{span: 24}">
					<a-input type="textarea" :autosize="{ minRows: 4, maxRows: 6 }" :placeholder="'回复'+comment_con.nickname+'：'" v-decorator="[ 'com_textarea', {rules: [{ required: true, message: '不能为空' }]}]" />
				</a-form-item>
				<a-form-item :wrapperCol="{ span: 24 ,offset:17}" style="margin-bottom: 0;">
					<a-button @click="com_handleCancel">取消</a-button>
					<a-button type='primary' htmlType='submit' style="margin-left: 10px;">提交</a-button>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>

<script>
	export default {
		name: "newMsg",
		data() {
			return {
                columns:[
                    {
                        title: '用户',
                        dataIndex: 'nickname',
                        key: 'nickname',
                        scopedSlots: {
                            customRender: 'nickname'
                        }
                    },
                    {
                        title: '评论',
                        dataIndex: 'comment',
                        customRender:function (text, record, index) {
                            if(record.type==2) {
                                return text
                            }else {
                                return '点赞'
                            }
                        }
                    },
                    {
                        title: '朋友圈',
                        dataIndex: 'content_text',
                        scopedSlots: {
                            customRender: 'content_text'
                        }
                    },
                    {
                        title: '操作',
                        dataIndex: 'action',
                        scopedSlots: {
                            customRender: 'action'
                        }
                    }
                ],
                newMessageList: [],
				com_visible: false,
				form: this.$form.createForm(this),
				queryForm:{
					id:'',
					com_textarea:''
				},
				comment_con:{},
			}
		},
		methods: {
			back() {
				this.$router.back(-1)
			},
			com_showModal(item) {
				this.com_visible = true;
				this.comment_con = item
			},
			com_detail(id) {
				this.$router.push({
					path: '/customerChat/friendCircleDetail',
					query: {
						'id': id
					}
				});
			},
			com_handleOk(e) {
				e.preventDefault()
				this.form.validateFields((err, values) => {
					if(!err) {
                        let data = {
                            cmd:2050,
                            fromClientId:this.$store.state.user.user.user_id,
                            toClientId:this.comment_con.robot_username,
                            cmdData:{
                                snsId:this.comment_con.snsId,
                                type:2,
                                comment:values.com_textarea,
                                toComment:{
                                    timestamp:this.comment_con.timestamp,
                                    username:this.comment_con.username,
                                    nickname:this.comment_con.nickname,
                                    id:this.comment_con.wx_comment_id
                                }
                            },
                            priority:0
                        }
                        this.$ws.sendMsgFun(data)
                        this.$message.success('评论成功', 2);

						this.com_visible = false;
					}
				})
			},
			com_handleCancel() {
				this.com_visible = false;
			},
            getNewMsg(num) {
                this.$axios({
                    method: 'POST',
                    url: '/index.php?r=uc/communication/friend-new-msg',
                    data:{
                        num:num,
                        department_id:this.$store.state.user.user.department.id
                    }
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.newMessageList = udata.data.newMessageList
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
            this.getNewMsg(this.$route.query.num)
		}
	}
</script>
