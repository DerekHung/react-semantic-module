import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from 'client/containers/App';
import Demo from 'client/containers/demo';

import LightboxPage from 'client/containers/lightbox';
import DropdwonPage from 'client/containers/dropdown';
import DropListPage from 'client/containers/dropList';
import Form from 'client/containers/form';
import Switches from 'client/containers/switches';
import EditorPage from 'client/containers/editor';
import FileUploaderPage from 'client/containers/fileUploader';

export default function(history) {
	return (
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Demo} />
				<Route path="/dropdown" component={DropdwonPage} />
				<Route path="/droplist" component={DropListPage} />
                <Route path="/lightbox" component={LightboxPage} />
				<Route path="/form" component={Form} />
				<Route path="/switches" component={Switches} />
				<Route path="/editor" component={EditorPage} />
				<Route path="/file" component={FileUploaderPage} />
			</Route>
		</Router>
	);
};