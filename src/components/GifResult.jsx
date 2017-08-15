import "./GifResult.scss";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class GifResult extends React.Component {
	render() {
		const { gif } = this.props;

		return (
			<Link className="GifResult" to={`/gifs/${gif.id}`}>
				<img
					className="GifResult-image"
					src={gif.images.fixed_width.url}
					style={{ height: gif.images.fixed_width.height }}
				/>
			</Link>
		);
	}
}

GifResult.propTypes = {
	gif: PropTypes.shape({
		id: PropTypes.string,
		images: PropTypes.shape({
			fixed_width: PropTypes.shape({
				url: PropTypes.string,
				height: PropTypes.oneOf(PropTypes.number, PropTypes.string),
			}),
		}),
	}),
};

export default GifResult;
