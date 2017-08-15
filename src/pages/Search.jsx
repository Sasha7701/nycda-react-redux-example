import "./Search.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchGifs } from "actions/gifs";
import GifResult from "components/GifResult";
import Loader from "components/Loader";

class Search extends React.Component {
	state = {
		search: "",
	};

	_handleChange = (ev) => {
		this.setState({ search: ev.target.value });
	};

	_handleSubmit = (ev) => {
		ev.preventDefault();
		this.props.searchGifs(this.state.search);
	};

	render() {
		let content;

		if (this.props.isLoading) {
			content = <Loader/>;
		}
		else {
			content = [0, 1, 2].map((col) => {
				return (
					<div className="Search-results-column column">
						{this.props.gifs
							.filter((gif, idx) => idx % 3 === col)
							.map((gif) => {
								return <GifResult gif={gif} key={gif.id}/>;
							})
						}
					</div>
				);
			});
		}

		return (
			<div className="Search">
				<form className="Search-form" onSubmit={this._handleSubmit}>
					<input
						className="Search-form-input"
						placeholder="Search for gifs"
						value={this.state.search}
						onChange={this._handleChange}
					/>
					<button className="Search-form-submit">Submit</button>
				</form>

				<div className="Search-results columns">
					{content}
				</div>
			</div>
		);
	}
}

Search.propTypes = {
	// State
	gifs: PropTypes.array.isRequired,
	isLoading: PropTypes.bool,

	// Actions
	searchGifs: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
	const { gifs, isLoading } = state.gifs;

	return {
		gifs,
		isLoading,
	};
}

export default connect(mapStateToProps, { searchGifs })(Search);
