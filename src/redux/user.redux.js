import axios from 'axios'
import { getRedirectPath } from '../util'

const ERROR_MSG = 'error_msg'
const LOAD_DATA = 'load_data'
const AUTH_SUCCESS = 'auth_success'
const LOGOUT = 'logout'

const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  pwd: '',
  type: ''
}
// reducer
export function user (state=initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
    case LOAD_DATA:
      return {...state, ...action.data}
    case LOGOUT:
      return {...initState, redirectTo: '/login'}
    case ERROR_MSG:
      return {...state, msg: action.msg}
      default:
        return state
  }
}
function authSuccess (data) {
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}
function errorMsg (msg) {
  return {
    msg,
    type: ERROR_MSG
  }
}

export function loadData (userinfo) {
  return {
    type: LOAD_DATA,
    data: userinfo
  }
}

export function login ({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户名密码必须输入')
  }
  return (dispatch) => {
    axios.post('/user/login', {user, pwd}).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function register ({user, pwd, repeatpwd, type}) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同')
  }
  return (dispatch) => {
    axios.post('/user/register', {user, pwd, repeatpwd, type}).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({user, pwd, repeatpwd, type}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function update (data) {
  console.log(data)
  return dispatch => {
    axios.post('/user/update', data).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function logoutSubmit () { 
  return {
    type: LOGOUT
  }
}