import { concatMsgArr } from '@/common/util'
var emoji = require('../../common/emojiMap');
export default {
    namespaced: true,
    state: {
        contactList:[],
        // 当前选择联系人
        selectContact :{},
        chatMsgList: [],
        emojiFlag:false,
        searchStatus:false,
    },
    mutations: {
        setSelectContact(state,contact) {
            state.selectContact = contact
        },
        setContactList(state,contactList) {
            state.contactList = contactList
        },
        addContactList(state,contactList) {
            // 需要去重,这是滚动翻页
            let arr=[]
            contactList.forEach(el=>{
                let flag = false
                state.contactList.forEach(item=>{
                    if((el.friend_user_name==item.friend_user_name)&&(el.robot_username==item.robot_username)) {
                        flag = true
                    }
                })
                !flag&&arr.push(el)
            })
            state.contactList = [...state.contactList,...arr]
        },
        insertContactList(state,contact) {
            let flag = false
            let index
            state.contactList.forEach((el,_index)=>{
                if((el.friend_user_name==contact.friend_user_name)&&(el.robot_username==contact.robot_username)) {
                    flag=true
                    index = _index
                }
            })
            if(flag) {
                let arr= state.contactList.splice(index,1)
                state.contactList.unshift(arr[0])
            } else {
                state.contactList.unshift(contact)
            }
        },
        clearContactList(state) {
            state.contactList=[]
        },
        setEmojiFlag(state,flag) {
            state.emojiFlag = flag
        },
        setChatMsgList(state,chatMsgList) {
            state.chatMsgList = chatMsgList
        },
        addChatMsgList(state,chatMsgList) {
            state.chatMsgList = concatMsgArr(chatMsgList,state.chatMsgList)
        },
        insertChatMsgList(state,chatMsg) {
            let flag = false
            state.chatMsgList.forEach(el=>{
                if(el.key == chatMsg.key) {
                    el.data.push(chatMsg.data[0])
                    flag =true
                }
            })
            !flag&&(state.chatMsgList.push(chatMsg))
        },
        clearChatMsgList(state) {
            state.chatMsgList=[]
        },
        setSearchStatus(state,bool) {
            state.searchStatus = bool
        }
    },
    actions: {

    }
}
