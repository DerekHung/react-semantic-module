import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import ReactDOM from 'react-dom';

class Tab extends Component {
    constructor(props){
        super(props);
        this.flag = false;
    }
    render(){
        if( this.props.name === this.props.currentTab ) this.flag = true;
        let componentShouldMount = this.props.name === this.props.currentTab || this.flag;
        let componentStyle = this.props.name === this.props.currentTab ? 
                { display: 'block'} : { display: 'none'};
        return (
            <div style={componentStyle}>
            { componentShouldMount && this.props.children }
            </div>
        )
    }
}
export default CSSModules(Tab,style,{allowMultiple:true});