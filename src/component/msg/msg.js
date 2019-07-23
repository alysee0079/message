import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(
  state => state
)
class Msg extends Component {
  getLast (arr) {
    return arr[arr.length - 1]
  }
  render() {
    // if (!this.props.chat.chatmsg.length) {
    //   return
    // }
    const userid = this.props.user._id
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })
    console.log(chatList)
    return (
      <div>
        {
          chatList.map(v => {
            const unread = v.filter(item => !item.read && item.to === userid).length
            const lastItem = this.getLast(v)
            const targetId = v[0].from === userid ? v[0].to : v[0].from
            const name = this.props.chat.users[targetId] && this.props.chat.users[targetId].name
            const avatar = this.props.chat.users[targetId] && this.props.chat.users[targetId].avatar
            return(
              <List key={lastItem._id}>
                <List.Item
                  extra={<Badge text={unread}></Badge>}
                  thumb={require(`../img/${avatar}.png`)}
                  arrow="horizontal"
                  onClick={() => {
                    this.props.history.push(`/chat/${targetId}`)
                  }}
                >
                  {lastItem.content}
                  <List.Item.Brief>{name}</List.Item.Brief>
                </List.Item>
              </List>
            )
          })
        }
      </div>
    )
  }
}

export default Msg