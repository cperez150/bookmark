import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
const baseURL = "http://localhost:3003";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: []
    };
  }
  async componentDidMount() {
    const response = await axios(`${baseURL}/bookmarks`);
    const data = response.data;
    this.setState({
      bookmarks: data
    });
    console.log(data);
  }
  render() {
    return (
      <div>
        <h1>Bookmark</h1>
      </div>
    );
  }
}

export default App;
