import { AUTH_FAIL,REGISTER_SUCCESS,LOGIN_SUCCESS} from './types'
import axios from 'axios'

// export const loadUser = () => {
//     axios.get('/auth/v1/user/',tokenConfig(getState))
//         .then(res => {
//             dispatchEvent({
//                 type:USER_LOADED,
//                 payload:res.data
//             })
//         })
//         .catch(err => console.log(err))
// }

export const register = (username,password,password2,email) => dispatch => {
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({username,password,password2,email})
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
    const body = JSON.stringify({username,password})
    axios.post('/auth/v1/login',body,config)
            .then(res => {
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