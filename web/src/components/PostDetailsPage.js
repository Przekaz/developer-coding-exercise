import React from 'react'
import {Link} from "react-router-dom";
import ReactMd from 'react-md-file';

//in real project this would be environment variable
const api = 'http://localhost:3001'

class PostDetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        }
        this.loadPostDetails = this.loadPostDetails.bind(this);
    }
    loadPostDetails() {
        fetch(api + `/post/${this.props.postSlug}`)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                this.setState({
                    data: json,
                })
            })
            .catch(console.log);
    }
    componentDidMount() {
        this.loadPostDetails();
    }
    render() {
        let post = this.state.data;
        return (
            <div style={{position: "relative", border: "1px solid #dee2e6", padding: "50px"}}>
                {this.state.data === undefined && <p>
                        Loading...
                </p>}
                {this.state.data && <div>
                    <ReactMd markdown={post.content} />
                    <strong><h5>Tags: </h5>{post.tags.toString()}</strong>
                </div>}
                <br/>
                <Link to='/'>Back to homepage</Link>
            </div>
        )
    }
}

export default PostDetailsPage;