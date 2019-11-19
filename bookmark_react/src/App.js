import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import NewBookmark from "./components/NewBookmark.js";

import "./css/normalize.css";
import "./css/skeleton.css";
import "./css/index.css";
const baseURL = "http://localhost:3003";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      apiIsLoaded: false
    };
    this.handleAddBookmark = this.handleAddBookmark.bind(this);
    this.deletedbookmark = this.deletedbookmark.bind(this);
    this.getBookmarks = this.getBookmarks.bind(this);
  }
  async componentDidMount() {
    this.getBookmarks();
  }
  async getBookmarks() {
    const response = await axios(`${baseURL}/bookmarks`);
    const data = response.data.foundBookmarks;

    this.setState({
      bookmarks: data,
      apiIsLoaded: true
    });
    console.log(data);
  }
  handleAddBookmark(bookmark) {
    console.log(bookmark);
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark]
    });
  }

  //DELETE
  async deletedbookmark(id) {
    await axios.delete(`${baseURL}/bookmarks/${id}`);
    const filteredBookmarks = this.state.bookmarks.filter(bookmark => {
      return bookmark._id !== id;
    });
    this.setState({
      bookmarks: filteredBookmarks
    });
  }

  render() {
    return (
      <div>
        <h1>Bookmark</h1>
        <NewBookmark handleAddBookmark={this.handleAddBookmark} />
        <ul>
          {this.state.bookmarks.map(bookmark => {
            return (
              <div key={bookmark._id} className="li_div">
                <li>
                  <a href={bookmark.url} target="_blank">
                    {bookmark.title}
                  </a>
                </li>
                <p onClick={() => this.deletedbookmark(bookmark._id)}>X</p>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
