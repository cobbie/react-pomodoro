import React, { Component } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Stat from "./components/Stat/Stat";
import Dropdown from "./components/Dropdown/Dropdown";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: { minutes: 10, seconds: 0 },
      running: false
    };
    this.intervals = 0;
    this.timeElapsed = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.timerID = 0;
  }

  startTimer = () => {
    this.setState({
      running: true
    });
    this.timerID = setInterval(() => this.tick(), 1000);
  };

  pauseTimer = () => {
    this.setState({
      running: false
    });
    clearInterval(this.timerID);

  };

  componentDidMount =() => {
    if (this.state.running === true) {
      this.timerID = setInterval(() => this.tick(), 1000);
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.timerID);
  }

  

  
  tick = () => {
    let currentSec = this.state.time.seconds;
    let currentMin = this.state.time.minutes;
    let newMin = false;

    if (currentSec === 0) {
      currentSec = 59;
      newMin = true;
    } else {
      currentSec -= 1;
    }
    if (newMin) {
      currentMin -= 1;
      newMin = false;
    }
    this.setState({
      time: { minutes: currentMin, seconds: currentSec }
    });
  };

  displayProperZero = () => {
    if (this.state.time.seconds < 10) {
      return "0" + this.state.time.seconds.toString();
    }
    return <span>{this.state.time.seconds}</span>;
  };

  startOrStop = arg => {
    if (arg === false) {
      return (
        <Button
          buttonName="START"
          isGreen={true}
          isSmall={false}
          containsDropdown={false}
          onClick={this.startTimer}
        />
      );
    }
    return (
      <Button
        buttonName="PAUSE"
        isSmall={false}
        containsDropdown={false}
        onClick={this.pauseTimer}
      />
    );
  };

  renderDropdown = bool => {
    console.log("asdfg");
    return <Dropdown intervalTime={bool} />;
  };

  render() {
    return (
      <div className="App">
        <div className="gray-container">
          <div className="main-flexbox">
            <div className="header">POMODORO TIMER</div>
            <div className="upper-buttons">
              <Button
                buttonName="SET INTERVAL TIME"
                isSmall={true}
                containsDropdown={true}
                onClickDo={() => this.renderDropdown(true)}
              />
              <Button
                buttonName="SET BREAK TIME"
                isSmall={true}
                containsDropdown={true}
              />
            </div>
            <div className="timer-flexbox">
              <div className="timer">
                {this.state.time.minutes}:{this.displayProperZero()}
              </div>
              <div className="timer-bar" />
            </div>
            <div className="lower-buttons">
              <div className="lower-btn-row1">
                {this.startOrStop(this.state.running)}
                <Button
                  buttonName="RESTART"
                  isSmall={false}
                  containsDropdown={false}
                  isYellow={true}
                />
              </div>
              <div className="lower-btn-row2">
                <Button
                  isRed={true}
                  buttonName="STOP"
                  isSmall={false}
                  isWhite={true}
                  containsDropdown={false}
                />
              </div>
            </div>
            <div className="stats">
              <Stat statName="Intervals Completed" stat={this.intervals} />
              <Stat statName="Total Working Time" stat={this.timeElapsed} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
