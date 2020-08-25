import React from 'react'
import {connect } from 'react-redux'
import {whoTo,addFollowing } from '../../actions/auth'

class WhoTo extends React.Component {
    componentDidMount(){
        this.props.whoTo()
        // console.log(this.props.posts)
    }
    onClick = (e,id) => {
        const followId = id 
        console.log(id)
        this.props.addFollowing(followId)
        alert("Follow Success")
    }
    render(){
        const isP = (
            <section>
            {
                this.props.who.map(post => (
                    <div key={post._id}>
                        <h1>{post.email}</h1>
                        <p>{post.username}</p>
                        <button className="btn-info bg-midnight p-2" onClick={() => this.props.addFollowing(post._id)}>Follow</button>
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
                {this.props.who ? isP :notP}
                </section>
        )
    }
}
const mapStateToProps = state => ({
    who:state.auth.whoF
})
export default connect(mapStateToProps,{whoTo,addFollowing})(WhoTo)