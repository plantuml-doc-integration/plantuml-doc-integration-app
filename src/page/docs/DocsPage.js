import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import { ErrorOutlineOutlined } from '@material-ui/icons';
import { If, Then, Else, When } from 'react-if';
import AuthorizeDialog from '../auth/AuthorizeDialog';
import HeaderBar from '../../element/HeaderBar';
import PlantExpansionPanel from '../../element/plantuml/PlantExpansionPanel';

import { tokenStore, redirectDocIdStore } from '../../util/Store';
import parseDiagramData from '../../data/DiagramParser';

export default class DocPage extends React.Component {
	static propTypes = {
		match: PropTypes.any.isRequired,
		history: PropTypes.any.isRequired,
		location: PropTypes.any.isRequired,
	}
	state = {
		loading: true,
		error: false,
		document: undefined,
	};
	componentDidMount() {
		this.updateDocument();
	}
	componentDidUpdate(prevProps) {
		if (this.props.match.params.docId !== prevProps.match.params.docId) {
			this.updateDocument();
		}

	}
	updateDocument() {
		const docId = this.props.match.params.docId;
		if (!docId) {
			this.props.history.push('/');
			return;
		}
		redirectDocIdStore.store(docId);
		const authorized = tokenStore.exists();
		if (authorized) {
			this.loadDocument();
		}
	}
	loadDocument = async () => {
		this.setState({
			loading: true,
			error: false,
			document: undefined
		});
		try {
			const response = await axios.get(`/docs/${this.props.match.params.docId}`, { headers: { authorization: `bearer ${tokenStore.load()}` } });

			if (response.status === 200) {
				console.log(response);
				const document = {
					title: response.data.title,
					documentId: response.data.documentId,
					diagrams: response.data.rawData.map(parseDiagramData)
				}
				console.log(document.diagrams);
				this.setState({ document, loading: false, error: false });
				//this.props.changeAppTitle(response.data.title);
			} else {
				console.log(response);
				this.setState({ error: true, loading: false, document: undefined });
			}
		} catch (err) {
			if (err.response && err.response.status === 401) {
				tokenStore.clear();
			}
			console.log(err);
			this.setState({ error: true, loading: false, document: undefined });
		}

	};
	render() {
		const authorized = tokenStore.exists();
		return (
			<div>
				<HeaderBar title={this.state.loading ? "Loading Title..." : this.state.error ? "Error" : this.state.document ? this.state.document.title : "Unknown Document"} />
				<AuthorizeDialog open={!authorized} onClose={() => this.props.history.push('/')} />
				<If condition={this.state.loading}>
					<Then>
						<CircularProgress />Loading
					</Then>
					<Else>
						<If condition={this.state.error}>
							<Then>
								<ErrorOutlineOutlined />Error
							</Then>
							<Else>
								<When condition={!!this.state.document}>
									{() =>
										<If condition={this.state.document.diagrams.filter(diagram => diagram.valid).length === 0}>
											<Then>
												No Diagram
											</Then>
											<Else>
												<div className="page">
													{this.state.document.diagrams.map((diagram, i) => (
														<PlantExpansionPanel key={i} id={i} {...diagram} />
													))}
												</div>
											</Else>
										</If>
									}
								</When>
							</Else>
						</If>
					</Else>
				</If>
			</div>
		);
	};
};