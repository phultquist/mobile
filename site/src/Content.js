import React from 'react';
import { Slider, Select, Button } from 'theme-ui'
import { SegmentedControl } from 'segmented-control-react';

// import theme from './theme'

const segments = [
    { name: 'Spotify', id: 'spotify' },
    { name: 'Listen', id: 'listen' }
];

export class Content extends React.Component {

    constructor(props) {
        super(props)
        // console.log(this.props);
        // this.state = this.props.defaults
        this.state = {
            contrast: 0,
            brightness: 0,
            animation: 0,
            useAnimation: true,
            autobrightness: true,
            fromServer: false,
            segments: segments,
            selected: 0
        }
        this.onChange = this.onChange.bind(this)
        this.onFieldChange = this.onFieldChange.bind(this)
        this.onUndo = this.onUndo.bind(this)
        this.onListen = this.onListen.bind(this)
        this.onModeChange = this.onModeChange.bind(this)
        this.onRestoreDefaults = this.onRestoreDefaults.bind(this)
        this.ready = false;
    }

    componentDidMount() {
        // console.log(this.props.defaults);
        this.lastDefaults = this.props.defaults;
        this.setState(this.props.defaults)
        console.log(this.state);
    }

    componentDidUpdate() {
        // console.log(this.props.key);
        // this.setState(this.props.key)
        if (this.props.defaults.fromServer === true) {
            this.props.defaults.fromServer = false
            this.ready = true;
            this.setState(this.props.defaults)
            console.log(this.state);
        }
    }

    onChange = () => {
        setTimeout(() => {
            this.props.onChange(JSON.stringify(this.state))
        }, 100)
    }

    onRestoreDefaults = () => {
        alert("not supported yet")
    }

    onFieldChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
        this.onChange()
    }

    onSelectChange = (event) => {
        let index = event.target.selectedIndex
        let value = event.target.children[index].value
        console.log(value);
        this.setState({ [event.target.id]: value })
        this.onChange();
    }

    onUndo = (event) => {
        this.setState({ contrast: 10, brightness: 20 })
        this.onChange()
    }

    onModeChange = (index) => {
        this.setState({mode: segments[index].id})
        this.onChange();
    }

    onListen = (event) => {
        // it is set to false by the python script. really, as far as this in concerned, it just pushes the change by calling onChange()
        this.setState({listenTrigger: true})
        this.onChange();
    }

    render() {
        // console.log('rendering content', this.props.defaults);
        if (!this.ready) {
            console.log('not ready');
            return (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        // alignItems: 'center',
                        height: 'auto',
                    }}>
                    <div style={{
                        width: '90vw'
                    }}>
                        <h2>Connecting...</h2>
                    </div>
                </div >
            )
        }

        return (<div
            style={{
                display: 'flex',
                justifyContent: 'center',
                // alignItems: 'center',
                height: 'auto',
            }}>
            <div style={{
                width: '90vw'
            }}>
                <h2>Settings</h2>
                <SegmentedControl
                    segments={this.state.segments}
                    selected={this.state.selected}
                    variant="dark"
                    onChangeSegment={this.onModeChange}
                />
                <h4 style={fieldTitle}>Brightness</h4>
                <Slider id='brightness' value={this.state.brightness} onChange={this.onFieldChange} />

                <h4 style={fieldTitle}>Fade</h4>
                <Slider id='animation' min={5} value={this.state.animation} onChange={this.onFieldChange} />

                <h4 style={fieldTitle}>Animation</h4>
                <Select name='useAnimation' id='useAnimation' mb={3} value={this.state.useAnimation} onChange={this.onSelectChange}>
                    <option value='true'>On</option>
                    <option value='false'>Off</option>
                </Select>

                <h4 style={fieldTitle}>Auto Brightness</h4>
                <Select name='autobrightness' id='autobrightness' mb={3} value={this.state.autobrightness} onChange={this.onSelectChange}>
                    <option value='true'>On</option>
                    <option value='false'>Off</option>
                </Select>
                {this.state.mode == 'listen'? <Button onClick={this.onListen} style={{ color: 'white', backgroundColor: 'black', width: '100%', marginBottom: '20px'}}>Listen Now</Button> : <></>}
                
                <Button onClick={this.onRestoreDefaults} style={{ color: 'black', backgroundColor: 'white', width: '100%', marginBottom: '20px'}}>Restore Defaults</Button>
            </div>
        </div>);
    }
}

export default Content;

const fieldTitle = {
    marginTop: '30px',
    marginBottom: '10px'
};