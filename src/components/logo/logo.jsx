import logo from './logo.png'
import './logo.css'
import React,{Component} from 'react'
export default class Logo extends Component {
  render() {
    return (
        <div className='logo-container'>
          <img src={logo} alt="logo" className='logo'/>
        </div>
    )
  }
}