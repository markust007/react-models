import React, { Component } from 'react';

import Stateless from '../components/Stateless';
import StatelessClass from '../components/StatelessClass';
import Stateful from '../components/Stateful';
import Navigation from '../components/Navigation';
import Title from '../components/Title';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'

import Quiz from '../components/quiz/Quiz';
import Conversation from '../components/convo/Conversation';
import MultiChoice from '../components/multiChoice/MultiChoice';
import DragDrop from '../components/dragDrop/DragDrop';

const classNames = require('classnames');

class Container extends Component {

  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      path: "",
      drawer: true,
      direction: {
        back: "Back",
        next: "Next"
      }
    }
    this.jump = this.jump.bind(this);
  }

  componentDidMount() {
    this.getPath();
  }

  back() {
    if(this.state.page === 1) {
      console.log(this.state.page)
    } else {
      this.setState({page: this.state.page - 1})
    }
  }

  next() {
    if(this.state.page === 4) {
      console.log(this.state.page)
    } else {
      this.setState({page: this.state.page + 1})
    }
  }

  jump(x) {
    this.setState({page: x})
  }

  closeDrawer() {
    this.setState({drawer: this.state.drawer = !this.state.drawer})
  }
  getPath() {
    setTimeout(() => {
      var currentPath = window.location.pathname
      if (currentPath === "/") {
        this.setState({path: "Quiz Model"})
      }
      if (currentPath === "/conversation") {
        this.setState({path: "Conversation Model"})
      }
      if (currentPath === "/multichoice") {
        this.setState({path: "Multiple Choice Model"})
      }
      if (currentPath === "/dragdrop") {
        this.setState({path: "Drag and Drop Model"})
      }
      console.log(currentPath)
    }, 50)
  }


  render() {
    return (
      <Router>
      <div className="main">
        <div style={{width:'100%'}}>
        <Title title={this.state.path} />
        <Route path="/" exact component={Quiz} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/conversation" component={Conversation} />
        <Route path="/multichoice" component={MultiChoice} />
        <Route path="/dragdrop" component={DragDrop} />
        </div>
        {/* { this.state.page === 1 && <Quiz /> }
        { this.state.page === 2 && <Conversation /> }
        { this.state.page === 3 && <MultiChoice /> }
        { this.state.page === 4 && <DragDrop /> } */}
        <ul className={ classNames('nav', {close: !this.state.drawer}) }>
          <li className="close" onClick={ () => {this.closeDrawer()} }><div className={ classNames({turn: this.state.drawer}) }>+</div></li>
          {/* <Navigation click={this.back.bind(this)} direction={this.state.direction.back} />
          <Navigation click={this.next.bind(this)} direction={this.state.direction.next} /> */}
          {/* <Navigation click={ () => {this.jump(1)} } direction="Quiz Model" />
          <Navigation click={ () => {this.jump(2)} } direction="Conversation Model" />
          <Navigation click={ () => {this.jump(3)} } direction="Multiple Choice" />
          <Navigation click={ () => {this.jump(4)} } direction="Drag and Drop" /> */}
          <li><NavLink exact activeClassName="active" to="/" onClick={ () => {this.getPath()} }>Quiz Model</NavLink></li>
          <li><NavLink activeClassName="active" to="/conversation" onClick={ () => {this.getPath()} }>Conversation Model</NavLink></li>
          <li><NavLink activeClassName="active" to="/multichoice" onClick={ () => {this.getPath()} }>Multiple Choice</NavLink></li>
          <li><NavLink activeClassName="active" to="/dragdrop" onClick={ () => {this.getPath()} }>Drag and Drop</NavLink></li>
        </ul>
      </div>
    </Router>
    );
  }

}

export default Container;
