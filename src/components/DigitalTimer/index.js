import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {timer: 25, countdown: false, min: 25, sec: 0}

  componentDidMount() {
    this.interval = setInterval(this.tick, 100)
  }

  reduceTimer = () => {
    const {min, countdown} = this.state
    if (countdown === false && min > 0) {
      this.setState(prevState => ({
        timer: prevState.timer - 1,
        min: prevState.timer - 1,
      }))
    }
  }

  increaseTimer = () => {
    const {countdown} = this.state
    if (countdown === false) {
      this.setState(prevState => ({
        timer: prevState.timer + 1,
        min: prevState.timer + 1,
      }))
    }
  }

  setDefault = () => {
    this.setState({timer: 25, min: 25, sec: 0, countdown: false})
  }

  startOrPause = () => {
    this.setState(prevState => ({
      countdown: !prevState.countdown,
    }))
  }

  tick = () => {
    const {min, sec, countdown} = this.state

    if (min === 0 && sec === 1) {
      this.setState({min: 25, sec: 0, countdown: false})
    }
    if (countdown && min >= 0) {
      const seconds = sec > 0 ? sec - 1 : 59

      const minutes = sec === 0 ? min - 1 : min

      this.setState({sec: seconds, min: minutes})
    }
  }

  render() {
    const {timer, min, sec, countdown} = this.state

    const starOrpauseImg = countdown
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const icon = countdown ? 'pause icon' : 'play icon'

    const text = countdown ? 'Pause' : 'Start'

    const timerIndication = countdown ? 'Running' : 'Paused'

    const mins = min < 10 ? `0${min}` : min
    const secn = sec < 10 ? `0${sec}` : sec

    return (
      <div className="container">
        <h1 className="heading">Digital Timer</h1>

        <div className="timer-container">
          <div className="image-container">
            <div className="show-time">
              <h1 className="timer-heading">
                {mins}:{secn}
              </h1>
              <p>{timerIndication}</p>
            </div>
          </div>

          <div className="functionality">
            <div className="button-container">
              <button
                className="button-start"
                type="button"
                onClick={this.startOrPause}
              >
                <img src={starOrpauseImg} alt={icon} className="icon" />
                <p className="para">{text}</p>
              </button>

              <button
                className="button-stop"
                type="button"
                onClick={this.setDefault}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon"
                />
                <p className="para">Reset</p>
              </button>
            </div>

            <p className="timer-para">Set Timer limit</p>
            <div className="set-timer">
              <button
                type="button"
                className="ctrl-btn"
                onClick={this.reduceTimer}
              >
                -
              </button>

              <p className="timer-text">{timer}</p>

              <button
                type="button"
                className="ctrl-btn"
                onClick={this.increaseTimer}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
