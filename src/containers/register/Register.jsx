import React,{Component} from 'react'
import Logo from '../../components/logo/logo'
import {NavBar,List,WingBlank,InputItem,Radio,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {register} from '../../redux/actions'
import {Redirect} from 'react-router-dom'

const ListItem = List.Item
class Register extends Component{
  state = {
    username:'',
    password:'',
    password2:'',
    type:'dashen'  //默认选中大神
  }
  handleChange = (name,val) => {
    this.setState({
      [name]:val
    })
  }
  register = () => {
    this.props.register(this.state)
  }
  toLogin = () => {
    this.props.history.replace('/login')
  }
  render() {
    const {type} = this.state
    const {msg,redirectTo} = this.props.user
    if(redirectTo){
      return <Redirect to={redirectTo}/>
    }
    return (
        <div>
          <NavBar mode='light'>硅谷直聘</NavBar>
          <Logo/>
          <WingBlank>
            {msg?<div>{msg}</div>:null}
            <List>
              <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('username',val)}}>用户名:</InputItem>
              <InputItem placeholder='请输入密码' onChange={val => {this.handleChange('password',val)}} type='password'>密码:</InputItem>
              <InputItem placeholder='请确认密码' onChange={val => {this.handleChange('password2',val)}} type='password'>确认密码:</InputItem>
              <ListItem>
                <span>用户类型:</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <Radio checked={type === 'dashen'} onChange={() => {this.handleChange('type','dashen')}}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;
                <Radio checked={type === 'laoban'} onChange={() => {this.handleChange('type','laoban')}}>老板</Radio>
              </ListItem>
              <Button type='primary' onClick={this.register}>注册</Button>
              <Button onClick={this.toLogin}>已有账户</Button>
            </List>
          </WingBlank>
        </div>
    )
  }
}

export default connect(
  state => ({user:state.user}),
    {register}
)(Register)