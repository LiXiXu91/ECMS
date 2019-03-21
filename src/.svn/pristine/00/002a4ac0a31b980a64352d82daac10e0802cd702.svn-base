export default {
    namespaced: true,
    state: {
        isMobile: false,
        theme: 'dark',
        layout: 'side',
        systemName: 'ECMS',
        copyright: 'by cczhuc',
        footerLinks: [],
        multipage: false,
        breadcrumb:[]
    },
    mutations: {
        setDevice (state, isMobile) {
            state.isMobile = isMobile
        },
        setTheme (state, theme) {
            state.theme = theme
        },
        setLayout (state, layout) {
            state.layout = layout
        },
        setMultipage (state, multipage) {
            state.multipage = multipage
        },
        setBreadcrumb (state, beadcrumb) {
            state.breadcrumb = breadcrumb
        }
    },
    actions: {
        getBreadcrumb ({state},router) {
            state.breadcrumb = router.matched
        }
    }
}
