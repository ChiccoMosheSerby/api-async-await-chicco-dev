import React, { Component } from 'react';

import './App.css';
import TextTransition, { presets } from "react-text-transition";
import { Wave } from 'react-animated-text';
//components----------------------------------------------///////////////////

//end - components----------------------------------------------////////////

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      todayHebrewDate: '',
      ParashaEnglish: '',
      englishHebMonth: '',
      ParashaHebrew: '',
      currentDate: '',
      todayHebrewDate_user: '',
      ParashaEnglish_user: '',
      englishHebMonth_user: '',
      ParashaHebrew_user: '',
      currentDate_user: '',
      today: new Date(),
      // hostVar: ''
      hostVar: 'http://localhost:4000'
    }
    this.updateDate = this.updateDate.bind(this);

  }

  componentDidMount() {
    fetch(this.state.hostVar + "/getDate",
      {
        method: 'POST',
        // body: JSON.stringify({ dateToGet: e.target.elements.date.value }),
        body: JSON.stringify({ dateToGet: this.state.today }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(result => {
      result.json().then(doc => {
        console.dir(doc);


        this.setState({
          todayHebrewDate: doc.userHebrewDate,
          ParashaEnglish: doc.ParashaEnglish,
          englishHebMonth: doc.englishHebMonth,
          ParashaHebrew: doc.ParashaHebrew,
          currentDate: doc.currentDate,

        })
      })
    })
    // fetch('http://localhost:4000/')
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data) {
    //       this.setState({
    //         todayHebrewDate: data.todayHebrewDate,
    //         ParashaEnglish: data.ParashaEnglish,
    //         englishHebMonth: data.englishHebMonth,
    //         ParashaHebrew: data.ParashaHebrew,
    //         currentDate: data.currentDate
    //       })
    //       console.log('data from api - componentDidMount: ' + this.state);
    //       console.dir(this.state);

    //     } else {
    //       console.log('no data from api - componentDidMount');
    //     }
    //   })

  }

  updateDate(e) {
    e.preventDefault();
    // console.dir(e.target.elements.date.value);

    // set_e_input(e.target.elements.date.value);
    fetch(this.state.hostVar + "/getDate",
      {
        method: 'POST',
        // body: JSON.stringify({ dateToGet: e.target.elements.date.value }),
        body: JSON.stringify({ dateToGet: e.target.elements.date.value }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(result => {
      result.json().then(doc => {
        console.dir(doc);


        this.setState({
          todayHebrewDate_user: doc.userHebrewDate,
          ParashaEnglish_user: doc.ParashaEnglish,
          englishHebMonth_user: doc.englishHebMonth,
          ParashaHebrew_user: doc.ParashaHebrew,
          currentDate_user: doc.currentDate,

        })
      })
    })


  };


  render() {
    return (
      <div className="AppWrap">
        <div className="App">
          <div className="rowTop">
            <Wave iterations='1' speed='10' text="TODAY HEBREW DATE" className="he" />
            <div className="first" style={{ direction: 'rtl' }}>
              {this.state.todayHebrewDate}
            </div>
            <div className="second">   {this.state.currentDate}</div>
            <div className="second">{this.state.ParashaEnglish}</div>
            <div className="second"> {this.state.ParashaHebrew}</div>
          </div>
          <div className="formWrap">
            <img className="imgForm" src="/img/moon.png" alt="the sun" />
            <form className="theForm" onSubmit={this.updateDate}>
              <input name="date" id="date" className="dateInpt" type="date" required />
              <button type="submit" className="submitBtn">GET HEBREW DATE</button>
            </form>
            <img className="imgForm" src="/img/sun.png" alt="the moon" />
          </div>
          <div className="user">
            <div className="row">
              <div className="hed">Date</div>
              <TextTransition className="colData" style={{ direction: 'rtl' }}
                text={this.state.todayHebrewDate_user}
                // text={this.state.currentDate_user + ' ' + this.state.todayHebrewDate_user}
                springConfig={presets.wobbly} />
              <div className="hed">תאריך</div>
            </div >
            <div className="row">
              <div className="hed">Parasha</div>
              <TextTransition className="colData"
                text={this.state.ParashaHebrew_user}
                springConfig={presets.wobbly}
              // text={this.state.ParashaEnglish_user + ' ' + this.state.ParashaHebrew_user} springConfig={presets.wobbly}

              />
              <div className="hed">פרשה</div>
            </div >
            <div className="row">
              <div className="hed">month</div>
              <TextTransition className="colData"
                text={this.state.englishHebMonth_user}
                springConfig={presets.wobbly} />
              <div className="hed">חודש</div>
            </div>
          </div >
        </div >
      </div >
    );
  }
}
export default App;

