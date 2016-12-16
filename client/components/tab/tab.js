import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import ReactDOM from 'react-dom';

class Tab extends Component {
    constructor(props){
        super(props);
        this.flag = false;
    }
    componentWillUnMount(){
        console.log(this.props.name + 'unmount');
    }
    render(){
        console.log(this.props);
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
Tab.defaultProps = {

}
export default CSSModules(Tab,style,{allowMultiple:true});