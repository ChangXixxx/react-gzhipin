import React,{Component} from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief
class Message extends Component{
  getLastMsgs = (chatMsgs,userid) => {
    //1.将chatMsgs通过chat_id进行分组，并找出每组的最后一条消息，保存在对象容器中{chat_id:msg}
    const lastMsgsObj = {}
    chatMsgs.forEach(msg => {
      //此消息是别人发给我的 并且未读
      if(msg.to === userid && !msg.read){
         msg.unReadCount = 1
      }else{
        msg.unReadCount = 0
      }
      const lastMsg = lastMsgsObj[msg.chat_id]
      if(!lastMsg){ //不存在此分组，将此消息添加到容器对象中
        lastMsgsObj[msg.chat_id] = msg
      }else{ //存在此分组，判断消息是否为最后一条消息
        const unReadCount = lastMsg.unReadCount + msg.unReadCount
        if(msg.create_time > lastMsg.create_time)
          lastMsgsObj[msg.chat_id] = msg
        lastMsgsObj[msg.chat_id].unReadCount = unReadCount
      }
    })
    //2.将对象容器中的value值转化为数组
    const lastMsgs = Object.values(lastMsgsObj)
    //3.将数组按照时间顺序降序排列
    lastMsgs.sort(function (m1,m2) {//若返回结果小于0，则二者交换位置
      return m2.create_time - m1.create_time
    })
    return lastMsgs
  }
  render() {
    const {user} = this.props
    const {users,chatMsgs} = this.props.chat
    const lastMsgs = this.getLastMsgs(chatMsgs,user._id)
    return (
        <List style={{marginTop:50,marginBottom:50}}>
          {lastMsgs.map(msg => {
            const targetId = msg.from === user._id ? msg.to : msg.from
            const {username,header} = users[targetId]
            return (
                <Item
                    extra={<Badge text={msg.unReadCount}/>}
                    thumb={require(`../../assets/header-images/${header}.png`)}
                    arrow='horizontal'
                    onClick={() => this.props.history.push(`/chat/${targetId}`)}>
                  {username}
                  <Brief>{msg.content}</Brief>
                </Item>
            )
          })}
        </List>
    )
  }
}

export default connect(
    state => ({user:state.user,chat:state.chat}),
    {}
)(Message)