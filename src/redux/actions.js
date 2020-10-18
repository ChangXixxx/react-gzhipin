// 异步action 和同步action
import {AUTH_SUCCESS,ERROR_MES,RECIEVE_USER,RESET_USER,RECIEVE_USER_LIST,RECIEVE_MSG_LIST,RECIEVE_MSG,MSG_READ} from './action-types'
import {reqRegister,reqLogin,reqUpdataUser,reqUserList,reqChatMsgList,reqReadMsg} from '../api/index'
//引入socket.io用于发送消息
import io from 'socket.io-client'
//同步action
export const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user})
export const errorMes = (msg) => ({type:ERROR_MES,data:msg})
export const recieveUser = (user) => ({type:RECIEVE_USER,data:user})
export const resetUser = (msg) => ({type:RESET_USER,data:msg})
export const recieveUserList = (userList) => ({type:RECIEVE_USER_LIST,data:userList})
const chatMsgList = ({users,chatMsgs}) => ({type:RECIEVE_MSG_LIST,data:{users,chatMsgs}})
const recieceMsg = (msg) => ({type:RECIEVE_MSG,data:msg})
export const msgRead = ({from,to}) => ({type:MSG_READ,data:{from,to}})
//定义函数创建服务器的连接对象（仅创建一次）
function initIO(dispatch,userid) {
  if(!io.socket){
    //创建连接对象
    io.socket = io('ws://localhost:4000')
    //绑定监听，接收服务器发送的消息
    io.socket.on('receiveMsg',function (msg) {
      console.log('客户端接收到了服务器发送的消息',msg)
      if(msg.to === userid || msg.from === userid){
        dispatch(recieceMsg(msg))
      }
    })
  }
}
//获取用户相关的消息列表，用户登录、注册、redux中user对象改变时调用
async function getMsgList(dispatch,userid) {
  initIO(dispatch,userid)
  const response = await reqChatMsgList()
  const result = response.data
  if(result.code === 0){
    const {users,chatMsgs} = result.data
    dispatch(chatMsgList({users,chatMsgs}))
  }
}
//用户注册
export const register = (user) => {
  const {username,password,password2,type} = user
  if(password !== password2){
    return errorMes('2次密码需要保持一致')
  }else if(!username){
    return errorMes('用户名不能为空')
  }else if(!password || !password2){
    return errorMes('密码不能为空')
  }

  return async dispatch => {
    //发送异步请求
    const response = await reqRegister({username,password,type})
    const result = response.data
    if(result.code === 0){
      //成功
      getMsgList(dispatch,result.data._id)
      dispatch(authSuccess(result.data))
    }else{
      //失败
      dispatch(errorMes(result.msg))
    }
  }
}
//用户登录
export const login = (user) => {
  const {username,password} = user
  if(!username){
    return errorMes('用户名不能为空')
  }else if(!password){
    return errorMes('密码不能为空')
  }
  return async dispatch => {
    //发送异步请求
    const response = await reqLogin(user)
    const result = response.data
    if(result.code === 0){
      //成功
      getMsgList(dispatch,result.data._id)
      dispatch(authSuccess(result.data))
    }else{
      //失败
      dispatch(errorMes(result.msg))
    }
  }
}
//用户更新信息
export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdataUser(user)
    const result = response.data
    if(result.code === 0){//更新成功，将数据保存在同步action中
      dispatch(recieveUser(result.data))
    }else{//更新失败
      dispatch(resetUser(result.msg))
    }
  }
}
//获取用户列表
export const getUserList = (type) => {
  return async dispatch => {
    const response = await reqUserList(type)
    const result = response.data
    if(result.code === 0){//更新成功，将数据保存在同步action中
      dispatch(recieveUserList(result.data))
    }
  }
}

//发送消息
export const sendMsg = ({from,to,content}) => {
  return dispatch => {
    io.socket.emit('sendMsg',{from,to,content})
  }
}
//
export const readMsg = (from,to) => {
  return async dispatch => {
    const response = await reqReadMsg(from)
    const result = response.data
    if(result.code === 0){
      dispatch(msgRead({from,to}))
    }
  }
}