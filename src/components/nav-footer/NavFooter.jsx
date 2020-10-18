import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import './css/index.css'
const Item = TabBar.Item
class NavFooter extends Component{
  static propTypes = {
    navList:PropTypes.array.isRequired
  }
  render() {
    let {navList} = this.props
    const path = this.props.location.pathname
    navList = navList.filter(nav => !nav.hide)
    return (
        <TabBar>
          {navList.map(nav => (
              <Item key={nav.path}
                    title={nav.text}
                    icon={{uri:require(`./img/${nav.icon}.png`)}}
                    selectedIcon={{uri:require(`./img/${nav.icon}-selected.png`)}}
                    selected={nav.path === path}
                    onPress={() => {
                      this.props.history.replace(nav.path)
                    }}>
              </Item>
          ))}
        </TabBar>
    )
  }
}

//使用withRouter后将会向非路由组件中传入路由参数，例如：history,location
export default withRouter(NavFooter)