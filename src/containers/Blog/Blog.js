import React, { Component } from "react";
import axios from "axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
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
      this.setState({ error: true });
    }
  }

  postSelectedHandler = selectedPostId => {
    this.setState({ selectedPostId });
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
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
