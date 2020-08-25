import { POST_SUCCESS,POST_FAIL, ADD_POST,ADD_POST_FAIL,GET_POST,GET_POST_FAIL, DELETE_POST} from './types'
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

export const addPost = (body) => (dispatch,getState) => {
    const bodys = JSON.stringify({body})
    axios.post('/api/v1/',bodys,tokenConfig(getState))
        .then(res => {
            dispatch({
                type:ADD_POST,
                payload:res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type:ADD_POST_FAIL,
                payload:err
            })
        })
}
export const getPostById = id => (dispatch,getState) => {
    axios.get(`/api/v1/${id}/`,tokenConfig(getState))
        .then(res => {
            dispatch({
                type:GET_POST,
                payload:res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type:GET_POST_FAIL,
                payload:err
            })
        })
}
export const deletePost =( id,history )=> (dispatch,getState) => {
    console.log(history)
    axios.delete(`/api/v1/${id}/`,tokenConfig(getState))
        .then(res => {
            history.push('/')
            dispatch({
                type:DELETE_POST,
                payload:id
            })
            
        })
        .catch(err => {
            dispatch({
                type:GET_POST_FAIL,
                payload:err
            })
        })
}