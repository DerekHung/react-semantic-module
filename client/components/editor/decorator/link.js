import React, { Component, PropTypes } from 'react';
import {Entity} from 'draft-js';

function findLinkEntities(contentBlock, callback) {
	contentBlock.findEntityRanges(
		(character) => {
			const entityKey = character.getEntity();
			return (
				entityKey !== null &&
				Entity.get(entityKey).getType() === 'LINK'
			);
		},
		callback
	);
}

const Link = (props) => {

	const {href, url} = Entity.get(props.entityKey).getData();

	const styleLink = {
		color: '#3b5998',
		textDecoration: 'underline',
	}

	const link = href || url;
	return (
		<a href={link} style={styleLink} target="_blank">
			{props.children}
		</a>
	);
};


const creatLinkPlugin = (config = {}) => {
  return {
    decorators: [{
      strategy: findLinkEntities,
      component: Link,
    }]
  }
};

export default creatLinkPlugin;