import React,{Component} from 'react'
import {connect} from 'react-redux'
import UserList from "../../components/user-list/UserList"
import {getUserList} from '../../redux/actions'
class Dashen extends Component{
  componentDidMount() {
    this.props.getUserList('laoban')
  }
  render() {
    return (
        <UserList userList={this.props.userList}/>
    )
  }
}

export default connect(
    state => ({userList:state.userList}),
    {getUserList}
)(Dashen)