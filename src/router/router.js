import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import login from '@/view/login'


import RouteView from '@/layouts/RouteView'
import MenuView from '@/layouts/MenuView'
// 初始路由
export default new Router({
    routes: [
        {
            path: '/login',
            name: '登录页',
            component: login,
            invisible: true
        },
        {
            path: '/exception',
            name: '异常页',
            icon: 'warning',
            component: RouteView,
            invisible: true,
            children: [
                {
                    path: '/exception/404',
                    name: '404',
                    icon: 'none',
                    component: () => import('@/view/exception/404')
                },
                {
                    path: '/exception/403',
                    name: '403',
                    icon: 'none',
                    component: () => import('@/view/exception/403')
                },
                {
                    path: '/exception/500',
                    name: '500',
                    icon: 'none',
                    component: () => import('@/view/exception/500')
                }
            ]
        },
    ]
})
// 根据权限动态添加的路由
export const dynamicRoutes = [
    {
        path: '/',
        name: '首页',
        component: MenuView,
        redirect: '/login',
        icon: 'none',
        meta: {
            requiresAuth: true
        },
        invisible: true
        , children: [
            {
                path: '/home',
                name: '客户管理',
                redirect: '/home/customerList',
                component: RouteView,
                icon: 'user',
                children: [
                    {
                        path: '/home/customerList',
                        name: '客户列表',
                        icon: 'none',
                        component: () => import('@/view/customerManage/customerList'),
                    },
                    {
                        path: '/home/customerDetails',
                        name: '客户详情',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/customerManage/customerDetails'),
                    },
                    {
                        path: '/home/newFriend',
                        name: '新的朋友',
                        icon: 'none',
                        component: () => import('@/view/customerManage/newFriend'),
                    },
                    {
                        path: '/home/collectionRecord',
                        name: '收款记录',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/customerManage/collectionRecord'),
                    },
                ]
            },
            {
                path: '/customerChat',
                name: '客户沟通',
                redirect: '/customerChat/liveChat',
                component: RouteView,
                icon: 'wechat',
                children: [
                    {
                        path: '/customerChat/liveChat',
                        name: '实时聊天',
                        icon: 'none',
                        component: () => import('@/view/customerChat/liveChat'),
                    },
                    {
                        path: '/customerChat/interactiveHistory',
                        name: '互动历史',
                        icon: 'none',
                        invisible: true,
                        component: () => import('@/view/customerChat/interactiveHistory'),
                    },
                    {
                        path: '/customerChat/FriendsCircle',
                        name: '客户朋友圈',
                        icon: 'none',
                        component: () => import('@/view/customerChat/FriendsCircle'),
                    },
                    {
                        path:'/customerChat/newMsg',
                        name:'新消息',
                        invisible: true,
                        icon:'none',
                        component: () => import('@/view/customerChat/newMsg')
                    },
                    {
                        path:'/customerChat/friendCircleDetail',
                        name:'朋友圈详情',
                        invisible: true,
                        icon:'none',
                        component: () => import('@/view/customerChat/friendCircleDetail')
                    }
                ]
            },
            {
                path: '/pushMange',
                name: '营销管理',
                redirect: '/pushMange/privatePush',
                component: RouteView,
                icon: 'fund',
                children: [
                    {
                        path: '/pushMange/NewPush',
                        name: '新建推送',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/components/MessagePush/NewPush'),
                    },
                	{
                		path:'/pushMange/newMsg',
                		name:'新消息',
                		invisible: true,
                		icon:'none',
                		component: () => import('@/components/MessagePush/newMsg')
                	},
                	{
                		path:'/pushMange/friendCircleDetail',
                		name:'评论详情',
                		invisible: true,
                		icon:'none',
                		component: () => import('@/components/MessagePush/friendCircleDetail')
                	},
                        
                    {
                        path: '/pushMange/privatePush',
                        name: '私聊推送',
                        icon: 'none',
                        component: () => import('@/view/pushMange/privatePush'),
                    },
                    // {
                    //     path: '/pushMange/roomPush',
                    //     name: '群聊推送',
                    //     icon: 'none',
                    //     component: () => import('@/view/pushMange/roomPush'),
                    // },
                    {
                        path: '/pushMange/friendCirclePush',
                        name: '朋友圈推送',
                        icon: 'none',
                        component: () => import('@/view/pushMange/friendCirclePush'),
                    },
                    {
                        path: '/pushMange/friendCircleSelf',
                        name: '个人朋友圈',
                        icon: 'none',
                        component: () => import('@/view/pushMange/friendCircleSelf'),
                    }
                ]
            },
            {
                path: '/dataManage',
                name: '资料管理',
                redirect: '/dataManage/customerTag',
                component: RouteView,
                icon: 'database',
                children: [
                	
                    {
                        path: '/dataManage/customerTag',
                        name: '客户标签',
                        icon: 'none',
                        component: () => import('@/view/dataManage/customerTag'),
                    },
                    {
                        path: '/dataManage/robotTag',
                        name: '机器人标签',
                        icon: 'none',
                        component: () => import('@/view/dataManage/robotTag'),
                    },
                    {
                        path: '/dataManage/materialMange',
                        name: '素材管理',
                        icon: 'none',
                        component: () => import('@/view/dataManage/materialMange'),
                    },
                     {
                        path: '/dataManage/editMaterial',
                        name: '编辑素材',
                        icon: 'none',
                        invisible: true,
                        component: () => import('@/components/dataManage/editMaterial'),
                    },
                    {
                        path: '/dataManage/fastReply',
                        name: '快捷回复',
                        icon: 'none',
                        component: () => import('@/view/dataManage/fastReply'),
                    }
                ]
            },
            {
                path: '/productManage',
                name: '产品管理',
                redirect: '/productManage/productSort',
                component: RouteView,
                icon: 'appstore',
                children: [
                    {
                        path: '/productManage/productSort',
                        name: '产品类别',
                        icon: 'none',
                        component: () => import('@/view/productManage/productSort'),
                    },
                    {
                        path: '/productManage/productInfo',
                        name: '产品信息',
                        icon: 'none',
                        component: () => import('@/view/productManage/productInfo'),
                    },
                    
                    {
                        path: '/productManage/batch_add',
                        name: '批量添加产品',
                        icon: 'none',
                        invisible: true,
                        component: () => import('@/view/productManage/batch_add'),
                    },
                    
                    {
                        path: '/productManage/new_add',
                        name: '添加产品',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/productManage/new_add'),
                    },
                ]
            },
            {
                path: '/groupManage',
                name: '组织管理',
                redirect: '/groupManage/customerList',
                component: RouteView,
                icon: 'team',
                children: [
                    {
                        path: '/groupManage/userManage',
                        name: '用户管理',
                        icon: 'none',
                        component: () => import('@/view/groupManage/userManage'),
                    },
                    {
                        path: '/groupManage/addUser',
                        name: '添加用户',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/groupManage/editUser'),
                    },
                    {
                        path: '/groupManage/editUser',
                        name: '修改用户',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/groupManage/editUser'),
                    },
                    {
                        path: '/groupManage/departmentManage',
                        name: '部门管理',
                        icon: 'none',
                        component: () => import('@/view/groupManage/departmentManage'),
                    },
                    {
                        path: '/groupManage/addDepartment',
                        name: '添加部门',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/groupManage/editDepartment'),
                    },
                    {
                        path: '/groupManage/editDepartment',
                        name: '修改部门',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/groupManage/editDepartment'),
                    },
                    {
                        path: '/groupManage/setRobot',
                        name: '设置机器人',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/groupManage/editDepartment'),
                    },
                    {
                        path: '/groupManage/permissionManage',
                        name: '权限管理',
                        icon: 'none',
                        component: () => import('@/view/groupManage/permissionManage'),
                    },
                    {
                        path: '/groupManage/addPermission',
                        name: '添加角色',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/groupManage/editPermission'),
                    },
                    {
                        path: '/groupManage/editPermission',
                        name: '修改角色',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/groupManage/editPermission'),
                    },
                    {
                        path: '/groupManage/assignPermission',
                        name: '分配权限',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/groupManage/assignPermission'),
                    },
                    {
                        path: '/groupManage/maintainUser',
                        name: '维护成员',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/groupManage/editPermission'),
                    },
                ]
            },
            {
                path: '/systemManage',
                name: '系统管理',
                redirect: '/systemManage/robotManage',
                component: RouteView,
                icon: 'robot',
                children: [
                    {
                        path: '/systemManage/robotManage',
                        name: '机器人监控',
                        icon: 'none',
                        component: () => import('@/view/systemManage/robotManage'),
                    },
                    {
                        path: '/systemManage/monitorManage',
                        name: '监控告警',
                        invisible: true,
                        icon: 'none',
                        component: () => import('@/view/systemManage/monitorManage'),
                    },
                    {
                        path: '/systemManage/monitorSetting',
                        name: '监控设置',
                        icon: 'none',
                        component: () => import('@/view/systemManage/monitorSetting'),
                    },
                    
                    {
                        path: '/systemManage/editRobot',
                        name: '修改机器人',
                        icon: 'none',
                        invisible: true,
                        component: () => import('@/view/systemManage/editRobot'),
                    }
                ]
            }

        ]
    }
]
