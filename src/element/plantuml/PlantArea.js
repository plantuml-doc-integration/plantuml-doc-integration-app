import React from 'react';
import PropTypes from 'prop-types';
import { Switch, FormControlLabel } from '@material-ui/core';
import { CopyBlock, monokai } from 'react-code-blocks';
import PlantImage from './PlantImage';
import update from 'immutability-helper';
export default class PlantArea extends React.Component {
	propTypes = {
		title: PropTypes.string,
		uml: PropTypes.string
	};
	state = {
		showSource: false
	};
	setShowSource = (show) => {
		this.setState(update(this.state, {
			showSource: { $set: show }
		}));
	};
	render() {
		return (
			<div>
				<FormControlLabel control={
					<Switch
						checked={this.state.show}
						onChange={(e) => this.setShowSource(e.target.checked)}
						name="showSource"
						color="primary"
					/>
				}
					label="Show Source Code"
				/>
				{
					this.state.showSource &&
					<CopyBlock
						text={this.props.uml}
						showLineNumbers={true}
						theme={monokai}
						codeBlock
					/>

				}
				<PlantImage uml={this.props.uml} title={this.props.title} />
			</div>
		);
	};
}
