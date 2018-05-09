import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Question from './components/Question';
import QuizButton from './components/QuizButton';
import Feedback from './components/Feedback';
import NextBtn from './components/NextBtn';
import FinishBtn from './components/FinishBtn';
import Final from './components/Final';
import axios from 'axios';
import './Quiz.css';

var json = './static/data/quiz.json';

class Quiz extends Component {


  constructor(props) {
    super(props)
    this.state = {
      screen: 1,
      id: 0,
      feedback: false,
      disabled: false,
      correct: 0,
      incorrect: 0,
      feedtext: "",
      questions: true,
      finish: false,
      nextBtn: false,
      items: null
    };
    // Bind it in the onClick event makes e.target happen
    // this.select = this.select.bind(this);
  }

  componentWillMount(){
    this.fetchData()
  }

  fetchData() {
    axios.get(json)
    .then(response => {
      this.setState({ items: response.data })
    })
    .catch(error => {
      console.log(error);
    })
  }

  finish() {
    this.setState({ screen: 2 })
  }

  next() {
    this.setState({ id: this.state.id + 1 })
    this.setState({ nextBtn: false })
    this.setState({ questions: false })
    this.setState({ feedback: false })
    this.setState({ disabled: false })
    let $buttons = this.refs.buttons.querySelectorAll('button')
    for(let i = 0; i < $buttons.length; i++){
      let $button = this.refs.buttons.querySelectorAll('button')[i]
      $button.classList.remove('correct')
      $button.classList.remove('checked')
    }
  }

  tryAgain() {
    this.setState({ screen: 1 })
    this.setState({ id: 0 })
    this.setState({ questions: true })
    this.setState({ disabled: false })
    this.setState({ feedback: false })
    this.setState({ feedtext: "" })
    this.setState({ nextBtn: false })
    this.setState({ correct: 0 })
    this.setState({ incorrect: 0 })
    this.setState({ finish: false })
  }

  select(e) {
    let $this = e.target
    let $length = this.state.items.quiz.length - 1
    console.log($length)
    console.log($this.value)
    console.log(this.state.items.quiz[this.state.id].correctAnswer)
    this.setState({
      feedback: true
    })
    this.setState({
      disabled: true
    })

    setTimeout(() => {
      $this.classList.add('checked')
    }, 50);

    console.log($this)

    if (this.state.id == $length) {
      if ($this.value == this.state.items.quiz[this.state.id].correctAnswer) {
        this.setState({
          correct: this.state.correct + 1
        })
        this.setState({
          feedtext: this.state.items.quiz[this.state.id].correct
        })
        // this.$store.commit('nav9Done');
        // this.$store.commit('nav9bDone')

      } else {
        this.setState({
          incorrect: this.state.incorrect + 1
        })
        this.setState({
          feedtext: this.state.items.quiz[this.state.id].incorrect
        })
      }
      this.setState({
        questions: false
      })
      this.setState({
        finish: true
      })

    } else {
      if ($this.value == this.state.items.quiz[this.state.id].correctAnswer) {
        this.setState({
          correct: this.state.correct + 1
        })
        this.setState({
          feedtext: this.state.items.quiz[this.state.id].correct
        })

      } else {
        this.setState({
          incorrect: this.state.incorrect + 1
        })
        this.setState({
          feedtext: this.state.items.quiz[this.state.id].incorrect
        })
      }
      this.setState({
        nextBtn: true
      })
      this.setState({
        questions: false
      })
    }
    let $buttons = this.refs.buttons.querySelectorAll('button')
    for(var i = 0; i < $buttons.length; i++){

      let $button = this.refs.buttons.querySelectorAll('button')[i]

      if ($button.value.includes(this.state.items.quiz[this.state.id].correctAnswer)) {
        setTimeout(() => {
          $button.classList.add('correct')
        }, 100);
      }
    }
  }

  render() {
    return (
      <div className="animated fadeIn" style={{width: '100%'}}>
        { this.state.items && this.state.screen === 1 ?
        <div>
          <Question question={this.state.items.quiz[this.state.id].question}/>
          <div ref="buttons" className="buttons">
            <QuizButton button={this.state.items.quiz[this.state.id].button1} key={this.state.items.quiz[this.state.id].button1} value="1" disabled={this.state.disabled} select={this.select.bind(this)} />

            <QuizButton button={this.state.items.quiz[this.state.id].button2} key={this.state.items.quiz[this.state.id].button2} value="2" disabled={this.state.disabled} select={this.select.bind(this)} />

            <QuizButton button={this.state.items.quiz[this.state.id].button3} key={this.state.items.quiz[this.state.id].button3} value="3" disabled={this.state.disabled} select={this.select.bind(this)} />

            <QuizButton button={this.state.items.quiz[this.state.id].button4} key={this.state.items.quiz[this.state.id].button4} value="4" disabled={this.state.disabled} select={this.select.bind(this)} />
          </div>
          {this.state.feedback && <Feedback feedback={this.state.feedtext}/>}
          {this.state.nextBtn && <NextBtn next={this.next.bind(this)}/>}
          {this.state.finish && <FinishBtn finish={this.finish.bind(this)}/>}
        </div>
        :null}

        { this.state.screen === 2 ?
        <div>
          <Final correct={this.state.correct} passing={this.state.items.quiz[0].finalPassing} failing={this.state.items.quiz[0].finalFailing} tryAgain={this.tryAgain.bind(this)} />
        </div>
        :null}
      </div>
    );
  }
}

// Quiz.propTypes = {
//   message: PropTypes.string.isRequired
// }

export default Quiz;
