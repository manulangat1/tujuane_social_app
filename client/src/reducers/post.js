import { POST_FAIL,POST_SUCCESS,  ADD_POST,ADD_POST_FAIL,GET_POST,GET_POST_FAIL,DELETE_POST, USER_LOADED} from '../actions/types'


const initialState = {
    posts:[],
    post:[]
}
export default function(state=initialState,action){
    switch(action.type){
        case POST_SUCCESS:
            return{
                ...state,
                posts:action.payload
            }
        case DELETE_POST:
            return {
                ...state,
                posts:state.posts.filter((post) => post._id !== action.payload)
            }
        case GET_POST:
            return{
                post:action.payload
            }
        case ADD_POST:
            return {
                ...state,
                posts:[action.payload,...state.posts]
            }
        case ADD_POST_FAIL:
        case GET_POST_FAIL:
            return{
                ...state
            }
        case POST_FAIL:
            return{
                ...state,
                posts:null
            }
        default:
            return state
    }
}