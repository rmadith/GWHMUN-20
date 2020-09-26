var nestpages = nestpages || {};

/**
* Manual Sync functionality for nested view
* @package Nest Pages
* @author Kyle Phillips - https://github.com/kylephillips/wp-nested-pages
*/
nestpages.ManualSync = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.activeBtn = '';

	plugin.bindEvents = function()
	{
		$(document).on('click', nestpages.selectors.manualMenuSync, function(e){
			e.preventDefault();
			plugin.activeBtn = $(this);
			plugin.syncMenu();
		});
		$(document).on('click', nestpages.selectors.manualOrderSync, function(e){
			e.preventDefault();
			plugin.activeBtn = $(this);
			plugin.syncOrder();
		});
	}

	plugin.syncMenu = function()
	{
		plugin.loading(true);

		$.ajax({
			url: ajaxurl,
			type: 'post',
			datatype: 'json',
			data: {
				action : nestpages.formActions.manualMenuSync,
				nonce : nestpages.jsData.nonce,
				post_type : nestpages.jsData.posttype,
				syncmenu : 'sync'
			},
			success: function(data){
				if (data.status === 'error'){
					$(nestpages.selectors.errorDiv).text(data.message).show();
					$(nestpages.selectors.loadingIndicator).hide();
				} else {
					plugin.loading(false);
				}
			}
		});
	}

	plugin.syncOrder = function()
	{
		plugin.loading(true);
		var nestingClass = new nestpages.Nesting;
		nestingClass.syncNesting(true, plugin.loading(false));
	}

	plugin.loading = function(loading)
	{
		if ( loading ){
			$(plugin.activeBtn).addClass('disabled');
			$(nestpages.selectors.loadingIndicator).show();
			return;
		}
		$(plugin.activeBtn).removeClass('disabled');
		$(nestpages.selectors.loadingIndicator).hide();
	}

	return plugin.bindEvents();
}