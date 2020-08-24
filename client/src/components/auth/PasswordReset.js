import React from 'react'
import { connect } from 'react-redux'
import { Redirect,withRouter} from 'react-router-dom'

class PasswordReset extends React.Component{
    state = {
        email:'',
        password:'',
        password2:'',
    }
    onChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit = e => {
        e.preventDefault()
        const {email,password,password2} = this.state
        console.log(email,password,password2)
        const newUser = {
            email,password,password2
        }
        // this.props.register(newUser)
        this.props.history.push('/login/')
    }
    render(){
        if (this.props.isAuthenticated){
            return <Redirect to="/" />
        }
        const {email,password,password2} = this.state
        return(
            <section>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" required value={email} name="email" onChange={this.onChange}/>
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
export default connect(mapStateToProps,{})(withRouter( PasswordReset) )