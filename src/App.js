import React, { Component } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Stat from "./components/Stat/Stat";
import Dropdown from "./components/Dropdown/Dropdown";
import TimerBar from "./components/TimerBar/TimerBar"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: { minutes: 1, seconds: 0 },
      running: false,
    };
    this.mode = true;
    this.intervalCount = 0;
    this.currentWorkingInterval = 1;
    this.currentWorkingSecondsElapsed = 0;
    this.interval = 1;
    this.currentWorkingBreakTime = 5;
    this.break = 1;
    this.seconds = 0;
    this.timerID = 0;
    this.timeElapsed = "0h 0m 0s";
    this.hoursElapsed = 0;
    this.minutesElapsed = 0;
    this.secondsElapsed = 0
  }

  startTimer = () => {this.setState({running: true})};
  pauseTimer = () => {this.setState({running: false});};
  restartTime = () => {
    this.setState({time: {minutes: this.interval, seconds: 0}});
    this.currentWorkingInterval = this.interval;
    this.currentWorkingSecondsElapsed = 0;
};
  stopTime = () => {
    this.setState({running: false, time: {minutes: this.interval, seconds: 0}});
    this.currentWorkingInterval = this.interval;
    this.currentWorkingSecondsElapsed = 0;
    this.mode=true;

  };

  setInterval = () => {
    const newInterval = prompt("Set new interval time (mins): ")
    this.interval = newInterval;
  }

  setBreakTime = () => {
    const newBreak = prompt("Set new break time (mins): ")
    this.break = newBreak;
  }


  componentDidUpdate = () => {
    if (this.state.running) {
      this.timerID = setInterval(() => this.tick(), 1000);
      this.secondsElapsed += 1;
      this.currentWorkingSecondsElapsed += 1;
        if(this.minutes===60){
          this.hoursElapsed +=1;
          this.minutesElapsed = 0;
        }
        if (this.secondsElapsed===60){
          this.minutesElapsed+=1;
          this.secondsElapsed = 0;
        }
      this.timeElapsed = this.hoursElapsed + "h " + this.minutesElapsed +"m " + this.secondsElapsed + "s";
      }
    }

  componentWillUpdate = () => {
    clearInterval(this.timerID);
    if(this.state.time.seconds===0 && this.state.time.minutes===0){
      this.currentWorkingInterval = this.interval;
      this.currentWorkingBreak = this.break;
      if (this.mode){
        this.intervalCount += 1;
        this.setState({
        time: {minutes: this.break, seconds: 0}
      });
        this.mode=false;
      }
      else{
        this.mode=true;
        this.setState({
          time: {minutes: this.interval, seconds: 0}
        });
      }
      
      this.currentWorkingSecondsElapsed = 0;
    }
    

  }

  tick = () => {
    let currentSec = this.state.time.seconds;
    let currentMin = this.state.time.minutes;
    let newMin = false;


    if (currentSec === 0 && currentMin!==0) {
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

  totalWorkingTime = () => {
    this.timeElapsed = this.hoursElapsed +"h" + this.minutes +"m" + this.secondsElapsed + "s";
  }

  displayTime = () => {
    return <span>{
      this.state.time.minutes < 10 ? "0" + this.state.time.minutes.toString() : this.state.time.minutes}
      :
    {
      this.state.time.seconds < 10 ? "0" + this.state.time.seconds.toString(): this.state.time.seconds}
      </span>};

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
    return <Dropdown intervalTime={bool} />;
  };

  renderMode = () => {
    return(
      <h1 className={require('classnames')({"work-mode": this.mode, "break-mode": !this.mode})}>{this.mode ? "WORK" : "BREAK"}</h1>
      )
  }

  calcBarLength = () => { 
    if(this.mode){
      return (303 - (303  * (this.currentWorkingSecondsElapsed / (this.currentWorkingInterval * 60)))).toString() + "px";
    }
    return (303 - (303  * (this.currentWorkingSecondsElapsed / (this.currentWorkingBreak * 60)))).toString() + "px";
  }

  barColor = () => {
    if(this.mode) return "#E35252";
    return "#7EC547"
  }
 
  render() {
  
    return (
      <div className="App">
        <div className="gray-container">
        <TimerBar width={this.calcBarLength()} color={this.barColor()} />
          <div className="main-flexbox">
            <div className="header">POMODORO TIMER</div>
            {this.renderMode()}
            <div className="upper-buttons">
              <Button
                buttonName="SET INTERVAL TIME"
                isSmall={true}
                containsDropdown={true}
                onClick={this.setInterval}
              />
              <Button
                buttonName="SET BREAK TIME"
                isSmall={true}
                containsDropdown={true}
                onClick={this.setBreakTime}
              />
            </div>
            <div className="timer-flexbox">
              <div className="timer">
                {this.displayTime()}
              </div>
            </div>
            <div className="lower-buttons">
              <div className="lower-btn-row1">
                {this.startOrStop(this.state.running)}
                <Button
                  buttonName="RESTART"
                  isSmall={false}
                  containsDropdown={false}
                  isYellow={true}
                  onClick={this.restartTime}
                />
              </div>
              <div className="lower-btn-row2">
                <Button
                  isRed={true}
                  buttonName="STOP"
                  isSmall={false}
                  isWhite={true}
                  containsDropdown={false}
                  onClick={this.stopTime}
                />
              </div>
            </div>
            <div className="stats">
              <Stat statName="Intervals Completed" stat={this.intervalCount} />
              {/* <Stat statName="Total Working Time" stat={this.timeElapsed} /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
