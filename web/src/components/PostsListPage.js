import React from 'react'
import { Link } from "react-router-dom"

//in real project this would be environment variable
const api = 'http://localhost:3001'

class PostsListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        }
        this.loadPosts = this.loadPosts.bind(this);
    }
    loadPosts() {
        fetch(api + '/posts')
            .then(res => res.json())
            .then((json) => {
                console.log(json)
                this.setState({
                    data: json
                })
            })
            .catch(console.log);
    }
    componentDidMount() {
        this.loadPosts();
    }
    render() {
        let posts = this.state.data;
        return (
            <div>
                <center><h5>Currently trending</h5></center>
                {this.state.data === undefined && <p>
                    Loading...
                </p>}
                {this.state.data && <ul>
                        {posts.map((post) => <li key={post.slug}>
                            <Link to={"posts/" + post.slug}>{post.title}</Link>
                        </li>)}
                    </ul>}
            </div>
        )
    }
}

export default PostsListPage;