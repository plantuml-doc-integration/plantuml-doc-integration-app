import React, { useEffect } from 'react';
import './App.css';

import { Switch, Route, withRouter, useLocation } from 'react-router-dom';

import DocsPage from './page/docs/DocsPage';
import HomePage from './page/HomePage';
import PrivacyPage from './page/PrivacyPage';
import TermsPage from './page/TermsPage';
import AuthPage from './page/auth/AuthPage';
import Footer from './element/Footer';


const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};
class PlantDocApp extends React.Component {

	render() {

		return (
			<div className="main-content">
				<Switch>
					<Route path="/docs/:docId" component={DocsPage} />
					<Route path="/auth" component={AuthPage} />
					<Route exact path="/privacy"  >
						<ScrollToTop />
						<PrivacyPage />
					</Route>
					<Route exact path="/terms"  >
						<ScrollToTop />
						<TermsPage />
					</Route>
					<Route exact path="/"  >
						<HomePage />
					</Route>
					<Route path="*">
						Not Found page working in progress
					</Route>

				</Switch>
				<Footer />
			</div>
		);
	};
};
export default withRouter(PlantDocApp);



