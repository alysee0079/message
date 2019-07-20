import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatUser.redux'
import Usercard from '../usercard/usercard'

@connect(
  state => state.chatUser,
  {getUserList}
)
class Boss extends Component {
  componentDidMount () {
    this.props.getUserList('genius')
  }
  render() {
    return (
      <Usercard userlist={this.props.userList}></Usercard>
    )
  }
}

export default Boss