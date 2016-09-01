var React = require('react');
var Column = require('./Column.js');
var Banner = require('./Banner.js');
var $ = require('jquery');

var App = React.createClass({
  getInitialState: function(){
  	return {
  		currentCol: 0,
  		page: 1,
  		favoritesCount: 0,
  		photos: {
  			col0: [],
  			col1: [],
  			col2: [],
  			col3: [],
  			col4: [],
  		}
  	}
  },

  render: function() {
  	var columns = [];
  	for (var i=0; i<5; i++){
  		columns.push(<Column id={'col-' + i} photos={this.state.photos['col' + i]} key={'col-' + i} updateFavorites={this.updateFavorites} />)
  	}
    return (
		<div>
			<Banner favoritesCount={this.state.favoritesCount}/>
			<div className='columns'>
				{columns}
			</div>
		</div>
    )
  },

  getPhotos: function(){
  	var self = this,
  		page = self.state.page;
  	$.ajax({
  		type: 'GET',
  		url: 'https://api.500px.com/v1/photos',
  		data: { consumer_key: 'QuCiFaEi1Yd14J36WooombZ5UIZO32HtNhVGKgr2', feature: 'popular', image_size: 4, page: page, rpp: 20 },
  		success: function(data){
  			self.distributePhotos(data.photos);
  			self.setState({page: page + 1});
  		}
  	})
  },

  distributePhotos: function(photos){
  	var photoCount = photos.length,
	  	col = this.state.currentCol,
		allPhotos = this.state.photos;
  	for (var i=0; i<photoCount; i++){
  		var photo = photos[i];
  		allPhotos['col' + (col % 5)].push(photo);
  		col += 1;
  	}
  	this.setState({currentCol: col, photos: allPhotos});
  },

  componentDidMount: function(){
  	this.getPhotos();
  	window.addEventListener('scroll', this.handleScroll)
  },

  handleScroll: function(){
	var body = document.body,
	    html = document.documentElement;
	var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
  	
  	if(window.innerHeight + window.scrollY >= height) {
       this.getPhotos();
	}
  },

  updateFavorites: function(addition){
  	var count = this.state.favoritesCount;
  	this.setState({favoritesCount: addition ? count + 1 : count - 1})
  }

});

module.exports = App;