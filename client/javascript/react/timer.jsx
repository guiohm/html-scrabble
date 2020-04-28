

class TimerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: false,
            started: false,
            duration: 180,
            remaining: 180,
        };

        this.onPlus = this.onPlus.bind(this);
        this.onMinus = this.onMinus.bind(this);
        this.update = this.update.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onClickStartPause = this.onClickStartPause.bind(this);
    }

    componentDidMount() {
        this.bar = document.querySelector('.timer-bar__bar');
        this.barWidth = this.bar.offsetWidth;
    }

    handleOnComplete(e) {
        console.log('complete!!', e);
    }

    onClickStartPause() {
        if (this.state.completed) {
            this.onReset();
        }
        if (this.itvId) {
            this.itvId = window.clearInterval(this.itvId);
        } else {
            this.update();
            this.itvId = window.setInterval(this.update, 1000);
        }
        this.setState({started: !!this.reqId, completed: false});
    }

    onReset() {
        this.setState({remaining: this.state.duration})
    }

    changeTime(increment) {
        this.setState({
            duration: this.state.duration + increment,
            remaining: this.state.remaining == this.state.duration ?
                this.state.remaining + increment : this.state.remaining
        })
    }

    onPlus() {
        this.changeTime(1);
    }

    onMinus() {
        this.changeTime(-1);
    }

    update() {
        const remaining = this.state.remaining - 1;
        if (remaining <= 0) {
            this.itvId = window.clearInterval(this.itvId);
        }
        this.setState({
            completed: remaining <= 0,
            started: remaining <= 0 ? false : this.state.started,
            remaining: remaining,
        });
    }

    formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return (min ? `${min} min ` : '') + (sec || '');
    }

    render() {
        let remainingText = '';
        let durationText = '';
        let remaining = this.state.remaining;
        if (this.state.completed) {
            remainingText = 'Temps écoulé !';
        } else if (remaining == this.state.duration) {
            remainingText = this.formatTime(remaining);
        } else {
            // adjustment for delay in css animation
            if (remaining < this.state.duration)
                remaining++;
            remainingText = this.formatTime(remaining);
        }
        durationText = this.formatTime(this.state.duration);

        const position = this.state.remaining == this.state.duration ? 100 :
            100 * this.state.remaining / this.state.duration - 1;
        if (this.bar)
            this.bar.style.transform = 'translateX(' + (position < 0 ? 0 : position) + '%)';

        return (
        <div>
            <div className="timer-bar" onClick={this.update}>
                <div className="timer-bar__bar"></div>
            </div>
            <div className="timer-text-zone">
                <div className="timer-text">
                    <span className="remaining">{remainingText}</span>
                    <span className="duration">{durationText}</span>
                    <div style={{clear: 'both'}}></div>
                </div>
                <div className="timer-buttons">
                    <button onClick={this.onClickStartPause}>Play/Pause</button>
                    <button onClick={this.onReset}>0</button>
                    <button onClick={this.onPlus}>+</button>
                    <button onClick={this.onMinus}>-</button>
                </div>
            </div>
        </div>
        );
    }
}

  let domContainer = document.querySelector('#timer');
  ReactDOM.render(<TimerComponent />, domContainer)
