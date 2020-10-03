import React from 'react'
import PropTypes from 'prop-types';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons/';
import { If, Then, Else, When } from 'react-if';
import PlantImage from './PlantImage';
export default function PlantPaper({ valid, data, src, id }) {
	return (
		<Accordion>
			<AccordionSummary expandIcon={<ExpandMore />}
				aria-controls={`diagram${id}-content`}
				id={`diagram${id}-header`}>
				<If condition={valid}>
					<Then>
						<Typography variant="h6">{data.title ? data.title : "Untitled"}</Typography>
					</Then>
					<Else>
						<Typography variant="h6">Invalid Diagram</Typography>
					</Else>
				</If>
			</AccordionSummary>
			<When condition={valid}>
				<AccordionDetails>
					<PlantImage src={src} title={data.title} />
				</AccordionDetails>
			</When>
		</Accordion>
	);
};
PlantPaper.propTypes = {
	valid: PropTypes.bool.isRequired,
	data: PropTypes.object,
	src: PropTypes.string,
	id: PropTypes.number.isRequired
}