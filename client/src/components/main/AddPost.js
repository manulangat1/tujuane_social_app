import React from 'react'
import  { connect } from 'react-redux'
import  { addPost} from '../../actions/post'
class AddPost extends React.Component{
    state = {
        body:''
    }
    onChange = e => this.setState({[e.target.name]:e.target.value})
    onSubmit = e => {
        e.preventDefault()
        const { body } = this.state
        this.props.addPost(body)
        this.setState({
            body:''
        })
    }
    render(){
        const {body } = this.state
        return(
            <section>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>What are you thinking of today?</label>
                        <input type="text" name="body" value={body} className="form-control" required onChange={this.onChange}/>
                    </div>
                    <input type="submit" Value="Let see it" className="btn-success" />
                </form>
            </section>
        )
    }
}
const mapStateToProps = state => ({
    auth:state.auth
})
export default connect(mapStateToProps,{addPost})(AddPost)