import { AUTH_FAIL,REGISTER_SUCCESS,LOGIN_SUCCESS,USER_LOADED,LOGOUT_SUCCESS,RESET_PASSWORD,RESEND_EMAIL} from './types'
import axios from 'axios'

export const loadUser = () => (dispatch,getState) => {
    axios.get('/auth/v1/user/',tokenConfig(getState))
        .then(res => {
            // console.log(res.data.user)
            dispatch({
                type:USER_LOADED,
                payload:res.data.user
            })
        })
        .catch(err => console.log(err))
}

export const register = ({username,password,password2,email}) => dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    console.log(username,password,password2,email)
    const body = JSON.stringify({email,username,password,password2})
    axios.post('/auth/v1/',body,config)
        .then(res => {
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data
            })
        })
        .catch(err => {
            dispatch({
                type:AUTH_FAIL
            })
        })
}

export const login = (email,password) => dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({email,password})
    axios.post('/auth/v1/login',body,config)
            .then(res => {
                console.log(res)
                dispatch({
                    type:LOGIN_SUCCESS,
                    payload:res.data
                })
            })
            .catch(err => {
                dispatch({
                    type:AUTH_FAIL
                })
            })
}

export const tokenConfig  = getState => {
    const token = getState().auth.token
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    if(token){
        config.headers['Authorization']= `Bearer ${token}`
    }
    return config
}
export const logOut = () => (dispatch,getState) => {
    axios.post('/auth/v1/logout/',null,tokenConfig(getState))
        .then(res => {
            dispatch({
                type:LOGOUT_SUCCESS,
                payload:res.data
            })
        })
        .catch(err => console.log(err))

}
export const resetPassword = ({email,password,password2}) => dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({email,password,password2})
    axios.post('/auth/v1/reset/',body,config)
        .then(res => {
            dispatch({
                type:RESET_PASSWORD,
                payload:res.data
            })
        })
        .catch(err => console.log(err))
}
export const resend = (email) => dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({email})
    axios.post('/auth/v1/resend/',body,config)
        .then(
            res => {
                dispatch({
                    type:RESEND_EMAIL,
                    payload:res.data
                })
            }
        )
        .catch(err => console.log(err))
}