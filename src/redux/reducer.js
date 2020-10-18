// 包含n个reducer函数
import {combineReducers} from 'redux'
import {AUTH_SUCCESS,ERROR_MES,RESET_USER,RECIEVE_USER,RECIEVE_USER_LIST,RECIEVE_MSG_LIST,RECIEVE_MSG,MSG_READ} from './action-types'
import {getRedirectTo} from '../utils'

const initUser = {
  username:'',
  type:'',   //用户类型
  message:'' ,//错误的提示信息
  redirectTo:''//需要重定向的路由地址
}
function user(state=initUser,action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const {type,header} = action.data
      return {...action.data,redirectTo:getRedirectTo(type,header)}
    case ERROR_MES:
      return {...state,msg:action.data}
    case RECIEVE_USER:
      return action.data
    case RESET_USER:
      return {...initUser ,msg:action.data}
    default:
      return state
  }
}

const initUserList = []
function userList(state=initUserList,action) {
  switch (action.type) {
    case RECIEVE_USER_LIST:
      return action.data
    default:
      return state
  }
}

const initChat = {
  users:{},
  chatMsgs:[]
}
function chat(state=initChat,action) {
  switch (action.type) {
    case RECIEVE_MSG_LIST:
      const {users,chatMsgs} = action.data
      return {users,chatMsgs}
    case RECIEVE_MSG:
      const msg = action.data
      return {
        users:state.users,
        chatMsgs:[...state.chatMsgs,msg]}
    case MSG_READ:
      const {from,to} = action.data
      return {
        users:state.users,
        chatMsgs:state.chatMsgs.map(msg => {
          if(msg.from === from && msg.to === to && !msg.read)
            return {...msg,read:true}
          else return msg
        })}
    default:
      return state
  }
}
export default combineReducers({
  user,
  userList,
  chat
})