var nestpages = nestpages || {};

/**
* Toggles Menu Elements
* @package Nest Pages
* @author Kyle Phillips - https://github.com/kylephillips/wp-nested-pages
*/
nestpages.MenuToggle = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.formatter = new nestpages.Formatter;

	plugin.bindEvents = function()
	{
		$(document).on('click', nestpages.selectors.childToggleLink, function(e){
			e.preventDefault();
			plugin.toggleSingleMenu($(this));
		});
		$(document).on('click', nestpages.selectors.toggleAll, function(e){
			e.preventDefault();
			plugin.toggleAllMenus();
		});
	}


	// Toggle individual submenus
	plugin.toggleSingleMenu = function(button)
	{
		var submenu = $(button).parent(nestpages.selectors.childToggle).parent(nestpages.selectors.row).siblings('ol');
		$(button).toggleClass('open');
		$(submenu).toggle();
		plugin.formatter.setBorders();
		plugin.formatter.setNestedMargins();
		plugin.syncUserToggles();
	}


	// Toggle All Submenus
	plugin.toggleAllMenus = function()
	{
		var button = nestpages.selectors.toggleAll;
		if ( $(button).attr('data-toggle') === 'closed' ){
			$(nestpages.selectors.lists).show();
			$(button).attr('data-toggle', 'opened').text(nestpages.jsData.collapseText);
			$(nestpages.selectors.childToggle + ' a').addClass('open');
			plugin.formatter.setBorders();
			plugin.syncUserToggles();
			return;
		}
		
		$(nestpages.selectors.lists).not($(nestpages.selectors.lists)[0]).hide();
		$(button).attr('data-toggle', 'closed').text(nestpages.jsData.expandText);
		$(nestpages.selectors.childToggle + ' a').removeClass('open');
		plugin.formatter.setBorders();
		plugin.syncUserToggles();
	}


	// Get an array of visible rows
	plugin.visibleRowIDs = function()
	{
		var visible_ids = [];
		var visible = $(nestpages.selectors.rows + ':visible');
		$.each(visible, function(i, v){
			var id = $(this).attr('id');
			visible_ids.push(id.replace("menuItem_", ""));
		});
		return visible_ids;
	}


	// Save the user's toggled menus
	plugin.syncUserToggles = function()
	{
		$.ajax({
			url: nestpages.jsData.ajaxurl,
			type: 'post',
			datatype: 'json',
			data: {
				action : nestpages.formActions.syncToggles,
				nonce : nestpages.jsData.nonce,
				ids : plugin.visibleRowIDs(),
				posttype : nestpages.jsData.posttype
			},
			success: function(data){
				if ( data.status !== 'success' ){
					console.log('There was an error saving toggled pages.');
				}
			}
		});
	}


	return plugin.bindEvents();
}