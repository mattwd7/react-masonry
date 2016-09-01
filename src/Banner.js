var React = require('react');

var Banner = React.createClass({
	propTypes: {
		favoritesCount: React.PropTypes.number
	},

	render: function(){
		return (
			<div id='banner'>
				<h1>Welcome to 500px - Masonry Style!</h1>
				<div>
					Favorites: {this.props.favoritesCount}
				</div>
			</div>
		)
	}
});

module.exports = Banner;