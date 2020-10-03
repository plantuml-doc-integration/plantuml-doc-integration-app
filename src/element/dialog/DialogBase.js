import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle } from '@material-ui/core';

export default class CommonDialog extends React.Component {
	static propTypes = {
		open: PropTypes.bool.isRequired,
		title: PropTypes.string.isRequired,
		children: PropTypes.any,
		onReset: PropTypes.func
	};
	componentDidUpdate(prevProps) {
		if (prevProps.open !== this.props.open && this.props.open) {
			this.props.onReset && this.props.onReset();
		}
	}
	render() {
		return (
			<div>
				<Dialog open={this.props.open} {...this.props}>
					<DialogTitle>{this.props.title}</DialogTitle>
					{this.props.children}
				</Dialog>
			</div>
		);
	}
};
