var nestpages = nestpages || {};

/**
* Sync the "sync menu" setting
* @package Nest Pages
* @author Kyle Phillips - https://github.com/kylephillips/wp-nested-pages
*/
nestpages.SyncMenuSetting = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.formatter = new nestpages.Formatter;

	plugin.init = function()
	{
		plugin.bindEvents();
	}

	plugin.bindEvents = function()
	{
		$(document).ready(function(){ // catches trash updates
			if ( nestpages.manual_menu_sync === '1' ) return;
			if ( nestpages.syncmenu === '1' ) plugin.syncSetting(); 
		});
		$(document).on('change', nestpages.selectors.syncCheckbox, function(){
			plugin.syncSetting();
		});
	}

	// Sync the "Sync menu" preference / setting
	plugin.syncSetting = function()
	{

		if ( nestpages.jsData.posttype !== 'page' ) return;
		if ($(nestpages.selectors.syncCheckbox).length === 0) return;
		
		nestpages.jsData.syncmenu = ( $(nestpages.selectors.syncCheckbox).is(':checked') ) ? 'sync' : 'nosync';

		$.ajax({
			url: nestpages.jsData.ajaxurl,
			type: 'post',
			datatype: 'json',
			data: {
				action : nestpages.formActions.syncMenu,
				nonce : nestpages.jsData.nonce,
				post_type : nestpages.jsData.posttype,
				syncmenu : nestpages.jsData.syncmenu
			},
			success: function(data){
				if (data.status === 'error'){
					plugin.formatter.showAjaxError(data.message);
				}
			},
			error: function(data){
				console.log(data);
			}
		});
	}

	return plugin.bindEvents();
}