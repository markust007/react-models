import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Customer from './components/Customer';
import ConvoButton from './components/ConvoButton';
import Feedback from './components/Feedback';
import NextBtn from './components/NextBtn';
import FinishBtn from './components/FinishBtn';
import Final from './components/Final';
import Gauge from './components/Gauge';
import axios from 'axios';
import './Conversation.css';

var json = './static/data/convo.json';

class Conversation extends Component {


  constructor(props) {
    super(props)
    this.state = {
      screen: 1,
      id: 0,
      feedback: false,
      disabled: false,
      tryAgain: false,
      feedtext: "",
      response: "",
      finish: false,
      nextBtn: false,
      gauge: 0,
      items: null,
      alt1: false,
      alt2: false,
      alt3: false,
      alt1correct: false,
      alt2correct: false,
      alt3correct: false
    };
    // Bind it in the onClick event makes e.target happen
    // this.select = this.select.bind(this);
  }

  componentDidMount(){
    this.fetchData()
  }



  fetchData() {
    axios.get(json)
    .then(response => {
      this.setState({ items: response.data, response: response.data.conversation[0].startStatement })
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
    this.setState({ disabled: false })
    this.setState({ feedback: false })
    this.setState({ feedtext: "" })
    this.setState({ alt1: false })
    this.setState({ alt2: false })
    this.setState({ alt3: false })
    this.setState({ alt1correct: false })
    this.setState({ alt2correct: false })
    this.setState({ alt3correct: false })
    setTimeout(() => {
      this.setState({ response: this.state.items.conversation[this.state.id].startStatement})
    }, 50)
  }

  tryAgain() {
    this.setState({ disabled: false })
    this.setState({ feedback: false })
    this.setState({ feedtext: "" })

    if(this.state.id === 0) {
      this.setState({ response: this.state.items.conversation[0].startStatement })
    }
    if(this.state.id === 1) {
      this.setState({ response: this.state.items.conversation[1].startStatement })
    }
    if(this.state.id === 2) {
      this.setState({ response: this.state.items.conversation[2].startStatement })
    }

    this.setState({ tryAgain: false })
  }

  gaugeUp() {
    let $length = this.state.items.conversation.length
    let $value = 100 / $length
    this.setState({ gauge: this.state.gauge + $value })
  }

  select(e) {
    let $this = e.target
    let $length = this.state.items.conversation.length - 1
    let $correctAnswers = this.state.items.conversation[this.state.id].correctAnswers
    console.log($length)
    console.log($this.value)
    console.log($correctAnswers)
    this.setState({ feedback: true })
    this.setState({ disabled: true })

    if ($this.value == $correctAnswers) {
      this.gaugeUp()
      if (this.state.id == $length) {
        // this.$store.commit('navRightOn')

        this.setState({ nextBtn: false })
      } else {
        this.setState({ nextBtn: true })
      }
    } else {
      this.setState({ tryAgain: true })
    }

    switch(true) {
      case $this.value == "1":
        this.setState({ feedtext: this.state.items.conversation[this.state.id].choice1Feedback })
        this.setState({ response: this.state.items.conversation[this.state.id].choice1Response })
        this.setState({ feedimage: this.state.items.conversation[this.state.id].choice1Image })
        this.setState({ alt1: true })
        this.alt1 = true
        if ($this.value == $correctAnswers) {
          this.setState({ alt1correct: true })
        }
          break;
      case $this.value == "2":
        this.setState({ feedtext: this.state.items.conversation[this.state.id].choice2Feedback })
        this.setState({ response: this.state.items.conversation[this.state.id].choice2Response })
        this.setState({ feedimage: this.state.items.conversation[this.state.id].choice2Image })
        this.setState({ alt2: true })
        this.alt1 = true
        if ($this.value == $correctAnswers) {
          this.setState({ alt2correct: true })
        }
          break;
      case $this.value == "3":
        this.setState({ feedtext: this.state.items.conversation[this.state.id].choice3Feedback })
        this.setState({ response: this.state.items.conversation[this.state.id].choice3Response })
        this.setState({ feedimage: this.state.items.conversation[this.state.id].choice3Image })
        this.setState({ alt3: true })
        this.alt3 = true
        if ($this.value == $correctAnswers) {
          this.setState({ alt3correct: true })
        }
          break;
      default:
          console.log("nothing here")
    }
  }

  render() {
    return (
      <div className="animated fadeIn" style={{width: '100%'}}>
        { this.state.items && this.state.screen === 1 ?
        <div>
          <Customer customer={this.state.response}/>
          <div ref="buttons" className="buttons">
            <ConvoButton button={this.state.items.conversation[this.state.id].choice1} key={this.state.items.conversation[this.state.id].choice1} value="1" disabled={this.state.disabled} alt={this.state.alt1} altcorrect={this.state.alt1correct} select={this.select.bind(this)} />

            <ConvoButton button={this.state.items.conversation[this.state.id].choice2} key={this.state.items.conversation[this.state.id].choice2} value="2" disabled={this.state.disabled} alt={this.state.alt2} altcorrect={this.state.alt2correct} select={this.select.bind(this)} />

            <ConvoButton button={this.state.items.conversation[this.state.id].choice3} key={this.state.items.conversation[this.state.id].choice3} value="3" disabled={this.state.disabled} alt={this.state.alt3} altcorrect={this.state.alt3correct} select={this.select.bind(this)} />

          </div>
          {this.state.feedback && <Feedback feedback={this.state.feedtext}/>}
          {this.state.nextBtn && <NextBtn next={this.next.bind(this)} button="Next"/>}
          {this.state.tryAgain && <NextBtn next={this.tryAgain.bind(this)} button="Try Again"/>}
          {this.state.finish && <FinishBtn finish={this.finish.bind(this)}/>}
          <Gauge width={this.state.gauge}/>
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

// Conversation.propTypes = {
//   message: PropTypes.string.isRequired
// }

export default Conversation;
