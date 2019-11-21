import React, { Component } from "react";
import axios from "axios";
import "../App.css";
const baseURL = "http://localhost:3003";

class EditBookmark extends Component {
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
    const Title = this.state.title
      ? this.state.title
      : this.props.bookmark.title;

    const URL = this.state.url ? this.state.url : this.props.bookmark.url;
    const response = await axios.put(
      `${baseURL}/bookmarks/${this.props.bookmark._id}`,
      {
        title: Title,
        url: URL
      }
    );

    this.setState({ title: "", url: "" });
    this.props.handleEditBookmark(response.data);
  }
  render() {
    return (
      <div>
        <form className="editForm" onSubmit={this.handleSubmit}>
          <label htmlFor="title"></label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={this.handleTitleChange}
            value={this.state.title}
            placeholder={this.props.bookmark.title}
          />
          <label htmlFor="url"></label>
          <input
            type="text"
            id="url"
            name="url"
            onChange={this.handleURLChange}
            value={this.state.url}
            placeholder={this.props.bookmark.url}
          />
          <input class="editBtn" type="submit" value="Edit" />
        </form>
      </div>
    );
  }
}

export default EditBookmark;
