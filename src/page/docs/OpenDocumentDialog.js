import React from 'react';
import PropTypes from 'prop-types';
import DialogBase from '../../element/dialog/DialogBase';
import { Button, DialogActions } from '@material-ui/core';
import InputDialogContent from '../../element/dialog/InputDialogContent';
export default class OpenDocumentDialog extends React.Component {
	static propTypes = {
		onClose: PropTypes.func.isRequired,
		open: PropTypes.bool.isRequired
	};
	state = {
		input: "",
		error: ""
	};
	reset() {
		this.setState({ input: "", error: "" })
	}
	onChangeInput(input) {
		this.setState({ input, error: "" });
	};
	onClickClose(proceed) {
		if (!proceed) {
			this.props.onClose(false);
		} else {
			if (this.validateInput(this.state.input)) {
				this.props.onClose(this.processInput(this.state.input));
			}
		}
	};
	validateInput(input) {
		if (!input) {
			this.setState({ error: "This is required" });
			return false;
		}
		return true;
	};
	processInput(input) {
		const prefix = 'https://docs.google.com/document/d/';
		if (input.startsWith(prefix)) {
			input = input.substring(prefix.length);
			const slash = input.indexOf('/');
			if (slash > 0) {
				input = input.substring(0, slash);
			}
		}
		return input;
	};
	render() {
		return (
			<DialogBase fullWidth open={this.props.open} title="Open from Google Docs" onReset={() => this.reset()}>
				<InputDialogContent label="Document Link/Id" value={this.state.input} onChange={(v) => this.onChangeInput(v)} error={this.state.error}>
					Please enter the document link or id
				</InputDialogContent>
				<DialogActions>
					<Button color="primary" onClick={() => this.onClickClose(false)}>Cancel</Button>
					<Button variant="contained" color="primary" onClick={() => this.onClickClose(true)}>Open</Button>
				</DialogActions>
			</DialogBase>
		);
	};
};