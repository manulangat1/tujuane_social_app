import React from 'react'
import {connect } from 'react-redux'
import {withRouter } from 'react-router-dom'
import {getPostById,deletePost } from '../../actions/post'

class PostDetails extends React.Component {
    componentDidMount(){
        if (this.props.id){
            this.props.getPostById(this.props.id)
        }
    }
    render(){
        const {post,auth,history} = this.props
        const updateBtn = (
            <div>
                <button className="btn-info">Update</button>
                <button className="btn-danger" onClick={() => this.props.deletePost(post._id,history)}>Delete</button>
            </div>
        )
        const isP = (
            <section>
                    <div key={post._id}>
                        <h1>{post.body}</h1>
                        {post.author = auth.user._id  ? updateBtn : ''}
                    </div>
            </section>
        )
        const notP = (
            <div>
                <p>No posts at the moment</p>
            </div>
        )
        return (
            <section>
                {post  ? isP :notP}
                </section>
        )
    }
}
const mapStateToProps = (state,ownProps) => ({
    id:ownProps.match.params.id,
    post:state.post.post,
    auth:state.auth
})
export default connect(mapStateToProps,{getPostById,deletePost})(withRouter(PostDetails))