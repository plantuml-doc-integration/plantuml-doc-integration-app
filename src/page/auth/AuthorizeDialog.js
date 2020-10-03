import React from 'react';
import PropTypes from 'prop-types';
import DialogBase from '../../element/dialog/DialogBase';
import { Button, CircularProgress, DialogActions } from '@material-ui/core';
import { VpnKeyOutlined, LockOutlined, ErrorOutlineOutlined } from '@material-ui/icons';
import { If, Then, Else } from 'react-if';
import LargeIconDialogContent from '../../element/dialog/LargeIconDialogContent';
import { tokenStore, redirectDocIdStore } from '../../util/Store';
import redirectToAuthUrl from '../../util/AuthorizeRedirector';


export default class AuthorizeDialog extends React.Component {
	static propTypes = {
		open: PropTypes.bool.isRequired,
		onClose: PropTypes.func.isRequired
	};
	state = {
		loading: false,
		fail: false,
		authorized: false,
	};

	reset() {
		this.setState({
			loading: false,
			fail: false,
			authorized: tokenStore.exists()
		});
	}

	unauthorize = () => {
		tokenStore.clear();
		redirectDocIdStore.clear();
		this.props.onClose();
	}

	authorize = async () => {
		this.setState({
			loading: true,
			fail: false
		}, async () => {
			const success = await redirectToAuthUrl();
			if (!success) {
				this.setState({ loading: true, fail: true });
			}
		});
	};

	render() {
		return (
			<DialogBase open={this.props.open} onClose={() => this.props.onClose()} onReset={() => this.reset()} title="Authorization">
				<If condition={this.state.loading}>
					<Then>
						<If condition={this.state.fail}>
							<Then>
								<LargeIconDialogContent iconClass="color-danger" icon={<ErrorOutlineOutlined className="large-icon" />} caption="Failed to connect">
									An error occured when connecting to the server.
								</LargeIconDialogContent>
								<DialogActions>
									<Button color="primary" onClick={() => this.props.onClose()}>Cancel</Button>
									<Button variant="contained" color="primary" onClick={() => this.authorize()}>Retry</Button>
								</DialogActions>
							</Then>
							<Else>
								<LargeIconDialogContent icon={<CircularProgress size="5rem" />} caption="Please wait...">
									You will be redirected to Google
								</LargeIconDialogContent>
							</Else>
						</If>
					</Then>
					<Else>
						<If condition={this.state.authorized}>
							<Then>
								<LargeIconDialogContent iconClass="color-safe" icon={<VpnKeyOutlined className="large-icon" />} caption="Authorized">
									You have authorized PlantUML Doc Integration to read your documents on Google Docs.
									If you wish to remove your authorization token, please click <b>Unauthorize</b> below.<br /><br />
									This does not remove permissions for PlantUML Doc Integration. You will need to do that in your Google account settings.
								</LargeIconDialogContent>
							</Then>
							<Else>
								<LargeIconDialogContent iconClass="color-danger" icon={<LockOutlined className="large-icon" />} caption="Unauthorized">
									You need to authorize PlantUML Doc Integration to read your documents on Google Docs in order to use it.
									We do not keep your data. We simply parse it and draw diagrams from it.<br /><br />
									You will be automatically asked to authorize this app when you open a document. If you want to authorize it now, click the <b>Authorize</b> button below.
								</LargeIconDialogContent>
							</Else>
						</If>
						<DialogActions>
							<Button color="primary" onClick={() => this.props.onClose()}>Cancel</Button>
							<If condition={this.state.authorized}>
								<Then>
									<Button variant="contained" color="primary" onClick={() => this.unauthorize()} >Unauthorize</Button>
								</Then>
								<Else>
									<Button variant="contained" color="primary" onClick={() => this.authorize()}> Authorize</Button>
								</Else>
							</If>
						</DialogActions>
					</Else>
				</If>
			</DialogBase >
		);
	};
};

