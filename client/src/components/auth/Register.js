import React from 'react'
import { connect } from 'react-redux'
import { NavLink} from 'react-router-dom'

class Register extends React.Component{
    state = {
        username:'',
        email:'',
        password:'',
        password2:'',
    }
    render(){
        const {email,password,password2,username} = this.state
        return(
            <section>
                <p className="center">Register Here</p>
                <form>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" required value={email} name="email"/>
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" required value={username} name="username"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" required value={password} name="password"/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" required value={password2} name="password2"/>
                    </div>
                    <input type="submit" value="Sign Up" className="btn-sm btn-primary" />
                    
                    <p>Already signed up? Register <NavLink to="/login/" >here</NavLink></p>
                </form>
            </section>
        )
    }
}
export default Register