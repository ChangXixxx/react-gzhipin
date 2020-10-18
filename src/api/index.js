import ajax from './ajax'
//注册接口
export const reqRegister = (user) => ajax('/register',user,'POST')
//登录接口
export const reqLogin = (user) => ajax('/login',user,'POST')
//用户更新接口
export const reqUpdataUser = (user) => ajax('/update',user,'POST')
//获取用户列表接口
export const reqUserList = (type) => ajax('/list', {type})
//获取消息列表、
export const reqChatMsgList = () => ajax('msglist')
//修改消息为已读
export const reqReadMsg = (from) => ajax('readmsg', {from},'POST')