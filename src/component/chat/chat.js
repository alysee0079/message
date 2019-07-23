import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, InputItem, NavBar, Icon, Grid  } from 'antd-mobile'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util'

@connect(
  state => state,
  {getMsgList, sendMsg, recvMsg, readMsg}
)
class Chat extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      text: '',
      msg: [],
      showEmoji: false
    }
  }
  componentDidMount () {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  componentWillUnmount () {
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }
  fixCarousel () {
    window.dispatchEvent(new Event('resize'))
  }
  handleSubmit () {
    const from = this.props.user._id // 当前用户的id
    const to = this.props.match.params.user // 目标用户的id
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState(() => ({text: ''}))
  }
  render() {
    const emoji = '😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😊 😍 🤩 👋 😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😊 😍 🤩 👋 😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😊 😍 🤩 👋 😀 😃 😄 😁 😆 😅 🤣 😂 🙂 🙃 😉 😊 😊 😍 🤩 👋'.split(' ').filter(v => v).map(v => ({text: v}))
    const userid = this.props.match.params.user
    const users = this.props.chat.users
    if (!users[userid]) {
      return null
    }
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
    return (
      <div id="chat-page">
        <NavBar 
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>
        {
          chatmsgs.length > 0 ? 
            (chatmsgs.map((v, index) => {
              const avatar = require(`../img/${users[v.from].avatar}.png`)
              return v.from === userid ? (
                <List key={index}>
                  <List.Item
                    thumb={avatar}
                  >{v.content}</List.Item>
                </List>
              ) : (
                <List key={index}>
                  <List.Item 
                    extra={<img src={avatar} alt=""/>}
                    className="chat-me">{v.content}</List.Item>
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
              extra={
                <div>
                  <span style={{marginRight: 15}} onClick={() => {
                    this.setState((preState) => {
                      return {
                        showEmoji: !preState.showEmoji
                      }
                    })
                    this.fixCarousel()
                  }}>😀</span>
                  <span onClick={() => this.handleSubmit()}>发送</span> 
                </div>
              }
            ></InputItem>
          </List>
          {
            this.state.showEmoji ? 
            <Grid 
              data={emoji}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={el => {
                this.setState((preState) => {
                  return {
                    text: preState.text + el.text
                  }
                })
              }}
            /> : null
          }
          
        </div>
      </div>
      
    )
  }
}

export default Chat