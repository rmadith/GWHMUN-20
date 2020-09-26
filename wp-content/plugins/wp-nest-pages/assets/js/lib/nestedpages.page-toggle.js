var nestpages = nestpages || {};

/**
* Toggle Page Rows
* @package Nest Pages
* @author Kyle Phillips - https://github.com/kylephillips/wp-nested-pages
*/
nestpages.PageToggle = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.activeButton = '';

	plugin.formatter = new nestpages.Formatter;

	plugin.init = function()
	{
		plugin.bindEvents();
	}

	plugin.bindEvents = function()
	{
		$(document).on('click', nestpages.selectors.toggleHidden, function(e){
			e.preventDefault();
			plugin.activeButton = $(this);
			plugin.toggleHidden();
		});
		$(document).on('click', nestpages.selectors.toggleStatus, function(e){
			e.preventDefault();
			plugin.toggleStatus($(this));
		});
	}


	// Toggle Hidden Pages
	plugin.toggleHidden = function()
	{
		var button = $(plugin.activeButton);
		var action = $(button).attr('href');

		if ( action == '#show' ){
			$(button).attr('href', '#hide').text(nestpages.jsData.showHiddenText);
			$(nestpages.selectors.hiddenRows).removeClass('shown').hide();
			plugin.formatter.updateSubMenuToggle();
			plugin.formatter.setBorders();
			return;
		}

		if ( action == '#hide' ){
			$(button).attr('href', '#show').text(nestpages.jsData.hideHiddenText);
			$(nestpages.selectors.hiddenRows).addClass('shown').show();
			plugin.formatter.updateSubMenuToggle();
			plugin.formatter.setBorders();
		}
	}


	// Toggle Pages based on status
	plugin.toggleStatus = function(button)
	{
		var target = $(button).attr('href');
		target = target.substring(1);
		$(nestpages.selectors.syncCheckbox).attr('disabled', false);
		$(nestpages.selectors.toggleStatus).removeClass('active');
		$(button).addClass('active');
		if ( target == 'draft' ){
			$(nestpages.selectors.syncCheckbox).attr('disabled', true);
			$('.' + target).addClass('nested-visible');
		}
		if ( target == 'all' ){
			$(nestpages.selectors.rows).show();
			return;
		}
		$(nestpages.selectors.rows).hide();
		$('.' + target).show();
		return;
	}


	return plugin.init();

}