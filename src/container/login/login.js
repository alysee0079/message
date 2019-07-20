import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, Button, WhiteSpace } from 'antd-mobile'
import { login } from '../../redux/user.redux'
import imoocFrom from '../../component/imooc-form/imooc-from'

@connect(
  state => state.user,
  {login}
)
@imoocFrom
class Login extends React.Component {
  constructor (props) {
    super(props)
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  register () {
    this.props.history.push('/register')
  }
  handleLogin () {
    this.props.login(this.props.state)
  }
  render() {
    return (
      <div>
        {(this.props.redirectTo && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo />
        <h2>登陆</h2>
        <WingBlank>
          <List>
            <InputItem onChange={(val) => this.props.handleChange('user', val)}>用户</InputItem>
            <WhiteSpace />
            <InputItem onChange={(val) => this.props.handleChange('pwd', val)} type="password">密码</InputItem>
          </List>
          <Button type="primary" onClick={this.handleLogin}>登陆</Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login