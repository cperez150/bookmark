import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import NewBookmark from "./components/NewBookmark.js";
import EditBookmark from "./components/EditBookmark.js";
import "./css/normalize.css";
// import "./css/skeleton.css";
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
    this.handleEditBookmark = this.handleEditBookmark.bind(this);
  }
  async componentDidMount() {
    this.getBookmarks();
  }
  async getBookmarks() {
    const response = await axios(`${baseURL}/bookmarks`);
    const data = response.data.foundBookmarks;

    this.setState({
      bookmarks: data
    });
    console.log(data);
  }

  //ADD BOOKMARK
  handleAddBookmark(bookmark) {
    console.log(bookmark);
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark]
    });
  }

  //DELETE BOOKMARK
  //EDIT
  handleEditBookmark(bookmrk) {
    const id = bookmrk._id;
    console.log("this is the new book mark" + bookmrk.title);
    const filteredBookmarks = this.state.bookmarks.map(bookmark => {
      if (bookmark._id === id) {
        return bookmrk;
      } else {
        return bookmark;
      }
    });
    this.setState({
      bookmarks: filteredBookmarks
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
    return (
      <div>
        <h1>Bookmark</h1>
        <NewBookmark handleAddBookmark={this.handleAddBookmark} />
        <ul>
          {this.state.bookmarks.map(bookmark => {
            return (
              <div key={bookmark._id} className="li_div">
                <p>
                  <a href={bookmark.url} target="_blank">
                    {bookmark.title}
                  </a>
                </p>

                <p onClick={() => this.deletedbookmark(bookmark._id)}>X</p>
                {/* <p onClick={this.editBookmark}>edit</p> */}
                <EditBookmark
                  bookmark={bookmark}
                  handleEditBookmark={this.handleEditBookmark}
                />
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
