import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import NewBookmark from "./components/NewBookmark.js";
const baseURL = "http://localhost:3003";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: []
    };
    this.deletedbookmark = this.deletedbookmark.bind(this);
  }
  async componentDidMount() {
    const response = await axios(`${baseURL}/bookmarks`);
    const data = response.data;
    this.setState({
      bookmarks: data
    });
    console.log(data);
  }
  handleAddBookmark(bookmark) {
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
        <NewBookmark />
      </div>
    );
  }
}

export default App;
