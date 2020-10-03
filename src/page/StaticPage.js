import React from 'react';
import PropTypes from 'prop-types';
import htmlToReact from 'html-to-react';
import HeaderBar from '../element/HeaderBar';
import { Typography, Card, CardContent, List, ListItem } from '@material-ui/core';

const parser = new htmlToReact.Parser();
const processNodeDef = new htmlToReact.ProcessNodeDefinitions(React);
const textNodeMap = {
	p: "body1",
	h6: "h6",
	h5: "h6",
	h4: "h6",
	h3: "h5",
	h2: "h4",
	h1: "h3",
}
const processInstructions = [
	{
		shouldProcessNode: node => {
			return textNodeMap[node.name];
		},
		processNode: (node, children, index) => {
			return <Typography key={index} variant={textNodeMap[node.name]}>{children}</Typography>;
		}
	}, {
		shouldProcessNode: node => {
			return node.name === 'ul';
		},
		processNode: (_, children, index) => {
			return <List key={index}>{children}</List>;
		}
	}, {
		shouldProcessNode: node => {
			return node.name === 'li';
		},
		processNode: (_, children, index) => {
			return <ListItem key={index}><Typography variant="body1" component="span">{children}</Typography></ListItem>;
		}
	}, {
		shouldProcessNode: () => true,
		processNode: processNodeDef.processDefaultNode,
	}
];

export default function StaticPage({ pageHtml, title }) {
	return (
		<div>
			<HeaderBar title={title} />
			<div className="page static-page">
				<Card >
					<CardContent>
						{parser.parseWithInstructions(pageHtml, () => true, processInstructions)}
					</CardContent>
				</Card>
			</div>

		</div>
	);
};

StaticPage.propTypes = {
	pageHtml: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
}