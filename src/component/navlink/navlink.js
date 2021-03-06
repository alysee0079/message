import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter
@connect(
  state => state.chat
)
class NavLinkBar extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  } 
  render() {
    const navList = this.props.data.filter(v => !v.hide)
    const { pathname } = this.props.location
    return (
      <React.Fragment>
        <TabBar>
          {
            navList.map((v) => {
              return(
                <TabBar.Item
                  badge={v.path === '/msg' ? this.props.unread : ''}
                  key={v.path}
                  title={v.text}
                  icon={{uri: require(`./img/${v.icon}.png`)}}
                  selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                  selected={pathname === v.path}
                  onPress={() => {
                      this.props.history.push(v.path)
                    }
                  }
                ></TabBar.Item>
              )
            })
          }
        </TabBar>
      </React.Fragment>
    )
  }
}

export default NavLinkBar 