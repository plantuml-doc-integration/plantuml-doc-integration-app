import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Tooltip } from '@material-ui/core';
import { InsertDriveFileOutlined, SettingsApplicationsOutlined, AccountCircleOutlined } from '@material-ui/icons';
import AuthorizeDialog from '../page/auth/AuthorizeDialog';
import OpenDocumentDialog from '../page/docs/OpenDocumentDialog';
class HeaderBar extends React.Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
	}
	state = {
		openAuthorizeDialog: false,
		openOpenDocumentDialog: false
	}
	setOpenDocument(openDocument) {
		this.setState({ openOpenDocumentDialog: false });
		if (openDocument) {
			this.props.history.push(`/docs/${openDocument}`);
		}
	}
	render() {
		return (
			<header id="header">
				<AppBar position="static">
					<Toolbar>
						<Tooltip title="Open Document">
							<IconButton edge="start" color="inherit" onClick={() => this.setState({ openOpenDocumentDialog: true })}>
								<InsertDriveFileOutlined className="header-icon" />
							</IconButton>
						</Tooltip>

						<Typography variant="h5">
							{this.props.title}
						</Typography>
						<div className="toolbar-align-right">
							<Tooltip title="Authorization">
								<IconButton edge="start" color="inherit" onClick={() => this.setState({ openAuthorizeDialog: true })}>
									<AccountCircleOutlined className="header-icon" />
								</IconButton>
							</Tooltip>
							{/* <Tooltip title="Settings">
								<IconButton edge="start" color="inherit">
									<SettingsApplicationsOutlined className="header-icon" />
								</IconButton>
							</Tooltip> */}
						</div>

					</Toolbar>
				</AppBar >
				<OpenDocumentDialog open={this.state.openOpenDocumentDialog} onClose={(document) => this.setOpenDocument(document)} />

				<AuthorizeDialog open={this.state.openAuthorizeDialog} onClose={() => this.setState({ openAuthorizeDialog: false })} />
			</header>

		);
	}
}
export default withRouter(HeaderBar);

