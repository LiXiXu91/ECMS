webpackJsonp([31],{1036:function(t,e,n){var i=n(902);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n(4)("965729f0",i,!1)},712:function(t,e,n){n(1036);var i=n(5)(n(829),n(970),"data-v-abdb197e",null);i.options.__file="D:\\baozWork\\fontend\\ECMS\\src\\view\\groupManage\\permissionManage.vue",i.esModule&&Object.keys(i.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),i.options.functional&&console.error("[vue-loader] permissionManage.vue: functional components are not supported with templates, they should use render functions."),t.exports=i.exports},829:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(32);e.default={name:"",data:function(){return{page:1,page_size:10,total:0,permissionList:[],columns:[{title:"角色",align:"center",dataIndex:"name"},{title:"描述",align:"center",dataIndex:"description"},{title:"权限",align:"center",dataIndex:"auth_list",customRender:function(t,e,n){var i="";return t.forEach(function(t){i+=t+"、"}),i}},{title:"操作",dataIndex:"action",align:"center",scopedSlots:{customRender:"action"}}]}},mounted:function(){this.$store.dispatch("setting/getBreadcrumb",this.$route)},updated:function(){this.$store.dispatch("setting/getBreadcrumb",this.$route)},methods:{onChange:function(t,e){this.page=t,this.page_size=e,this.getPermission()},onShowSizeChange:function(t,e){this.page=1,this.page_size=e,this.getPermission()},getPermission:function(){var t=this;this.$axios({method:"POST",url:"/index.php?r=uc/organization/permission",data:{department_id:this.$store.state.user.user.department.id,p:this.page,n:this.page_size}}).then(function(e){var n=e.data;1==n.status&&(t.permissionList=n.data.auth_item,t.total=parseInt(n.data.authCount))})},add:function(){i.store.remove("editPermission"),this.$router.push({path:"/groupManage/addPermission"})},edit:function(t){i.store.set("editPermission",t),this.$router.push({path:"/groupManage/editPermission",query:{id:t.id}})},assignPermission:function(t){this.$router.push({path:"/groupManage/assignPermission",query:{id:t}})},maintainUser:function(t){},del:function(t){var e=this;this.$confirm({title:"确定删除当前角色？",onOk:function(){e.$axios({method:"POST",url:"/index.php?r=uc/organization/permission-del",data:{id_arr:[t]}}).then(function(t){1==t.data.status&&(e.$message.success("删除成功"),e.getPermission())})}})}},created:function(){this.getPermission()}}},902:function(t,e,n){e=t.exports=n(3)(!1),e.push([t.i,"\n.permission-manage[data-v-abdb197e] {\n  background: #ffffff;\n  height: calc(100vh - 90px);\n  overflow-y: auto;\n}\n.permission-manage .header[data-v-abdb197e] {\n  padding: 0 20px;\n  height: 60px;\n  line-height: 60px;\n  border-bottom: 2px solid #f0f2f5;\n}\n.permission-manage .header .add-user[data-v-abdb197e] {\n  margin-top: 14px;\n  float: right;\n}\n.permission-manage .content[data-v-abdb197e] {\n  padding: 20px;\n}\n",""])},970:function(t,e,n){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"permission-manage"},[n("div",{staticClass:"header"},[n("a-button",{staticClass:"add-user",attrs:{type:"primary"},on:{click:t.add}},[t._v("新增")])],1),t._v(" "),n("div",{staticClass:"content"},[n("a-table",{attrs:{columns:t.columns,dataSource:t.permissionList,pagination:!1},scopedSlots:t._u([{key:"action",fn:function(e,i,a){return[n("div",[n("a",{staticStyle:{"padding-right":"15px"},attrs:{href:"javascript:void(0);"},on:{click:function(e){t.edit(i)}}},[t._v("编辑")]),t._v(" "),n("a",{staticStyle:{"padding-right":"15px"},attrs:{href:"javascript:void(0);"},on:{click:function(e){t.del(i.id)}}},[t._v("删除")]),t._v(" "),n("a",{staticStyle:{"padding-right":"15px"},attrs:{href:"javascript:void(0);"},on:{click:function(e){t.assignPermission(i.id)}}},[t._v("分配权限")])])]}}])}),t._v(" "),n("br"),t._v(" "),n("a-pagination",{staticStyle:{"text-align":"right"},attrs:{showQuickJumper:"",showSizeChanger:"",showTotal:function(t){return"总共"+t+"条"},pageSize:t.page_size,total:t.total,pageSizeOptions:["10","20","30","40","50"]},on:{change:t.onChange,showSizeChange:t.onShowSizeChange},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}}),t._v(" "),n("br")],1)])},staticRenderFns:[]},t.exports.render._withStripped=!0}});