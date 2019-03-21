webpackJsonp([2],{335:function(e,t,a){a(997);var r=a(5)(a(828),a(943),"data-v-3fadc0a2",null);r.options.__file="D:\\baozWork\\fontend\\ECMS\\src\\view\\groupManage\\editUser.vue",r.esModule&&Object.keys(r.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] editUser.vue: functional components are not supported with templates, they should use render functions."),e.exports=r.exports},828:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(32);t.default={name:"",data:function(){return{form:this.$form.createForm(this),id:this.$route.query.id,title:"修改用户",userInfo:{},departmentList:[],roleList:[],role:{}}},mounted:function(){this.$store.dispatch("setting/getBreadcrumb",this.$route)},updated:function(){this.$store.dispatch("setting/getBreadcrumb",this.$route)},methods:{back:function(){this.$router.push({path:"/groupManage/userManage"})},getDepartment:function(){var e=this;this.$axios({method:"POST",url:"/index.php?r=uc/organization/permission-dist-department",data:{department_id:this.$store.state.user.user.department.id,type:"2"}}).then(function(t){var a=t.data;1==a.status&&(e.departmentList=a.data.departmentList)})},getRole:function(){var e=this;this.$axios({method:"POST",url:"/index.php?r=uc/organization/role-list",data:{id:this.userInfo.id}}).then(function(t){var a=t.data;if(1==a.status&&(e.roleList=a.data.role_list,e.id)){e.role=a.data.role;var r=!1;e.roleList.forEach(function(t){t.id==e.role.id&&(r=!0)}),r||e.roleList.push(e.role)}})},handleSubmit:function(){var e=this,t="",a="";this.id?(t="/index.php?r=uc/organization/user-update",a="修改用户成功"):(t="/index.php?r=uc/organization/user-add",a="新增用户成功"),this.$axios({method:"POST",url:t,data:this.userInfo}).then(function(t){1==t.data.status&&(e.$message.success(a),e.back())})}},created:function(){this.id?(this.title="修改用户",this.userInfo=r.store.get("editUser")):this.title="添加用户",this.getDepartment(),this.getRole()},destroyed:function(){r.store.remove("editUser")}}},863:function(e,t,a){t=e.exports=a(3)(!1),t.push([e.i,"\n.user-manage[data-v-3fadc0a2] {\n  background: #ffffff;\n  height: calc(100vh - 90px);\n  overflow-y: auto;\n}\n.user-manage .header[data-v-3fadc0a2] {\n  padding: 0 20px;\n  height: 60px;\n  line-height: 60px;\n  border-bottom: 2px solid #f0f2f5;\n}\n.user-manage .content[data-v-3fadc0a2] {\n  padding: 20px;\n}\n",""])},943:function(e,t,a){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"user-manage"},[a("div",{staticClass:"header"},[e._v("\n        "+e._s(e.title)+"\n    ")]),e._v(" "),a("div",{staticClass:"content"},[a("a-form",{attrs:{form:e.form},on:{submit:e.handleSubmit}},[a("a-form-item",{attrs:{labelCol:{span:5},wrapperCol:{span:18},label:"真实姓名"}},[a("a-input",{staticStyle:{width:"80%"},attrs:{placeholder:"请输入真实姓名"},model:{value:e.userInfo.real_name,callback:function(t){e.$set(e.userInfo,"real_name",t)},expression:"userInfo.real_name"}})],1),e._v(" "),a("a-form-item",{attrs:{labelCol:{span:5},wrapperCol:{span:18},label:"用户名"}},[a("a-input",{staticStyle:{width:"80%"},attrs:{placeholder:"请输入用户名"},model:{value:e.userInfo.user_name,callback:function(t){e.$set(e.userInfo,"user_name",t)},expression:"userInfo.user_name"}})],1),e._v(" "),a("a-form-item",{attrs:{labelCol:{span:5},wrapperCol:{span:18},label:"密码"}},[a("a-input",{staticStyle:{width:"80%"},attrs:{placeholder:"请输入密码"},model:{value:e.userInfo.pass_word,callback:function(t){e.$set(e.userInfo,"pass_word",t)},expression:"userInfo.pass_word"}})],1),e._v(" "),a("a-form-item",{attrs:{labelCol:{span:5},wrapperCol:{span:18},label:"所属部门"}},[a("a-select",{staticStyle:{width:"80%"},attrs:{placeholder:"下拉选择所属部门"},model:{value:e.userInfo.department_id,callback:function(t){e.$set(e.userInfo,"department_id",t)},expression:"userInfo.department_id"}},e._l(e.departmentList,function(t,r){return a("a-select-option",{key:t.id},[e._v("\n                        "+e._s(t.name)+"\n                    ")])}),1)],1),e._v(" "),a("a-form-item",{attrs:{labelCol:{span:5},wrapperCol:{span:18},label:"角色"}},[a("a-select",{staticStyle:{width:"80%"},attrs:{placeholder:"下拉选择角色"},model:{value:e.userInfo.role_id,callback:function(t){e.$set(e.userInfo,"role_id",t)},expression:"userInfo.role_id"}},e._l(e.roleList,function(t,r){return a("a-select-option",{key:t.id},[e._v("\n                        "+e._s(t.name)+"\n                    ")])}),1)],1),e._v(" "),a("a-form-item",{attrs:{labelCol:{span:5},wrapperCol:{span:18},label:"电话"}},[a("a-input",{staticStyle:{width:"80%"},attrs:{placeholder:"请输入电话"},model:{value:e.userInfo.tel,callback:function(t){e.$set(e.userInfo,"tel",t)},expression:"userInfo.tel"}})],1),e._v(" "),a("a-form-item",{attrs:{labelCol:{span:5},wrapperCol:{span:18},label:" ",colon:!1}},[a("div",{staticStyle:{width:"80%","text-align":"right"}},[a("a-button",{staticStyle:{"margin-right":"10px"},on:{click:e.back}},[e._v("返回")]),e._v(" "),a("a-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",htmlType:"submit"}},[e._v("保存")])],1)])],1)],1)])},staticRenderFns:[]},e.exports.render._withStripped=!0},997:function(e,t,a){var r=a(863);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a(4)("467f2574",r,!1)}});