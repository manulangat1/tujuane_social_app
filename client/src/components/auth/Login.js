import React from 'react'
import { connect } from 'react-redux'
import { NavLink,Redirect} from 'react-router-dom'
import { login } from '../../actions/auth'


class Login extends React.Component{
    state = {
        email:'',
        password:''
    }
    onChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit = e => {
        e.preventDefault()
        const {email,password} = this.state
        console.log(email,password)
        this.props.login(email,password)
    }
    componentDidMount(){
        console.log(this.props.isAuthenticated)
    }
    render(){
        if (this.props.isAuthenticated){
            return <Redirect to="/" />
        }
        const {email,password,} = this.state
        return(
            <section>
                <p className="center">Login Here</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" required value={email} name="email" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" required value={password} name="password" onChange={this.onChange}/>
                    </div>
                    <input type="submit" value="Sign in" className="btn-lg btn-success" />
                    <p>Not signed up? Register <NavLink to="/register/" >here</NavLink></p>
                    <p>Forgot password Reset <NavLink to="/reset/" >here</NavLink></p>
                    <p>Get activation token<NavLink to="/resend/" >here</NavLink></p>
                </form>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{login})(Login) 