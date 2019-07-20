import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'

@withRouter
@connect(
  null,
  {loadData}
)
class AuthRoute extends React.Component {
  componentDidMount () {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    // 校验当前页面是否处于登陆,注册页,如果是,则不作任何操作,直接退出执行,否则下一步去获取用户信息
    if (publicList.indexOf(pathname) !== -1) {
      return null
    }
    // 获取用户信息登陆过,有cookie
    axios.get('/user/info').then((res) => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          // 有登陆信息
          // 存储用户信息
          this.props.loadData(res.data.data)
        } else {
          this.props.history.push('./login')
        }
      }
    })
    // 是否登陆
    // 现在的url地址, 用户的type,用户是否完善信息(选择头像,个人简介)
  }
  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default AuthRoute