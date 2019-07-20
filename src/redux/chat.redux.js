import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

const MSG_LIST = 'msg_list'
const MSG_RECV = 'msg_recv'
// const MSG_READ = 'msg_read'

const initState = {
  chatmsg: [],
  unread: 0
}

export function chat (state=initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {...state, chatmsg: action.payload, unread: action.payload.filter(v => !v.read).length}
    case MSG_RECV:
      return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + 1}
    // case MSG_READ:
    default:
      return state
  }
}

function msgList (msgs) {
  return {
    type: MSG_LIST,
    payload: msgs
  }
}

export function sendMsg ({from, to, msg}) {
  return dispatch => {
    socket.emit('sendmsg', {from, to, msg})
  }
}
function msgRecv (msg) { 
  return {
    type: MSG_RECV,
    payload: msg
  }
}
export function recvMsg () {
  return dispatch => {
    socket.on('recvmsg', function (data) {
      console.log(data)
      dispatch(msgRecv(data))
    })
  }
}

export function getMsgList () {
  return dispatch => {
    axios.get('/user/getmsglist')
      .then((res) => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(msgList(res.data.msgs))
        }
      })
  }
}