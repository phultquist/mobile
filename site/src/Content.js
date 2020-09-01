import React from 'react';
import { Slider, Button, Select } from 'theme-ui'
import theme from './theme'

export class Content extends React.Component {

    constructor(props) {
        super(props)
        // console.log(this.props);
        // this.state = this.props.defaults
        this.state = {
            contrast: 0,
            brightness: 0,
            animation: 0,
            sound: 'true'
        }
        this.onChange = this.onChange.bind(this)
        this.onFieldChange = this.onFieldChange.bind(this)
        this.onUndo = this.onUndo.bind(this)
    }

    componentDidMount() {
        // console.log(this.props.defaults);
        this.lastDefaults = this.props.defaults;
        this.setState(this.props.defaults)
    }

    componentDidUpdate() {
        // console.log(this.props.key);
        // this.setState(this.props.key)
        if (this.props.defaults.fromServer === true) {
            this.props.defaults.fromServer = false
            this.setState(this.props.defaults)
        }
    }

    onChange = () => {
        this.props.onChange(JSON.stringify(this.state))
    }

    onFieldChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
        this.onChange()
    }

    onSelectChange = (event) => {
        // this.setState({ })
        console.log(event.target.id);
    }

    onUndo = (event) => {
        this.setState({ contrast: 10, brightness: 20 })
        this.onChange()
    }

    render() {
        // console.log('rendering content', this.props.defaults);
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
                <h2>Paused/Playing/Off/Error</h2>

                <h4 style={fieldTitle}>Contrast</h4>
                <Slider id='contrast' value={this.state.contrast} onChange={this.onFieldChange} />

                <h4 style={fieldTitle}>Brightness</h4>
                <Slider id='brightness' value={this.state.brightness} onChange={this.onFieldChange} />

                <h4 style={fieldTitle}>Animation Length</h4>
                <Slider id='animation' value={this.state.animation} onChange={this.onFieldChange} />
                <Select name='sound' id='sound' mb={3} onChange={this.onFieldChange}>
                    <option value='something'>Beep</option>
                    <option value='something1'>Baep</option>
                    <option value='something2'>Beffp</option>
                </Select>
                <Button theme={theme} variant='secondary' onClick={this.onUndo}>Undo</Button>
            </div>
        </div>);
    }
}

export default Content;

const fieldTitle = {
    marginTop: '30px',
    marginBottom: '10px'
};