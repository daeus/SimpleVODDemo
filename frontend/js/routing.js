$(document).ready(function(){

	$('.main-menu').on('click', 'li', function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		page = $(this).attr('item-action');
		setTimeout('load_page_'+ page +'()',0);	
	});

});
