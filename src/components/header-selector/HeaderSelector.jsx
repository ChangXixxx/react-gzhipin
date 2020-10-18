import React,{Component} from 'react'
import {List,Grid} from 'antd-mobile'
import propTypes from 'prop-types'
export default class HeaderSelector extends Component{
  static propTypes = {
    setHeader:propTypes.func.isRequired
  }
  state = {
    icon:null //保存用户选择的头像
  }
  constructor(props) {
    super(props)
    this.images = []
    for(let i = 0;i<20;i++){
      this.images.push({
        text:'头像'+(i+1),
        icon:require('../../assets/header-images/头像'+(i+1)+'.png')
      })
    }
  }
  //接收用户点击的图片信息对象{text,icon}
  handleClick = ({text,icon}) => {
    this.setState({icon})
    this.props.setHeader(text)
  }

  render() {
    const {icon} = this.state
    const selectIcon = !icon ? '请选择头像' : (
        <div>
          已选择头像:<img src={icon} alt={icon}/>
        </div>
    )
    return (
        <List renderHeader={() => selectIcon}>
          <Grid data={this.images} columnNum={5} onClick={this.handleClick}/>
        </List>
    )
  }
}