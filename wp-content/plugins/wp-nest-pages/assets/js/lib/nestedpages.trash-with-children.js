var nestpages = nestpages || {};

/**
* Trash post with all children
* @package Nest Pages
* @author Kyle Phillips - https://github.com/kylephillips/wp-nested-pages
*/
nestpages.TrashWithChildren = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.post_id = ''; // The parent/source post ID

	plugin.bindEvents = function()
	{
		$(document).on('click', nestpages.selectors.trashWithChildrenButton, function(e){
			e.preventDefault();
			plugin.post_id = $(this).attr('data-post-id');
			plugin.trash();
		});
	}

	// Trash the posts
	plugin.trash = function()
	{
		$.ajax({
			url : nestpages.jsData.ajaxurl,
			type : 'post',
			data : {
				action : nestpages.formActions.trashWithChildren,
				nonce : nestpages.jsData.nonce,
				post_id : plugin.post_id,
				screen : nestpages.current_page
			},
			success : function(data){
				window.location.replace(data.redirect);
			}, error : function(data){
				console.log(data);
			}
		});
	}

	return plugin.bindEvents();
}