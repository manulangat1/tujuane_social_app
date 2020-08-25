import { LOGIN_SUCCESS,REGISTER_SUCCESS,AUTH_FAIL,USER_LOADED,LOGOUT_SUCCESS,RESET_PASSWORD,
    RESEND_EMAIL, POST_FOLLOW,POST_FOLLOW_FAIL} from '../actions/types'
const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    isLoading:false,
    user:null,
    whoF:[]
}

export default function(state=initialState,action){
    switch(action.type){
        case POST_FOLLOW:
            return{
                ...state,
                whoF:action.payload
            }
        case POST_FOLLOW_FAIL:
            return{
                ...state,
                whoF:null
            }
        case USER_LOADED:
            return{
                ...state,
                user:action.payload,
                isAuthenticated:true,
                isLoading:false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return{
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isLoading:false
            }
        case REGISTER_SUCCESS:
        case RESET_PASSWORD:
        case RESEND_EMAIL:
            return{
                ...state,
                token:null,
                isAuthenticated:null,
                isLoading:false,
                user:null
            }
        case AUTH_FAIL:
        case LOGOUT_SUCCESS:
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