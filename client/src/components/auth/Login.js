import React from 'react'
import { connect } from 'react-redux'


class Login extends React.Component{
    state = {
        email:'',
        password:''
    }
    render(){
        const {email,password,} = this.state
        return(
            <section>
                <p className="center">Login Here</p>
                <form>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" required value={email} name="email"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" required value={password} name="password"/>
                    </div>
                    <input type="submit" value="Sign in" className="btn-lg btn-success" />
                </form>
            </section>
        )
    }
}
export default Login