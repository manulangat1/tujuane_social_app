import { POST_FAIL,POST_SUCCESS} from '../actions/types'


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
        case POST_FAIL:
            return{
                ...state,
                posts:null
            }
        default:
            return state
    }
}