import { LOGIN_SUCCESS,REGISTER_SUCCESS,AUTH_FAIL} from '../actions/types'
const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    isLoading:false,
    user:null
}

export default function(state=initialState,action){
    switch(action.type){
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return{
                ...state,
                ...action.payload,
                isAuthenticated:false,
                isLoading:false
            }
        case REGISTER_SUCCESS:
            return{
                token:null,
                isAuthenticated:null,
                isLoading:false,
                user:null
            }
        case AUTH_FAIL:
            localStorage.removeItem('token')
            return{
                token:null,
                isAuthenticated:null,
                isLoading:false,
                user:null 
            }
        default:
            return state
    }
}