import React, { Component } from "react";
import axios from "axios";
import "../App.css";
const baseURL = "http://localhost:3003";

class NewBookmark extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      url: ""
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleURLChange = this.handleURLChange.bind(this);
  }
  handleTitleChange(event) {
    this.setState({ title: event.currentTarget.value });
  }
  handleURLChange(event) {
    this.setState({ url: event.currentTarget.value });
  }
  async handleSubmit(event) {
    event.preventDefault();

    const response = await axios.post(`${baseURL}/bookmarks`, {
      title: this.state.title,
      url: this.state.url
    });

    this.setState({ title: "", url: "" });
    this.props.handleAddBookmark(response.data);
  }

  render() {
    return (
      <form class="newBookmark" onSubmit={this.handleSubmit}>
        <label htmlFor="title"></label>
        <input
          class="newChild1"
          type="text"
          id="title"
          name="title"
          onChange={this.handleTitleChange}
          value={this.state.title}
          placeholder="add title"
        />
        <label htmlFor="url"></label>
        <input
          class="newChild2"
          type="text"
          id="url"
          name="url"
          onChange={this.handleURLChange}
          value={this.state.url}
          placeholder="add url"
        />
        <input class="newChild3" type="submit" value="Add a Bookmark" />
      </form>
    );
  }
}

export default NewBookmark;
