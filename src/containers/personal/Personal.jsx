import React,{Component} from 'react'
import {connect} from 'react-redux'
import {List,WhiteSpace,Button,Result,Modal} from 'antd-mobile'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'
const Item = List.Item
const Brief = Item.Brief
class Personal extends Component{
  loginOut = () => {
    //退出登录：清空流浪器中存储的cookie值，将redux中的user对象清空
    Modal.alert('退出', '确认退出登录吗?',
        [{text: '取消' },
          { text: '确认',
            onPress: () => {
              Cookies.remove('userid')
              this.props.resetUser() }
          }])
  }
  render() {
    const {username,salary,company,post,header,info} = this.props.user
    return (
        <div style={{marginTop:50,marginBottom:50}}>
          <Result img={<img src={require(`../../assets/header-images/${header}.png`)}
                            style={{width: 50}}
                            alt="header"/>}
                  title={username}
                  message={company}
          />
          <List renderHeader={() => '相关信息'}>
            <Item multipleLine>
              <Brief>职位: {post}</Brief>
              <Brief>简介: {info}</Brief>
              {salary ? <Brief>薪资: {salary}</Brief>:null}
            </Item>
          </List>
          <WhiteSpace/>
          <List>
            <Button type='warning' onClick={this.loginOut}>退出登录</Button>
          </List>
        </div>
    )
  }
}

export default connect(
    state => ({user:state.user}),
    {resetUser}
)(Personal)