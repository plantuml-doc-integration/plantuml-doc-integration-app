import React from 'react';
import './App.css';

import { Switch, Route, withRouter } from 'react-router-dom';

import DocsPage from './page/docs/DocsPage';
import HomePage from './page/HomePage';
import AuthPage from './page/auth/AuthPage';
import Footer from './element/Footer';
class PlantDocApp extends React.Component {

	render() {

		return (
			<div className="main-content">
				<Switch>
					<Route path="/docs/:docId" component={DocsPage} />
					<Route path="/auth" component={AuthPage} />
					<Route exact path="/"  >
						<HomePage />
					</Route>
					<Route path="*">
						Not Found
					</Route>

				</Switch>
				<Footer />
			</div>
		);
	};
};
export default withRouter(PlantDocApp);



