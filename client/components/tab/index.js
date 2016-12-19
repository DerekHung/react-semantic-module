import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import style from './style.css';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class Tabs extends Component {
    constructor(props){
        super(props);
        this.state = {
            tabStack: [],
            currentTab: ''
        }
        this.tabClick = (e) => this._tabClick(e);
    }
    componentDidMount(){
        let that = this;
        let tabStack=[];
        React.Children.map(this.props.children, function (child) {
            tabStack.push(child.props.name);
        });
        this.setState({
            tabStack: tabStack,
            currentTab: tabStack[0]
        })
    }
    _tabClick(e) {
        this.setState({
            currentTab: e.target.getAttribute('name')
        })
        if( this.props.onChange ) this.props.onChange(this.state.currentTab, e.target.getAttribute('name'));
    }
    render(){
        let that = this;

        return (
            <div>
                <div styleName="head-body">
                { this.state.tabStack && this.state.tabStack.map(function(value, index){
                        let active = that.state.currentTab === value ? 'active' : '';
                        return(
                            <div styleName={"tab-head "+active}
                                 style={{ width: 100/that.state.tabStack.length + '%'}}
                                 key={index} 
                                 onClick={that.tabClick} 
                                 name={value}>
                                 {value}
                            </div>
                        )
                    }) 
                }
                </div>
                <div styleName="container" className={this.props.className}>
                { React.Children.map(this.props.children, function (child) {
                    return React.cloneElement(child, {
                        currentTab: that.state.currentTab
                    });
                })}
                </div>
            </div>
        )
    }
}

export default CSSModules(Tabs,style,{allowMultiple:true});