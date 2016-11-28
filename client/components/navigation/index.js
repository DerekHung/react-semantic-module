import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Navigation extends Component {
	render() {
		return (
			<nav className="navigation">
				<Link className="navigation-link" to="/dropdown">DropDown</Link>
				<Link className="navigation-link" to="/droplist">DropList</Link>
                <Link className="navigation-link" to="/lightbox">Lightbox</Link>
				<Link className="navigation-link" to="/form">Form</Link>
				<Link className="navigation-link" to="/switches">Switches</Link>
				<Link className="navigation-link" to="/editor">Editor</Link>
				<Link className="navigation-link" to="/file">FileUploader</Link>
				<Link className="navigation-link" to="/comment">Comment</Link>
			</nav>
		);
	}
}

export default connect()(Navigation);