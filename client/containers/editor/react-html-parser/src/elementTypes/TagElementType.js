import React from 'react';
import ProcessNodes from '../utils/ProcessNodes';
import GeneratePropsFromAttributes from '../utils/GeneratePropsFromAttributes';
import TransformTagName from '../utils/TransformTagName';
import VoidElements from '../dom/elements/VoidElements';

import MediaPlayer from 'client/components/mediaPlayer';

/**
 * Converts any element (excluding style - see StyleElementType - and script) to a react element.
 *
 * @param {Object} node The tag node
 * @param {String} key The key to give the React element
 * @returns {React.Element} The React tag element
 */
export default function TagElementType(node, key) {

  // generate props
  const props = GeneratePropsFromAttributes(node.attribs, key);

  // transform the tag name if needed
  const tagName = TransformTagName(node.name);

  // If the node is not a void element and has children then process them
  let children = null;
  if (VoidElements.indexOf(tagName) === -1) {
    children = ProcessNodes(node.children);
  }

  // create and return the element
  //return <Button/>;

  console.log(node.attribs);
  if( node.name === 'img' ) return <MediaPlayer property={ node.attribs } />;
  else return React.createElement(tagName, props, children);
}
