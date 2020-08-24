import React from 'react'
import { NavLink} from 'react-router-dom'
import  { connect } from 'react-redux'
import { logOut} from '../../actions/auth'
class Navbar extends React.Component{

    render(){
        const guestLink = (
            <ul>
                    <li><NavLink to='/login/'>Login</NavLink> </li>
                    <li><NavLink to='/register/'>Register</NavLink> </li>
                </ul>
        )
        const authLink = (
            <ul>
                    <li><NavLink to='/'>Home</NavLink> </li>
                    <li> <button  onClick={this.props.logOut} className="btn-danger btn-sm">Logout</button> </li>
                </ul>
        )
        const { isAuthenticated} = this.props
        return(
            <nav>
                { isAuthenticated ? authLink:guestLink }
            </nav>

        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{logOut}) (Navbar)