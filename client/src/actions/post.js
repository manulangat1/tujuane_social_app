import { POST_SUCCESS,POST_FAIL} from './types'
import axios from 'axios'
import {  tokenConfig } from './auth'


export const loadPosts = () => (dispatch,getState) =>{
    axios.get('/api/v1/',tokenConfig(getState))
        .then(res => {
            // console.log(res.data.data)
            dispatch({
                type:POST_SUCCESS,
                payload:res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type:POST_FAIL,
                payload:err
            })
        })
}