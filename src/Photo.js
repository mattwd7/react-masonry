var React = require('react');

var Photo = React.createClass({
	propTypes: {
		source: React.PropTypes.string.isRequired,
		viewCount: React.PropTypes.number,
		name: React.PropTypes.string,
		description: React.PropTypes.string,
		updateFavorites: React.PropTypes.func
	},
	getInitialState: function(){
		return {
			klasses: 'photo'
		}
	},
	handleClick: function(){
		var klasses = this.state.klasses.split(" "),
			index = klasses.indexOf('favorited');
		if (index > -1){
			klasses.splice(index, 1);
			this.props.updateFavorites(false);
		} else {
			klasses.push('favorited');
			this.props.updateFavorites(true);
		}
		this.setState({klasses: klasses.join(" ")});
	},
	render: function(){
		return (
			<div className={this.state.klasses} onClick={this.handleClick} >
				<div className='views'>
					Views: {this.props.viewCount}
				</div>
				<img src={this.props.source} alt='testing' />
				<div className='info'>
					<div className='name'>{this.props.name}</div>
					<div className='description'>{this.props.description}</div>
				</div>
			</div>
		)
	}
})

module.exports = Photo;