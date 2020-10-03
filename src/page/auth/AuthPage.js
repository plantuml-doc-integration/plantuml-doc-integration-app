import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { CircularProgress, Button, DialogActions } from '@material-ui/core';
import { DoneOutlineOutlined, ErrorOutlineOutlined } from '@material-ui/icons';
import { If, Then, Else, When } from 'react-if';
import LargeIconDialogContent from '../../element/dialog/LargeIconDialogContent';
import DialogBase from '../../element/dialog/DialogBase';
import HeaderBar from '../../element/HeaderBar';
import queryString from 'query-string';
import { tokenStore, redirectDocIdStore } from '../../util/Store';

import redirectToAuthUrl from '../../util/AuthorizeRedirector';


export default class AuthorizeFinishDialog extends React.Component {
	static propTypes = {
		history: PropTypes.any.isRequired,
		match: PropTypes.any.isRequired,
		location: PropTypes.any.isRequired
	};
	state = {
		loading: true,
		success: false,
		retry: false,
		proceed: false,
	};
	componentDidMount() {
		if (tokenStore.exists()) {
			//Already authorized
			this.props.history.push('/');
		}
		const query = queryString.parse(this.props.location.search);
		const code = query.code;
		if (!code) {
			this.setState({
				loading: false,
				success: false,
				proceed: false
			});
		} else {
			if (redirectDocIdStore.exists()) {
				this.setState({ proceed: true })
			}
			this.setState({ retry: false })
			this.verifyCode(code);
		}


	};
	verifyCode = async (code) => {
		let success = false;
		try {
			const response = await axios.get(`/auth/token`, { params: { code } });
			if (response.status === 200) {
				success = true;
				tokenStore.store(response.data.token);
			} else {
			}
		} catch (err) {
			console.log(err);
		}
		this.setState({
			success, loading: false
		});
	};
	retryAuthorize = () => {
		this.setState({
			loading: true,
			success: false,
			proceed: false,
			retry: true,
		}, async () => {
			//should redirect already
			await redirectToAuthUrl();
			this.setState({ loading: false, success: false });
		});
	}
	redirectHome = () => {
		this.props.history.push('/');
	}
	redirectDocs = () => {
		if (redirectDocIdStore.exists()) {
			this.props.history.push(`/docs/${redirectDocIdStore.load()}`);
		} else {
			this.props.history.push('/');
		}
	}
	render() {
		return (
			<div>
				<HeaderBar title="Authorization" />
				<DialogBase open={true} onClose={() => this.redirectHome()} title="Authorization">
					<If condition={this.state.loading}>
						<Then>
							<If condition={this.state.retry}>
								<Then>
									<LargeIconDialogContent icon={<CircularProgress size="5rem" />} caption="Please wait...">
										You will be redirected to Google
								</LargeIconDialogContent>
								</Then>
								<Else>
									<LargeIconDialogContent icon={<CircularProgress size="5rem" />} caption="Just A Moment...">
										We are getting your response from Google
								</LargeIconDialogContent>
								</Else>
							</If>
						</Then>
						<Else>
							<If condition={this.state.success}>
								<Then>
									<LargeIconDialogContent iconClass="color-safe" icon={<DoneOutlineOutlined className="large-icon" />} caption="Success!">
										All Done! You can start viewing your diagrams now.
									<When condition={this.state.proceed}>
											<br />Click <b>Proceed</b> to view the diagrams in your document
									</When>
									</LargeIconDialogContent>
									<DialogActions>
										<If condition={this.state.proceed}>
											<Then>
												<Button color="primary" onClick={() => this.redirectHome()}>Back</Button>
												<Button variant="contained" color="primary" onClick={() => this.redirectDocs()}>Proceed</Button>
											</Then>
											<Else>
												<Button variant="contained" color="primary" onClick={() => this.redirectHome()}>Done</Button>
											</Else>
										</If>
									</DialogActions>
								</Then>
								<Else>
									<LargeIconDialogContent iconClass=" color-danger" icon={<ErrorOutlineOutlined className="large-icon" />} caption="Failed to authorize">
										An error occured. Click <b>Retry</b> to try again.
								</LargeIconDialogContent>
									<DialogActions>
										<Button color="primary" onClick={() => this.redirectHome()}>Back</Button>
										<Button variant="contained" color="primary" onClick={() => this.retryAuthorize()}>Retry</Button>
									</DialogActions>
								</Else>
							</If>
						</Else>
					</If>
				</DialogBase>
			</div>
		);
	}
}