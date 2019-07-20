import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, InputItem, NavBar } from 'antd-mobile'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'

@connect(
  state => state,
  {getMsgList, sendMsg, recvMsg}
)
class Chat extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount () {
    this.props.getMsgList()
    this.props.recvMsg()
  }
  handleSubmit () {
    const from = this.props.user._id // 当前用户的id
    const to = this.props.match.params.user // 目标用户的id
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState(() => ({text: ''}))
  }
  render() {
    const user = this.props.match.params.user
    console.log(this.props)
    return (
      <div id="chat-page">
        <NavBar mode="dark">
          {this.props.match.params.user}
        </NavBar>
        {
          this.props.chat.chatmsg.length > 0 ? 
            (this.props.chat.chatmsg.map((v, index) => {
              return v.from === user ? (
                <List key={index}>
                  <List.Item>他:{v.content}</List.Item>
                </List>
              ) : (
                <List key={index}>
                  <List.Item className="chat-me">我:{v.content}</List.Item>
                </List>
              )
            })) : null
        }
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v => {
                this.setState(() => {
                  return {
                    text: v
                  }
                })
              }}
              extra={<span onClick={this.handleSubmit}>发送</span>}
            ></InputItem>
          </List>
        </div>
      </div>
      
    )
  }
}

export default Chat