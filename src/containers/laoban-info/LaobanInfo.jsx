import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import HeaderSelector from '../../components/header-selector/HeaderSelector'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import {updateUser} from '../../redux/actions'
class LaobanInfo extends Component{
  state = {
    header:'',
    post:'',//招聘职位
    company:'',//公司名称
    salary:'',
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
      return <Redirect to='/laoban'/>
    }
    return (
        <div>
          <NavBar>老板信息完善</NavBar>
          <HeaderSelector setHeader={this.setHeader}/>
          <InputItem placeholder='请输入招聘职位' onChange={val =>{this.handleClick('post',val)}}>招聘职位:</InputItem>
          <InputItem placeholder='请输入公司名称' onChange={val =>{this.handleClick('company',val)}}>公司名称:</InputItem>
          <InputItem placeholder='请输入职位薪资' onChange={val =>{this.handleClick('salary',val)}}>职位薪资:</InputItem>
          <TextareaItem title='职位要求:' rows={2} onChange={val =>{this.handleClick('info',val)}}/>
          <Button type='primary' onClick={this.save}>保存</Button>
        </div>
    )
  }
}

export default connect(
    state => ({user:state.user}),
    {updateUser}
)(LaobanInfo)