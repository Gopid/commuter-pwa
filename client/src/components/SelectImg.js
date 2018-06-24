import {h, Component} from 'preact';

class SelectImg extends Component {
    state = {selected: 0}
    changeSelection = (selected) => {
        if (this.state.selected !== selected) {
            this.setState(prevState => {
                return {selected};
            }, () => this.props.onChange(selected));
        }
    }
    render({imgs}, state) {
        return (
            <div className="select-img">
                {imgs.map((path, id) => (
                    <img
                        key={id}
                        onClick={() => this.changeSelection(id)}
                        className="select-img__icon"
                        src={path}
                    />
                ))}
            </div>
        );
    }
}

export default SelectImg;