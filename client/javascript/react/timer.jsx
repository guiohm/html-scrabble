

class TimerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: false,
            started: false,
            duration: 180,
            remaining: 180,
            loading: true,
        };

        this.onPlus = this.onPlus.bind(this);
        this.onMinus = this.onMinus.bind(this);
        this.update = this.update.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onStartPause = this.onStartPause.bind(this);
    }

    componentDidMount() {
        this.bar = document.querySelector('.timer-bar__bar');
        this.barWidth = this.bar.offsetWidth;
        setTimeout(() => this._initSocket(), 500);
    }

    _initSocket() {
        // TODO remove ui object dependency
        if (!ui || !ui.socket) {
            setTimeout(this._initSocket, 500);
        }
        this.socket = ui.socket;
        this.socket.on('timer', (data) => {
            // console.log('received on ' + new Date(), data);
            if (data.state) {
                data.state.loading = false;
                this.setState(data.state, this._startStopAccordingToState);
            }
        });
        this.dispatchEvent({action: 'status'});
    }

    dispatchEvent(data, noServerSend = false) {
        window.document.dispatchEvent(
            new CustomEvent('scrabble-timer', {detail: data}));
        if (noServerSend) return;
        this.socket.emit('timer', data);
    }

    _startStopAccordingToState() {
        if (this.state.started) {
            if (!this.itvId) {
                this.update();
                this.itvId = window.setInterval(this.update, 1000);
            }
        } else {
            this.itvId = window.clearInterval(this.itvId);
        }
    }

    onStartPause() {
        this.dispatchEvent({action: 'startpause'})
    }

    onPlus() {
        this.dispatchEvent({action: 'changeTime', increment: 30})
    }

    onMinus() {
        this.dispatchEvent({action: 'changeTime', increment: -30})
    }

    onReset() {
        this.dispatchEvent({action: 'reset'})
    }

    update() {
        const remaining = this.state.remaining - 1;
        if (remaining <= 0) {
            this.itvId = window.clearInterval(this.itvId);
            this.dispatchEvent({action: 'complete'});
            console.log('Timer completed on: ' + new Date());
            this.setState({
                started: false,
                completed: true,
                remaining: 0
            });
        } else {
            this.setState({
                remaining: remaining
            });
        }
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
            remainingText = this.formatTime(remaining);
        }
        durationText = this.formatTime(this.state.duration);
        if(this.state.loading) {
            remainingText = durationText = '--:--';
        }

        const position = remaining == this.state.duration ? 100 :
            remaining <= 30 ? 100 * (remaining - 1) / 30 :
            100 * remaining / this.state.duration - 1;
        if (this.bar)
            this.bar.style.transform = 'translateX(' + (position < 0 ? 0 : position) + '%)';

        return (
        <div>
            <div className={'timer-bar' + (remaining <= 30 ? ' red' : '')} onClick={this.update}>
                <div className="timer-bar__bar"></div>
            </div>
            <div className="timer-text-zone">
                <div className="timer-text">
                    <span className="remaining">{remainingText}</span>
                    <span className="duration">{durationText}</span>
                    <div style={{clear: 'both'}}></div>
                </div>
                <div className="timer-buttons">
                    <button onClick={this.onStartPause}>Play/Pause</button>
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
