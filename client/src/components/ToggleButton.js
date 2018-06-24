import {h, Component} from 'preact';

class ToggleButton extends Component {
    constructor(props) {
        super(props);
        this.state = {isOn: false};
    }
    toggle = () => {
        this.setState(prevState => {
            if (prevState.isOn) {
                this.props.offHandler();
            } else {
                this.props.onHandler();
            }
            return {isOn: !prevState.isOn}
        });
    }
    render () {
        return (
            <button onClick={this.toggle} className="direction__button">
                {(this.state.isOn) ? this.props.offContent() : this.props.onContent()}
            </button>
        );
    }
}

export default ToggleButton;