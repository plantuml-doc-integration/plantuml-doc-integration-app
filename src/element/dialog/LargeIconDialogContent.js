import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { DialogContent, Typography, DialogContentText } from '@material-ui/core';
export default function LargeIconDialogContent({ iconClass, icon, caption, children }) {
	return (
		<DialogContent>
			<div className={clsx("align-center", iconClass)}>
				{icon}
				<Typography variant="h5">{caption}</Typography>
			</div>
			<DialogContentText>
				{children}
			</DialogContentText>
		</DialogContent>
	);
};
LargeIconDialogContent.propTypes = {
	centerClass: PropTypes.any,
	icon: PropTypes.element.isRequired,
	caption: PropTypes.string.isRequired,
	children: PropTypes.any
}