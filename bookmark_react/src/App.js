import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import NewBookmark from "./components/NewBookmark.js";
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
  }
  async componentDidMount() {
    const response = await axios(`${baseURL}/bookmarks`);
    const data = response.data.foundBookmarks;
    await this.setState({
      bookmarks: data,
      apiIsLoaded: true
    });
    console.log(data);
  }

  //ADD BOOKMARK
  handleAddBookmark(bookmark) {
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark]
    });
  }

  //DELETE BOOKMARK
  async deletedbookmark(id) {
    await axios.delete(`${baseURL}/bookmarks/${id}`);
    const filteredBookmarks = this.state.bookmarks.filter(bookmark => {
      return bookmark._id !== id;
    });
    this.setState({
      bookmarks: filteredBookmarks
    });
  }

  //SHOW ALL BOOKMARKS
  showAllBookmarks() {
    return this.state.bookmarks.map(bookmark => {
      return (
        <div>
          <li key={bookmark._id}>{bookmark.title}</li>
        </div>
      );
    });
  }

  render() {
    const renderBookmarks = this.state.apiIsLoaded ? (
      this.showAllBookmarks()
    ) : (
      <p>Still Loading...</p>
    );
    return (
      <div>
        <h1>Bookmark</h1>
        <NewBookmark handleAddBookmark={this.handleAddBookmark} />
        <ul>{renderBookmarks}</ul>
      </div>
    );
  }
}

export default App;
