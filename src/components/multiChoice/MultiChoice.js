import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Question from './components/Question';
import MultiButton from './components/MultiButton';
import Feedback from './components/Feedback';
import SubmitBtn from './components/SubmitBtn';
import axios from 'axios';
import './MultiChoice.css';

var json = './static/data/multi.json';

let newValue = []

class MultiChoice extends Component {


  constructor(props) {
    super(props)
    this.state = {
      checkValue: [],
      feedback: false,
      disabled: false,
      feedtext: "",
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

  change(e) {
    let $this = e.target
    $this.parentNode.classList.toggle('checked')
    let $value = Number($this.value)
    let $index = newValue.includes($value)
    console.log($index)
    console.log($value)
    let $splice = newValue.indexOf($value)
    if($index) {
      newValue.splice($splice, 1)
      this.setState({ checkValue: newValue })
      console.log(newValue)
      console.log(this.state.checkValue)
    } else {
      newValue.push($value)
      this.setState({ checkValue: newValue })
      console.log(newValue)
      console.log(this.state.checkValue)
    }
  }

  submit(e) {
    // this.$store.commit('navRightOn')
    let $this = e.target
    let $theValue = this.state.checkValue.sort().join(", ");
    let $correctAnswers = this.state.items.multi[0].correctAnswers

    if($theValue == $correctAnswers) {
      this.setState({ feedtext: this.state.items.multi[0].correct })
      this.setState({ feedback: true })
    } else {
      this.setState({ feedtext: this.state.items.multi[0].incorrect })
      this.setState({ feedback: true })
    }

      let $checks = this.refs.checkboxes.querySelectorAll('label')
      for(var i = 0; i < $checks.length; i++){
        let $input = this.refs.checkboxes.querySelectorAll('label')[i].querySelectorAll('input')[0]
        this.refs.checkboxes.querySelectorAll('label')[i].classList.add('disabled')

        if ($correctAnswers.includes($input.value)) {
          this.refs.checkboxes.querySelectorAll('label')[i].classList.add('correct')
        } else {
          if (this.refs.checkboxes.querySelectorAll('label')[i].classList.contains('checked')) {
            this.refs.checkboxes.querySelectorAll('label')[i].classList.add('incorrect')
          }
        }
        this.refs.checkboxes.querySelectorAll('label')[i].classList.remove('checked');
      }
  }

  render() {
    return (
      <div className="animated fadeIn" style={{width: '100%'}}>
        { this.state.items ?
        <div>
          <Question question={this.state.items.multi[0].question}/>
          <div ref="checkboxes" className="selects">
            { this.state.items.multi.map((item) =>
              <MultiButton text={item.button} key={item.button} value={item.value} disabled={this.state.disabled} change={this.change.bind(this)} />
            )}
          </div>
          <SubmitBtn submit={this.submit.bind(this)} />
          {this.state.feedback && <Feedback feedback={this.state.feedtext}/>}
        </div>
        :null}
      </div>
    );
  }
}

// MultiChoice.propTypes = {
//   message: PropTypes.string.isRequired
// }

export default MultiChoice;
