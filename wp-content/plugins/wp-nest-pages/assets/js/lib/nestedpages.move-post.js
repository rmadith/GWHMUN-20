var nestpages = nestpages || {};

/**
* Move a Post Up or Down in the list
* @package Nest Pages
* @author Kyle Phillips - https://github.com/kylephillips/wp-nested-pages
*/
nestpages.MovePost = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.formatter = new nestpages.Formatter;
	plugin.nesting = new nestpages.Nesting;
	plugin.activeRow;

	plugin.selectors = {
		moveToTop : 'data-push-to-top',
		moveToBottom : 'data-push-to-bottom'
	}

	plugin.bindEvents = function()
	{
		$(document).ready(function(){
			plugin.disableTopOnFirst();
			plugin.disableBottomOnLast();
		});
		$(document).on('click', '[' + plugin.selectors.moveToTop + ']', function(e){
			e.preventDefault();
			if ( $(this).hasClass('disabled') ) return;
			plugin.activeRow = $(this).closest(nestpages.selectors.rows);
			plugin.moveToTop();
		});
		$(document).on('click', '[' + plugin.selectors.moveToBottom + ']', function(e){
			e.preventDefault();
			if ( $(this).hasClass('disabled') ) return;
			plugin.activeRow = $(this).closest(nestpages.selectors.rows);
			plugin.moveToBottom();
		});
	}

	/**
	* Move a post to the top of its list
	*/
	plugin.moveToTop = function()
	{
		var parent = $(plugin.activeRow).parent(nestpages.selectors.lists);
		var first = $(parent).find(nestpages.selectors.rows).first();
		$(plugin.activeRow).insertBefore(first);
		plugin.formatter.setBorders();
		$(document).click(); // Close Dropdowns
		plugin.nesting.syncNesting();
		plugin.disableTopOnFirst();
		plugin.disableBottomOnLast();
	}

	/**
	* Move a post to the bottom of its list
	*/
	plugin.moveToBottom = function()
	{
		var parent = $(plugin.activeRow).parent(nestpages.selectors.lists);
		var last = $(parent).children(nestpages.selectors.rows).last();
		$(plugin.activeRow).insertAfter(last);
		plugin.formatter.setBorders();
		$(document).click(); // Close Dropdowns
		plugin.nesting.syncNesting();
		plugin.disableTopOnFirst();
		plugin.disableBottomOnLast();
	}

	plugin.disableTopOnFirst = function()
	{
		var lists = $(nestpages.selectors.lists);
		$.each(lists, function(){
			$(this).find('[' + plugin.selectors.moveToTop + ']').removeClass('disabled');
			var first = $(this).find(nestpages.selectors.rows).first();
			$(first).find('[' + plugin.selectors.moveToTop + ']').addClass('disabled');
		});
	}

	plugin.disableBottomOnLast = function()
	{
		var lists = $(nestpages.selectors.lists);
		$.each(lists, function(){
			$(this).find('[' + plugin.selectors.moveToBottom + ']').removeClass('disabled');
			var last = $(this).find(nestpages.selectors.rows).last();
			$(last).find('[' + plugin.selectors.moveToBottom + ']').addClass('disabled');
		});
	}

	return plugin.bindEvents();
}