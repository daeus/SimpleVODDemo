var movie_url = 'https://demo2697834.mockable.io/movies';
var loading = '<img src="vendor/slick/ajax-loader.gif" />';
var backend_url = 'http://vod-daeus.rhcloud.com/backend/api';

$( document ).ready(function() 
{
	// load the first page
	load_page_all();

	// listen on video selection
	$('.content').on('click', '.node', function(){
		var video_url = $(this).attr('data-src');	
		var video_title = $(this).attr('data-title');
		play_selected_video(video_url, video_title);
	});

	// Key listener
	$(document).keydown(function(e){
		e.preventDefault(); // prevent the default action (scroll / move caret)
		switch(e.which) {
			case 13:
				$('.slick-active').click();
				break;
			case 27:
				destroy_video();
				break;
			case 37: // left
				$('.slick-prev').click();
				break;

			case 38: // up
				break;

			case 39: // right
				$('.slick-next').click();
				break;
			case 40: // down
				break;

			default: return; // exit this handler for other keys
		}

	});

	// listen on video end
	$('.content').on('ended', 'video',function(){
		destroy_video();
	});
});

function load_page_all()
{
	//initialise data
	obj = {
		loc: $('.content'),
		url: movie_url, 
		type: 'get', 
	}

	jquery_send(obj, function(o, a){
		if(o)
		{
			console.log(o.entries);
			slider_generator(o.entries);	
		} else{
			console.log('Initialising slider error');
		}
	});
}

function set_main_loading()
{
	$('.content').html(loading);
}

function load_page_history()
{
	set_main_loading();

	var html = '<h2>Videos you have watched: </h2>';

	obj = {
		loc: $('.content'),
		url: backend_url,
		type: 'get',
	}

	jquery_send(obj, function(o, a){
		if(o)
		{
			console.log(o);
			html += '<ul>';
			$.each(o, function(key, value){
				html += '<li>'+value+'</li>';
			});	
			html += '</ul>';
		}
		$('.content').html(html);
		
	});

}

function load_page_aboutus()
{
	set_main_loading();
	$('.content').load('templates/aboutus.html');
}

function post_history(title)
{
	obj = {
		url: backend_url,
		type: 'post',
		data: {'title':title}
	}
	jquery_send(obj, function(o, a){
		console.log(o);
	});

}

//generate slider
function slider_generator(data)
{
	$('.vod-slider').slick('unslick');
	$('.vod-slider').remove();

	var html = '<div class="video-player"><div class="video-player--player"></div><div class="video-player--title"></div></div>';
	html += '<div class="vod-slider">';

	var first_item = true;
	$.each(data, function(key, value){
		html += '<div class="node" data-src="'+ value.contents[0].url+'" data-title="'+ value.title +'">' + 
					'<div class="node--img"><img src="'+ value.images[0].url+'" /></div>' +
					'<div class="node--description"></div>' + 
				'</div>'; 
		first_item = false;
	});

	html += '</div>';

	$('.content').html(html);

	$('.vod-slider').slick({
		arrows: true,
		focusOnSelect: true,
		speed: 300,
		infinite: true,
		slidesToShow: 1,
		centerMode: true,
		variableWidth: true
	});

}

//Function for displaying result
function html_show_callback(o, a){
	setTimeout(function(){ a.loc.html(o.html); }, 200);
}

function play_selected_video(url, title)
{
	post_history(title);

	var html = '<div class="video-container"><video id="selected-video" autoplay="autoplay" class="video-js" controls preload="auto" onended="destroy_video()" width="100%" data-setup="{}">' + 
		'<source src="'+ url +'" type="video/mp4">' +
		'<p class="vjs-no-js">' +
		'To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p></video></div>';

	$('.video-player--player').html(html);
	$('.video-player--title').html(title);
	
	//reload video js
	/*
	if(video_player_obj)
	{
		video_player_obj.dispose();
	}
	video_player_obj = videojs("selected-video", {}, function(){
		this.load();
		this.play(); // force autoplay -stooch
		this.enterFullWindow();
		this.on('ended', function() {
			alert('video is done!');
		});
	});
	*/
}

function destroy_video()
{
	$('.video-player--player').html('');
	$('.video-player--title').html('');
}

//ajax request
function jquery_send(obj, x_callback){
	//call loading
	if(obj.loc){
		obj.loc.html(loading);
	}

	//set variables 
	if (!obj.type)
		obj.type = 'post';

	if (!obj.data)
		obj.data = '';

	if (!obj.dataType)
		obj.dataType = "json";

	if (!obj.processData)
		obj.processData = true;

	// Run the Ajax request
	$.ajax({
		type: obj.type,
		url: obj.url,
		data: obj.data,
		async: true,
		'iefix': true,
		dataType: obj.dataType,
		processData: obj.processData,
		success: function(output) {
			//console.log(output);
			if (!obj.args){
				obj.args = null;
			}
			x_callback(output, obj.args);
		},
		error: function(xhr, textStatus, errorThrown) {
			console.log("ERROR: jquery_send failure\n");
			console.log(xhr);
		}
	});
}
