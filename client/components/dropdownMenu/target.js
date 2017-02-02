import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import ReactDOM from 'react-dom';



class Target extends Component{
	componentDidMount() {
		this.context.getThisDOM(this.refs.target);
	}
	
	componentDidUpdate() {
		this.context.getThisDOM(this.refs.target);
	}

    render(){
		//console.log(this.props.children);
		const children = React.Children.map(this.props.children, (child) => {
			if( React.isValidElement(child) ) return React.cloneElement(child); 
			else return (<div>{child}</div>);	
		})
		
        return(
            <div onClick={this.context.toggleOpen} styleName="target" className={this.props.className} ref="target">  
				{children} 
            </div>
        );
    }
}
Target.contextTypes = {
	toggleOpen: React.PropTypes.func,
	getThisDOM: React.PropTypes.func
}
export default CSSModules(Target,style,{allowMultiple:true});