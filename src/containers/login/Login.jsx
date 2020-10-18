import React,{Component} from 'react'
import Logo from '../../components/logo/logo'
import {NavBar, List, WingBlank, InputItem, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {login} from '../../redux/actions'
import {Redirect} from "react-router-dom";

class Login extends Component{
  state = {
    username:'',
    password:'',
  }
  handleChange = (name,val) => {
    this.setState({
      [name]:val
    })
  }
  login = () => {
    this.props.login(this.state)
  }
  toRegister = () => {
    this.props.history.replace('/register')
  }
  render() {
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
              <Button type='primary' onClick={this.login}>登录</Button>
              <Button onClick={this.toRegister}>还没有账户</Button>
            </List>
          </WingBlank>
        </div>
    )
  }
}

export default connect(
    state => ({user:state.user}),
    {login}
)(Login)