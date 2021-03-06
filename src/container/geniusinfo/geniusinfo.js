import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  {update}
)
class GeniusInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      desc: '',
      company: '',
      money: '',
      avatar: ''
    }
  }
  onChange (key, value) {
    this.setState({
      [key]: value
    })
  }
  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <NavBar
          mode="dark"
        >是完善信息页</NavBar>
        <AvatarSelector selectorAvatar={(imgname) => {
          this.setState(() => {
            return {
              avatar: imgname
            }
          }, () => {
            console.log(this.state)
          })
        }}></AvatarSelector>
        <InputItem onChange={(v) => this.onChange('title', v)}>
          求职岗位
        </InputItem>
        <TextareaItem onChange={(v) => this.onChange('desc', v)} rows={3} autoHeight title={'个人简介'}>
        </TextareaItem>
        <Button 
          onClick={() => {
            this.props.update(this.state)
          }}
          type="primary">保存</Button>
      </div>
    )
  }
}

export default GeniusInfo