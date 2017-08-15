import "./Gif.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadGif } from "actions/gifs";
import Loader from "components/Loader";

class Gif extends React.Component {
	componentDidMount() {
		this.props.loadGif(this.props.gifId);
	}

	render() {
		const { gif, isLoading, error } = this.props;
		let content;

		if (isLoading) {
			content = <Loader/>;
		}
		else if (!gif) {
			content = <div className="Gif-error">{error}</div>;
		}
		else {
			console.log(gif);
			content = (
				<div>
					<img className="Gif-image" src={gif.images.original.url}/>
					<div className="Gif-author">
						<a href={gif.url}>
							Posted {gif.username ? `by ${gif.username}` : "anonymously"}
						</a>
					</div>
					<div className="Gif-source">
						Originally posted on {gif.source_tld}
					</div>
					<div className="Gif-rating">
						Rated {gif.rating.toUpperCase()}
					</div>
				</div>
			);
		}

		return (
			<div className="Gif">
				{content}
			</div>
		);
	}
}

Gif.propTypes = {
	// State
	gifId: PropTypes.string.isRequired,
	gif: PropTypes.shape({
		url: PropTypes.string,
		username: PropTypes.string,
		tags: PropTypes.arrayOf(PropTypes.string),
		images: PropTypes.shape({
			original: PropTypes.shape({
				url: PropTypes.string,
			}),
		}),
	}),
	isLoading: PropTypes.bool,
	error: PropTypes.string,

	// Actions
	loadGif: PropTypes.func,
};

function mapStateToProps(state, props) {
	const { activeGif, error, isLoading } = state.gifs;
	return {
		gifId: props.match.params.gifId,
		gif: activeGif,
		error,
		isLoading,
	};
}

export default connect(mapStateToProps, { loadGif })(Gif);
