import React from 'react'
import { connect } from 'react-redux'
import { NavLink,Redirect} from 'react-router-dom'
import { register } from '../../actions/auth'
class Register extends React.Component{
    state = {
        username:'',
        email:'',
        password:'',
        password2:'',
    }
    onChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit = e => {
        e.preventDefault()
        const {email,password,password2,username} = this.state
        console.log(email,password,password2,username)
        const newUser = {
            email,password,password2,username
        }
        this.props.register(newUser)
    }
    render(){
        if (this.props.isAuthenticated){
            return <Redirect to="/" />
        }
        const {email,password,password2,username} = this.state
        return(
            <section>
                <p className="center">Register Here</p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" required value={email} name="email" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" required value={username} name="username" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" required value={password} name="password" onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" required value={password2} name="password2" onChange={this.onChange}/>
                    </div>
                    <input type="submit" value="Sign Up" className="btn-sm btn-primary" />
                    
                    <p>Already signed up? Register <NavLink to="/login/" >here</NavLink></p>
                </form>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{register})(Register) 