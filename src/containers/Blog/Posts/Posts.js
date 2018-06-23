import React, { Component } from "react";
import { Route } from "react-router-dom";

import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import "./Posts.css";
import FullPost from "../FullPost/FullPost";

class Posts extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get("/posts");

      const shortenedPosts = data.slice(0, 4);
      const posts = shortenedPosts.map(post => {
        return { ...post, author: "Marlena" };
      });
      this.setState({ posts });
    } catch (error) {
      console.log(error);
    }
  }

  postSelectedHandler = id => {
    this.props.history.push({ pathname: "/" + id });
  };

  render() {
    let posts = <p styled={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
      ));
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path={this.props.match.url + ":id"} exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;
