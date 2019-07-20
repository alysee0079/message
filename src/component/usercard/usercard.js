import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class Usercard extends Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }
  handleClick (v) {
    this.props.history.push(`/chat/${v._id}`)
  }
  render() {
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {
          this.props.userlist.map(v => {
            return(
              v.avatar ? <Card key={v.user} onClick={() => this.handleClick(v)}>
                <Card.Header
                  title={v.user}
                  thumb={require(`../img/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}
                ></Card.Header>
                <Card.Body>
                  {
                    v.type === 'boss' ? <div>公司:{v.company}</div> : null
                  }
                  {v.desc.split('\n').map(d => {
                    return <div key={d}>{d}</div>
                  })}
                  {
                    v.type === 'boss' ? <div>薪资:{v.money}</div> : null
                  }
                </Card.Body>
              </Card> : null
            )
          })
        }
      </WingBlank>
    )
  }
}

export default Usercard