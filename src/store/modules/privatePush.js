export default {
    namespaced: true,
    state: {
        resend_id: '',
        new_push_state:false,
    },
    mutations: {
        resend (state, resend_id) {
            state.resend_id = resend_id
        },
        new_push(state,new_push_state){
        	state.new_push_state = new_push_state;
        }
    },
    actions: {
       
    }
}
