import React, { Component } from "react";

import axios from "../../axios";
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
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/new-post">New Post</a>
              </li>
            </ul>
          </nav>
        </header>
        <section className="Posts">{posts}</section>
      </div>
    );
  }
}

export default Blog;
