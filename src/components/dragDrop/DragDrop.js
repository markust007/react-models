import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Title from './components/Title';
import Drag from './components/Drag';
import Drop from './components/Drop';
import Feedback from './components/Feedback';
import axios from 'axios';
import './DragDrop.css';

var json = './static/data/dragdrop.json';

class MultiChoice extends Component {


  constructor(props) {
    super(props)
    this.state = {
      dragItem: null,
      dragValue: null,
      feedback: false,
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

  dragenter(e) {
    e.preventDefault();
    return true;
  }

  dragover(e) {
    e.preventDefault();
    return true;
  }

  drag(e) {
    let $this = e.target
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text", e.target.id);
    this.setState({ dragItem: document.getElementById($this.id) })
  }

  drop(e) {
    var src = e.dataTransfer.getData("text");

    let orig = this.refs.original
    var $this = e.target

    let $target = document.getElementById($this.id)

    if(this.state.dragItem.value == $target.value) {
      if ($this.hasChildNodes()) {
        if ($this == orig) {
          orig.appendChild(this.state.dragItem)
          this.state.dragItem.style.opacity = 0;
          setTimeout(() => {
            this.state.dragItem.style.opacity = 1;
          }, 500)
        }
      } else {
        $this.appendChild(this.state.dragItem)
      }
    } else {
      orig.appendChild(this.state.dragItem)
      this.state.dragItem.style.opacity = 0;
      setTimeout(() => {
        this.state.dragItem.style.opacity = 1;
      }, 500)
    }

    if (orig.childNodes.length == 0) {
      this.setState({ feedback: true })
      // this.$store.commit('navRightOn')
    }
    e.stopPropagation();
    return false;
  }

  render() {
    return (
      <div className="animated fadeIn" style={{width: '100%'}}>
        { this.state.items ?
        <div>
          <Title title={this.state.items.dragdrop[0].title}/>
          <ul className="drop-area">
            <Drop id="drop1" value="1" reference="drop1" dragenter={this.dragenter.bind(this)} dragover={this.dragover.bind(this)} drop={this.drop.bind(this)} />
            <Drop id="drop2" value="2" reference="drop2" dragenter={this.dragenter.bind(this)} dragover={this.dragover.bind(this)} drop={this.drop.bind(this)} />
            <Drop id="drop3" value="3" reference="drop3" dragenter={this.dragenter.bind(this)} dragover={this.dragover.bind(this)} drop={this.drop.bind(this)} />
            <Drop id="drop4" value="4" reference="drop4" dragenter={this.dragenter.bind(this)} dragover={this.dragover.bind(this)} drop={this.drop.bind(this)} />
          </ul>
          <div ref="original" className="drag-area" onDragEnter={this.dragenter.bind(this)} onDragOver={this.dragover.bind(this)} onDrop={this.drop.bind(this)}>
            { this.state.items.dragdrop.map((item) =>
              <Drag id={item.id} key={item.id} drag={this.drag.bind(this)} value={item.value} text={item.drag} />
            )}
          </div>
          {this.state.feedback && <Feedback feedback={this.state.items.dragdrop[0].feedback}/>}
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
