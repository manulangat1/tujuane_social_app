import { LOGIN_SUCCESS,REGISTER_SUCCESS,AUTH_FAIL,USER_LOADED,LOGOUT_SUCCESS} from '../actions/types'
const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    isLoading:false,
    user:null
}

export default function(state=initialState,action){
    switch(action.type){
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
            return{
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