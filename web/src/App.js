import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import PostsListPage from './components/PostsListPage';
import PostDetailsPage from "./components/PostDetailsPage";

function BlogPost() {
    let { slug } = useParams();
    return <PostDetailsPage postSlug={slug}/>;
}

class App extends Component {
  render () {
      return (
          <Router>
              <Route exact path="/" component={ Home }/>
              <Switch>
                  <Route path="/posts/:slug" children={<BlogPost />}/>
              </Switch>
          </Router>
      );
  }
}

function Home() {
  return (
      <div style={{position: "relative"}}>
        <div style={{position: "fixed", top: "40%", left: "50%", transform: "translate(-50%, -50%)", border: "1px solid #dee2e6", padding: "50px"}}>
          <h3>Welcome to Przemek's Blog</h3>
          <PostsListPage />
        </div>
      </div>
  );
}

export default App;