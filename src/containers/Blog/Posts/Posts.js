import React, { Component } from "react";

import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import "./Posts.css";

class Posts extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    console.log(this.props);
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
    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;
