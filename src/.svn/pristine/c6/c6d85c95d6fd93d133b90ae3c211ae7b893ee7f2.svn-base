import router, { dynamicRoutes } from '@/router/router'
import { recursionRouter, setDefaultRoute } from '@/common/util'
var storage = require('../../common/store')
export default {
    namespaced: true,
    state: {
        user:{},
        company:{},
        token:'',
        permissionList:null,
        menuBadge:[

        ],
        menuBadgeConst:[
            {
                name:'客户管理',
                children:['客户列表','新的朋友','收款记录']
            },
            {
                name:'客户沟通',
                children:['实时聊天','互动历史','客户朋友圈']
            },
            {
                name:'营销管理',
                children:['私聊推送','群聊推送','朋友圈推送','个人朋友圈']
            }
        ]
    },
    mutations: {
        setUser (state, user) {
            state.user = user
        },
        setCompany (state, company) {
            state.company = company
        },
        setToken (state, token) {
            storage.store.set('token', token);
            // state.token = token
        },
        setPermission(state, routes) {
            state.permissionList = routes
        },
        clearPermission(state) {
            state.permissionList = null
        },
        // 增加左边侧边栏徽标数
        addMenuBadge (state,newMenuBadge) {
            /*每次将需要设置的侧边栏菜单徽标数已以下对象形式传入{name:'',badge:1}*/
            let name = ''
            let flag = false
            let childrName=[]
            let array = JSON.parse(JSON.stringify(state.menuBadge));
            array.forEach(el=>{
                if(el.name==newMenuBadge.name) {
                    flag = true
                    el.badge += newMenuBadge.badge
                }
            })
            !flag&&array.push(newMenuBadge)
            state.menuBadgeConst.forEach(el=>{
                el.children.forEach(item=>{
                    if(item==newMenuBadge.name) {
                        name = el.name
                    }
                })
            })
            let flag1 = false;
            array.forEach(el=>{
                if(el.name==name) {
                    flag1 = true
                    el.badge += newMenuBadge.badge
                }
            })
            !flag1&&array.push({
                name:name,
                badge:newMenuBadge.badge
            })
            state.menuBadge = array
        },
        // 减少相应徽标数
        reduceMenuBadge(state,newMenuBadge) {
            /*每次将需要设置的侧边栏菜单徽标数已以下对象形式传入{name:'',badge:1}*/
            let name = ''
            let flag = false
            let childrName=[]
            let array = JSON.parse(JSON.stringify(state.menuBadge));
            array.forEach(el=>{
                if(el.name==newMenuBadge.name) {
                    flag = true
                    el.badge>0&&(el.badge -= newMenuBadge.badge)
                }
            })
            !flag&&array.push(newMenuBadge)
            state.menuBadgeConst.forEach(el=>{
                el.children.forEach(item=>{
                    if(item==newMenuBadge.name) {
                        name = el.name
                    }
                })
            })
            let flag1 = false;
            array.forEach(el=>{
                if(el.name==name) {
                    flag1 = true
                    el.badge>0&&(el.badge -= newMenuBadge.badge)
                }
            })
            !flag1&&array.push({
                name:name,
                badge:newMenuBadge.badge>0?newMenuBadge.badge:0
            })
            state.menuBadge = array
        },
        // 清除左边侧边栏相应徽标数,clearMenuBadge对应类型{name:''}
        clearMenuBadge (state,clearMenuBadge) {
            let name = ''
            state.menuBadgeConst.forEach(el=>{
                el.children.forEach(item=>{
                    if(item==clearMenuBadge.name) {
                        name = el.name
                    }
                })
            })
            let reduce = 0
            state.menuBadge.forEach(el=>{
                if(el.name == clearMenuBadge.name) {
                    reduce = el.badge
                    el.badge = 0
                }
            })
            state.menuBadge.forEach(el=>{
                if(el.name == name) {
                    el.badge -= reduce
                }
            })
        }
    },
    actions: {
        async fetchPermission({commit, state},axios) {
            let permissionList = await axios.get('/index.php?r=uc/user/list')
            if(permissionList.data.status==4004) {
                commit('setPermission', [])
                return 'false1'
            }
            /*  根据权限筛选出我们设置好的路由并加入到path=''的children */
            if(!permissionList.data.data||!permissionList.data.data.permission) {
                commit('setPermission', [])
                return 'false'
            }
            let routes = recursionRouter(permissionList.data.data.permission, dynamicRoutes)
            if(!state.user.nickname||!state.user.avatar) {
                commit('setUser',permissionList.data.data.user)
            }
            /*  初始路由 */
            let initialRoutes = router.options.routes

            /*  动态添加路由 */
            router.addRoutes(routes)

            /* 完整的路由表 */
            commit('setPermission', [...initialRoutes, ...routes])

            return routes
        }
    }
}
