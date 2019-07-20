import React from 'react'
import { Redirect } from 'react-router-dom'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, Button, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import imoocFrom from '../../component/imooc-form/imooc-from'

@connect(
  state => state.user,
  {register}
)
@imoocFrom
class Register extends React.Component {
  constructor (props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
  }
  componentDidMount () {
    this.props.handleChange('type', 'genius')
  }
  handleRegister () {
    this.props.register(this.props.state)
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo />
        <h2>注册</h2>
        <List>
          <InputItem onChange={(val) => this.props.handleChange('user', val)}>用户名</InputItem>
          <WhiteSpace />
          <InputItem type="password" onChange={(val) => this.props.handleChange('pwd', val)}>密码</InputItem>
          <WhiteSpace />
          <InputItem type="password" onChange={(val) => this.props.handleChange('repeatpwd', val)}>确认密码</InputItem>
          <WhiteSpace />
          <RadioItem checked={this.props.state.type === 'genius'} onChange={() => this.props.handleChange('type', 'genius')}>牛人</RadioItem>
          <WhiteSpace />
          <RadioItem checked={this.props.state.type === 'boss'} onChange={() => this.props.handleChange('type', 'boss')}>Boss</RadioItem>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register