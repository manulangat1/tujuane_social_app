import React from 'react'
import {connect } from 'react-redux'
import {getPostById } from '../../actions/post'

class PostDetails extends React.Component {
    componentDidMount(){
        if (this.props.id){
            this.props.getPostById(this.props.id)
        }
        // console.log(this.props.posts)
    }
    render(){
        const {post} = this.props
        const isP = (
            <section>
                    <div key={post._id}>
                        <h1>{post.body}</h1>
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
                {post.length >0 ? isP :notP}
                </section>
        )
    }
}
const mapStateToProps = (state,ownProps) => ({
    id:ownProps.match.params.id,
    post:state.post.post
})
export default connect(mapStateToProps,{getPostById})(PostDetails)