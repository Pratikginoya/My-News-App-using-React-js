import './App.css';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import About from './components/About';

export default class App extends Component {
  apiKey = process.env.REACT_APP_API_KEY;
  state = {
    progress: 0,
  }
  setProgress = (process)=>{
    this.setState({
      progress: process,
    })
  }
  render() {
    return (
      <Router>
      <div>
        <Navbar title="MyNewsApp"/>
        <LoadingBar
          color='#0C67ED'
          progress={this.state.progress}
          height={5}
          shadow='true'
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} newsPerPage={9} apiKey={this.apiKey}/>} />
          <Route exact path="/about" element={<About setProgress={this.setProgress}/>} />
        </Routes>
      </div>
      </Router>
    )
  }
}

