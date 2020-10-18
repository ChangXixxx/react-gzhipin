import React,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {NavBar} from "antd-mobile"
import DashenInfo from '../dashen-info/DashenInfo'
import LaobanInfo from '../laoban-info/LaobanInfo'
import Laoban from "../laoban/Laoban"
import Dashen from "../dashen/Dashen"
import Message from "../message/Message"
import Personal from "../personal/Personal"
import NavFooter from "../../components/nav-footer/NavFooter"
import '../../components/nav-footer/css/index.css'
import Chat from "../chat/Chat"
class Main extends Component{
  navList = [
      {
        path: '/laoban',
        component: Laoban,
        title: '大神列表',
        icon: 'dashen',
        text: '大神',
      },
      {
        path: '/dashen',
        component: Dashen,
        title: '老板列表',
        icon: 'laoban',
        text: '老板'
      },
      {
        path: '/message',
        component: Message,
        title: '消息列表',
        icon: 'message',
        text: '消息'
      },
      {
        path: '/personal',
        component: Personal,
        title: '用户中心',
        icon: 'personal',
        text: '个人'
      }]
  render() {
    //设置页面权限 防止用户未登录
    const {user} = this.props
    if(!user._id){
       return <Redirect to='/login'/>
    }
    //注册组件路由
    const {navList} = this
    //得到用户当前访问的页面地址
    const path = this.props.location.pathname
    const currentPath = navList.find(nav => nav.path === path)
    if(currentPath){
      if(user.type === 'laoban'){
        navList[1].hide = true
      }else{
        navList[0].hide = true
      }
    }
    return (
        <div>
          {currentPath ? <NavBar className='top-navbar'>{currentPath.title}</NavBar> : null}
          <Switch>
            {navList.map((nav,index) => <Route key={index} path={nav.path} component={nav.component}/>)}
            <Route path='/dasheninfo' component={DashenInfo}/>
            <Route path='/laobaninfo' component={LaobanInfo}/>
            <Route path='/chat/:userid' component={Chat}/>
          </Switch>
          {currentPath ? <NavFooter navList={navList}/> : null}
        </div>
    )
  }
}
export default connect(
  state => ({user:state.user}),
{}
)(Main)