import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
export default function SideMenu({ before, elements, after, ...other }) {
	return (
		<Drawer {...other}>
			{before}
			<Divider />
			{elements.map((section, i) =>
				<div>

					<List key={i}>
						{section.map((element, j) =>
							<ListItem button onClick={element.onClick} key={j}>
								<ListItemIcon>{element.icon}</ListItemIcon>
								<ListItemText primary={element.text} />
							</ListItem>
						)}
					</List>
					<Divider />
				</div>
			)}
			{after}
		</Drawer>
	);
}
