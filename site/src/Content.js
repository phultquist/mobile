import React from 'react';
import { Slider } from 'theme-ui'

export class Content extends React.Component {
    
    constructor(props){
        super(props)
        console.log(this.props);
        this.state = {}
        this.onChange = this.onChange.bind(this)
        this.onSliderChange = this.onSliderChange.bind(this)
    }

    onChange = () => {
        this.props.onChange(JSON.stringify(this.state))
    }


    onSliderChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
        this.onChange()
    }

    render() {
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
                <Slider id='contrast' defaultValue={25} onChange={this.onSliderChange}/>

                <h4 style={fieldTitle}>Brightness</h4>
                <Slider id='brightness' defaultValue={25} onChange={this.onSliderChange}/>

                <h4 style={fieldTitle}>Animation Length</h4>
                <Slider id='animation' defaultValue={25} onChange={this.onSliderChange}/>
            </div>
        </div>);
    }
}

export default Content;

const fieldTitle = {
    marginTop: '30px',
    marginBottom: '10px'
}