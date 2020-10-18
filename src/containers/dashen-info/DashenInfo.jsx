import React,{Component} from 'react'
import {connect} from 'react-redux'
import HeaderSelector from '../../components/header-selector/HeaderSelector'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import {updateUser} from '../../redux/actions'
import {Redirect} from "react-router-dom";
class DashenInfo extends Component{
  state = {
    header:'',
    post:'',//招聘职位
    info:''//职位要求
  }
  handleClick = (name,value) => {
    this.setState({
      [name]:value
    })
  }
  //用于头像的修改在子组件中，因此需要通过props属性将函数传入
  setHeader = (header) => {
    this.setState({header})
  }
  save = () => {
    this.props.updateUser(this.state)
  }
  render() {
    const {header} = this.props.user
    if(header){
      return <Redirect to='/dashen'/>
    }
    return (
        <div>
          <NavBar>大神信息完善</NavBar>
          <HeaderSelector setHeader={this.setHeader}/>
          <InputItem placeholder='请输入求职岗位' onChange={val =>{this.handleClick('post',val)}}>求职岗位:</InputItem>
          <TextareaItem title='个人介绍:' rows={3} onChange={val =>{this.handleClick('info',val)}}/>
          <Button type='primary' onClick={this.save}>保存</Button>
        </div>
    )
  }
}

export default connect(
    state => ({user:state.user}),
    {updateUser}
)(DashenInfo)