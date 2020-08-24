import React from 'react'
import { connect } from 'react-redux'
import { Redirect,withRouter,NavLink} from 'react-router-dom'
import {resend} from '../../actions/auth'
class Resend extends React.Component{
    state = {
        email:''
    }
    onChange = e => {
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit = e => {
        e.preventDefault()
        const {email} = this.state
        console.log(email)

        this.props.resend(email)
        this.props.history.push('/login/')
    }
    render(){
        if (this.props.isAuthenticated){
            return <Redirect to="/" />
        }
        const {email} = this.state
        return(
            <section>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" required value={email} name="email" onChange={this.onChange}/>
                    </div>
                    <input type="submit" value="Resend" className="btn-sm btn-primary" />
                    
                    <p>Already signed up? Login <NavLink to="/login/" >here</NavLink></p>
                </form>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{resend})(withRouter( Resend) )