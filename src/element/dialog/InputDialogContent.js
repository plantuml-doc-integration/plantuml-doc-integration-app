import React from 'react';
import PropTypes from 'prop-types';
import { DialogContent, DialogContentText, TextField } from '@material-ui/core';

export default function InputDialogContent({ children, label, value, onChange, error }) {
	return (
		<DialogContent>
			<DialogContentText>{children}</DialogContentText>
			<TextField
				margin="normal"
				autoFocus
				label={label}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				error={!!error}
				helperText={error ? error : " "}
				required
				fullWidth
			/>
		</DialogContent>
	);
};
InputDialogContent.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	error: PropTypes.string.isRequired
}