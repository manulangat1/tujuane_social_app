import React from 'react'

import Post from './Post'
import WhoTo from './WhoTo'
import AddPost from './AddPost'

class Dashboard extends React.Component {
    render(){
        return (
            <main>
                <AddPost />
                <hr></hr>
                <Post />
                <hr></hr>
                <WhoTo />
                </main>
        )
    }
}
export default Dashboard