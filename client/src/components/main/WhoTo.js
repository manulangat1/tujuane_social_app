import React from 'react'
import {connect } from 'react-redux'
import {whoTo } from '../../actions/auth'

class WhoTo extends React.Component {
    componentDidMount(){
        this.props.whoTo()
        // console.log(this.props.posts)
    }
    render(){
        const isP = (
            <section>
            {
                this.props.who.map(post => (
                    <div key={post._id}>
                        <h1>{post.email}</h1>
                        <p>{post.username}</p>
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
export default connect(mapStateToProps,{whoTo})(WhoTo)