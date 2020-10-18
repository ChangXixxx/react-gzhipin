import React,{Component} from 'react'
import {connect} from 'react-redux'
import {sendMsg,readMsg} from '../../redux/actions'
import QueueAnim from 'rc-queue-anim'
import './css/index.css'
import {NavBar,List,InputItem,Grid,Icon} from 'antd-mobile'
const Item = List.Item
class Chat extends Component{
  state = {
    content:'',
    isShow:false
  }
  constructor(prop) {
    super(prop);
    this.emojis = ['🍇','🍈','🍉','🍊','🍋','🍌','🍍','🥭',
      '🍎','🍏','🍐','🍑','🍓','🥝','🍅','🥥',
      '🥑','🍆','🥔','🥕','🌽','🌶','🥒','🥬',
      '🥦','🧄','🧅','🍄','🥜','🌰','🍞','🥐',
      '🥖','🥨','🥯','🥞','🧇','🧀','🍖','🍗',
      '🥩','🥓','🍔','🍟','🍕','🌭','🥪','🌮']
    this.emojis = this.emojis.map(emoji => ({text:emoji}))
  }
  componentDidMount() {
    // 初始显示列表
    window.scrollTo(0, document.body.scrollHeight)
    const to = this.props.user._id
    const from = this.props.match.params.userid
    this.props.readMsg(from,to)
  }
  componentDidUpdate () {
    // 更新显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }
  setEmoji = () => {
    const isShow = !this.state.isShow
    console.log(isShow)
    this.setState({isShow})
    if(isShow){
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }
  handleMsg = () => {
    //收集数据
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const {content} = this.state
    //发送消息
    if(content)
      this.props.sendMsg({from,to,content})
    //清空输入框
    this.setState({content: '',isShow:false})
  }
  render() {
    const {user,chat} = this.props
    const {users,chatMsgs} = chat
    //得到用户ID
    const meId = user._id
    if(!users[meId]){
      return null
    }
    //得到目标ID
    const targetId = this.props.match.params.userid
    const chatId = [meId,targetId].sort().join('_')
    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
    const header = users[targetId].header
    const targetIcon = header ? require(`../../assets/header-images/${header}.png`) : null
    return (
        <div id='chat-page'>
          <NavBar
              className='top-navbar'
              icon={<Icon type='left'/>}
              onLeftClick={() => this.props.history.goBack()}
          >
            {users[targetId].username}
          </NavBar>
          <List style={{marginTop:50,marginBottom:50}}>
            <QueueAnim type='left' delay={100}>
              {msgs.map(msg => {
                if(msg.to === meId){ //别人发给我的
                  return (
                      <Item key={msg.chat_id}
                            thumb={targetIcon} >
                        {msg.content}
                      </Item>
                  )
                }else{
                  return (
                      <Item key={msg.chat_id}
                            className='chat-me' extra='我' >
                        {msg.content}
                      </Item>
                  )
                }
              })}
            </QueueAnim>
          </List>
          <div className='bar'>
            <InputItem placeholder="请输入"
                       value={this.state.content}
                       onChange={val => this.setState({content:val})}
                       onFocus={() => this.setState({isShow:false})}
                       extra={
                         <span>
                           <span onClick={this.setEmoji} style={{marginRight:10}}>emoji</span>
                           <span onClick={this.handleMsg}>发送</span>
                         </span>} />
            {this.state.isShow ? (
                <Grid
                    data={this.emojis}
                    columnNum={6}
                    carouselMaxRow={4}
                    isCarousel={true}
                    onClick={(item) => { this.setState({content: this.state.content + item.text}) }} />
            ) : null}
          </div>

        </div>
    )
  }
}
export default connect(
  state => ({user:state.user,chat:state.chat}),
    {sendMsg,readMsg}
)(Chat)