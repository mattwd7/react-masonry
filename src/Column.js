var React = require('react');
var Photo = require('./Photo.js');

var Column = React.createClass({
	propTypes: {
		photos: React.PropTypes.array,
		updateFavorites: React.PropTypes.func
	},

	render: function(){
		var self = this;
		var photoDisplay = this.props.photos.map(function(photo){
			return <Photo source={photo.image_url} viewCount={photo.times_viewed} 
				description={photo.description} name={photo.name} key={photo.id} updateFavorites={self.props.updateFavorites} />;
		});
		return (
			<div className="column">
				{photoDisplay}
			</div>
		)
	}
})

module.exports = Column;