import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import NewBookmark from "./components/NewBookmark.js";
import EditBookmark from "./components/EditBookmark.js";
import "./css/normalize.css";
// import "./css/skeleton.css";
// import "./css/index.css";
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
  handleAddBookmark(bookmark) {
    console.log(bookmark);
    this.setState({
      bookmarks: [...this.state.bookmarks, bookmark]
    });
  }
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

  render() {
    return (
      <div class="container">
        <header>
          <img class="headimg" src="/images/forlatr.png"></img>
          <h3> Don't have time now? Save it forlatr</h3>
        </header>

        <div>
          <NewBookmark handleAddBookmark={this.handleAddBookmark} />
        </div>
        <div class="bookmarkContainer">
          {this.state.bookmarks.map(bookmark => {
            return (
              <div class="returnedBookmark" key={bookmark._id}>
                <div class="child1">
                  <div class="grandchild1">
                    Visit bookmark: <br />
                    <a href={bookmark.url} target="_blank">
                      {bookmark.title}
                    </a>
                  </div>
                </div>
                <div class="child2">
                  <EditBookmark
                    class="childReturnedBookmark"
                    bookmark={bookmark}
                    handleEditBookmark={this.handleEditBookmark}
                  />
                </div>
                <div
                  class="grandchild2"
                  onClick={() => this.deletedbookmark(bookmark._id)}
                >
                  Delete
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
