import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Result, List, WhiteSpace, Modal} from 'antd-mobile'
import browserCookies from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'

@connect(
  state => state.user,
  {logoutSubmit}
)
class User extends Component {
  constructor (props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout () {
    const alert = Modal.alert
    alert('注销', '确认退出登陆么?', [
      { 
        text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' 
      },
      { 
        text: 'OK', onPress: () => {
          browserCookies.erase('userid')
          this.props.logoutSubmit()
        } 
      },
    ])
  }
  render() {
    const props = this.props
    return props.user ? (
      <div>
        <Result 
          img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width: 50}} alt=""/>}
          title={this.props.user}
          message={this.props.type === 'boss' ? this.props.company : null}
        />
        <List renderHeader={() => '简介'}>
          <List.Item multipleLine={true}>
            {this.props.title}
            {this.props.desc.split('\n').map(v => <List.Item.Brief key={v}>{this.props.desc}</List.Item.Brief>)}
            {this.props.money ? <List.Item.Brief>薪资:{this.props.money}</List.Item.Brief> : null}
          </List.Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <List.Item onClick={this.logout}>退出登陆</List.Item>
        </List>
      </div>
    ) : <Redirect to={this.props.redirectTo}></Redirect>
  }
}

export default User