import React from 'react'
import {connect } from 'react-redux'
import {loadPosts } from '../../actions/post'

class Post extends React.Component {
    componentDidMount(){
        this.props.loadPosts()
        // console.log(this.props.posts)
    }
    render(){
        const isP = (
            <section>
            {
                this.props.posts.map(post => (
                    <div key={post._id}>
                        <h1>{post.body}</h1>
                    </div>
                ))
            }
            </section>
        )
        const notP = (
            <div>
                <p>No posts at the moment</p>
            </div>
        )
        return (
            <section>
                {this.props.posts ? isP :notP}
                <h1>Hello</h1>
                </section>
        )
    }
}
const mapStateToProps = state => ({
    posts:state.post.posts
})
export default connect(mapStateToProps,{loadPosts})(Post)