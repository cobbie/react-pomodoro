import React, { Component } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import Stat from "./components/Stat/Stat";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: { minutes: 25, seconds: "00" },
      running: false
    };
    this.intervals = 0;
    this.timeElapsed = 0;
  }

  startOrStop = arg => {
    if (arg === false) {
      return (
        <Button
          buttonName="START"
          isGreen={true}
          isSmall={false}
          containsDropdown={false}
        />
      );
    }
    return (
      <Button buttonName="PAUSE" isSmall={false} containsDropdown={false} />
    );
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
              />
              <Button
                buttonName="SET BREAK TIME"
                isSmall={true}
                containsDropdown={true}
              />
            </div>
            <div className="timer-flexbox">
              <div className="timer">
                {this.state.time.minutes}:{this.state.time.seconds}
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
