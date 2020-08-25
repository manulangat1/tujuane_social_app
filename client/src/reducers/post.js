import { POST_FAIL,POST_SUCCESS,  ADD_POST,ADD_POST_FAIL} from '../actions/types'


const initialState = {
    posts:[]
}
export default function(state=initialState,action){
    switch(action.type){
        case POST_SUCCESS:
            return{
                ...state,
                posts:action.payload
            }
        case ADD_POST:
            return {
                ...state,
                posts:[action.payload,...state.posts]
            }
        case ADD_POST_FAIL:
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