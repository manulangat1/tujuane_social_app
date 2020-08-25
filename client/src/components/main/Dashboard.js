import React from 'react'

import Post from './Post'
import WhoTo from './WhoTo'

class Dashboard extends React.Component {
    render(){
        return (
            <main>
                <Post />
                <hr></hr>
                <WhoTo />
                </main>
        )
    }
}
export default Dashboard