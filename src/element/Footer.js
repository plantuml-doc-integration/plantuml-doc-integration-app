
import React from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
export default function Footer() {
	return (
		<footer>
			<Typography variant="caption" className="text-light">
				&copy; PlantUML Doc Integration 2020 | <a href="https://github.com/plantuml-doc-integration/plantuml-doc-integration.github.io">Source on GitHub</a> | <Link to="/privacy">Privacy Policy</Link> | <Link to="/terms">Terms and Conditions</Link>
			</Typography>
		</footer>
	)
}