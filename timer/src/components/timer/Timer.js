import "./Timer.css";
import React from "react";
import ControlsSet from "./ControlsSet";

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { duration: 0, timeRemaining: 0 };
    this.circle = React.createRef();
  }

  componentDidMount() {
    this.perimeter = this.circle.current.getAttribute("r") * 2 * Math.PI;
    this.circle.current.setAttribute("stroke-dasharray", this.perimeter);
  }

  start = () => {
    this.setState({ timeRemaining: this.getTimeRemaining() });
    this.tick();
    this.intervalId = setInterval(this.tick, 20);
  };

  pause = () => {
    clearInterval(this.intervalId);
  };

  tick = () => {
    if (this.getTimeRemaining() <= 0) {
      this.pause();
    } else {
      this.setState({ duration: (this.getTimeRemaining() - 0.02).toFixed(2) });
      this.renderBorder();
    }
  };

  renderBorder = () => {
    this.circle.current.setAttribute(
      "stroke-dashoffset",
      (this.perimeter * this.state.duration) / this.state.timeRemaining -
        this.perimeter
    );
  };

  renderControlsSet = () => {
    return (
      <>
        <input
          ref={this.durationInput}
          onChange={this.onInputChange}
          id="duration"
          value={this.state.duration}
        />
        <div>
          <button onClick={this.start} id="start">
            <i className="fas fa-play"></i>
          </button>
          <button onClick={this.pause} id="pause">
            <i className="fas fa-pause"></i>
          </button>
        </div>
      </>
    );
  };

  renderCircle = () => {
    return (
      <svg className="dial">
        <circle
          ref={this.circle}
          fill="transparent"
          stroke="green"
          strokeWidth="2"
          r="190"
          cx="0"
          cy="200"
          transform="rotate(-90 100 100)"
        />
      </svg>
    );
  };

  onInputChange = (event) => {
    this.setState({ duration: event.currentTarget.value });
  };

  getTimeRemaining = () => {
    return parseFloat(this.state.duration);
  };

  render() {
    return (
      <div className="timer">
        <ControlsSet>{this.renderControlsSet()}</ControlsSet>
        {this.renderCircle()}
      </div>
    );
  }
}

export default Timer;
