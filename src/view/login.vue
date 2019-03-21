<style lang="less" scoped>
    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: auto;
        background: #f0f2f5 url('../../static/img_file/bg.jpg') no-repeat center;
        background-size: cover;
        .content {
            padding: 32px 0;
            flex: 1;
            @media (min-width: 768px){
                padding: 112px 0 24px;
            }
            .top {
                text-align: center;
                .header {
                    height: 100px;
                    /*line-height: 44px;*/
                    a {
                        text-decoration: none;
                    }
                    .logo {
                        height: 120px;
                        vertical-align: top;
                    }
                    .title {
                        font-size: 33px;
                        color: rgba(0,0,0,.85);
                        font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
                        font-weight: 600;
                        position: relative;
                        top: 2px;
                    }
                }
                .desc {
                    font-size: 14px;
                    color: rgba(0,0,0,.45);
                    margin-top: 23px;
                    margin-bottom: 40px;
                }
            }
            .login{
                width: 368px;
                margin: 0 auto;
                @media screen and (max-width: 576px) {
                    width: 95%;
                }
                @media screen and (max-width: 320px) {
                    .captcha-button{
                        font-size: 14px;
                    }
                }
                .icon {
                    font-size: 24px;
                    color: rgba(0, 0, 0, 0.2);
                    margin-left: 16px;
                    vertical-align: middle;
                    cursor: pointer;
                    transition: color 0.3s;

                    &:hover {
                        color: #1890ff;
                    }
                }
            }
        }
    }
            /*去掉input自动补全后的黄色样式*/
            input:-webkit-autofill, 
            input:-webkit-autofill:hover, 
            input:-webkit-autofill:focus, 
            input:-webkit-autofill:active , 
            textarea:-webkit-autofill, 
            select:-webkit-autofill {
            -webkit-transition-delay: 99999s;
            -webkit-transition: color 99999s ease-out, 
            background-color 99999s ease-out;
            }

</style>
<template>
    <div class="container">
        <div class="content">
            <div class="top">
                <div class="header">
                    <!--<img class="logo" src="../../static/img_file/logo.png" />-->
                    <img class="logo" :src="company.company_logo" />
                    <!--<span class="title">{{company.company_name}}</span>-->
                </div>
                <div class="desc">{{company.ecms_name}}</div>
            </div>
            <div class="login">
                <a-form @submit="onSubmit" :autoFormCreate="(form) => this.form = form">
                    <!--<a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">-->
                        <!--<a-tab-pane tab="账户密码登录" key="1">-->
                            <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
                            <a-form-item
                                    fieldDecoratorId="name"
                                    :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入账户名', whitespace: true}]}"
                            >
                                <a-input size="large" placeholder="请输入手机号" autocomplete="off" maxlength="11">
                                    <a-icon slot="prefix" type="user" />
                                </a-input>
                            </a-form-item>
                            <a-form-item
                                    fieldDecoratorId="password"
                                    :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码', whitespace: true}]}"
                            >
                                <a-input size="large" placeholder="请输入密码" type="password">
                                    <a-icon slot="prefix" type="lock" />
                                </a-input>
                            </a-form-item>
                        <!--</a-tab-pane>-->
                    <!--</a-tabs>-->
                    <!--<div>-->
                        <!--<a style="float: right">忘记密码</a>-->
                    <!--</div>-->
                    <a-form-item>
                        <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">登录</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>


<script>
    import GlobalFooter from '../layouts/GlobalFooter'
    var storage = require('../common/store')
    export default {
        name: 'Login',
        components: {GlobalFooter},
        data() {
            return {
                logging: false,
                error: ''
            }
        }
        ,computed: {
            systemName () {
                return this.$store.state.setting.systemName
            },
            linkList () {
                return this.$store.state.setting.footerLinks
            },
            copyright () {
                return this.$store.state.setting.copyright
            },
            company () {
                return this.$store.state.user.company
            }
        }
        , methods: {
            onSubmit (e) {
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.logging = true
                        this.$axios({
                            method: 'POST',
                            url: '/index.php?r=uc/user/login',
                            data: {
                                tel: this.form.getFieldValue('name'),
                                password: this.form.getFieldValue('password')
                            }
                        }).then(res=> {
                            this.logging = false
                            let udata = res.data
                            if (udata.status == 1) {
//                                this.$router.replace('/home')

                                this.$store.commit('user/setUser', udata.data)
                                location.reload()
                            } else {
                                this.error = udata.msg
                            }
                        }).catch(error=> {
                            console.log(error);
                        });
                    }
                })
            },
            getCompanyInfo() {
                this.$axios({
                    method: 'get',
                    url: '/index.php?r=uc/user/company-info'
                }).then(res=> {
                    let udata = res.data
                    if (udata.status == 1) {
                        this.$store.commit('user/setCompany', udata.data)
                    }
                })
            }
        }
        ,created() {
            this.getCompanyInfo()
//            if (!!storage.store.get('token')) {
//                this.$router.push('/home')
//            }
        }
    }
</script>

