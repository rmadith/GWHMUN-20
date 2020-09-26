var nestpages = nestpages || {};

/**
* The Hidden Item Count for selected items in the Nested View
* @package Nest Pages
* @author Kyle Phillips - https://github.com/kylephillips/wp-nested-pages
*/
nestpages.HiddenItemCount = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.init = function()
	{
		plugin.bindEvents();
	}

	plugin.bindEvents = function()
	{
		$(document).on('change', nestpages.selectors.bulkActionsCheckbox, function(){
			plugin.toggleHiddenCount();
		});
		$(document).on('click', nestpages.selectors.toggleAll, function(){
			plugin.toggleHiddenCount();
		});
		$(document).on('click', nestpages.selectors.pageToggle, function(){
			plugin.toggleHiddenCount();
		});
	}

	/**
	* Toggle the Hidden Count
	*/
	plugin.toggleHiddenCount = function()
	{
		var hiddenCount = 0;
		$.each($(nestpages.selectors.bulkActionsCheckbox), function(){
			if ( $(this).is(':checked') ) {
				if ( $(this).parent('div').hasClass('np-check-all') ) return;
				var row = $(this).closest('.page-row');
				if ( !$(row).is(':visible') ) hiddenCount++;
			}
		});
		if ( hiddenCount < 1 ){
			$(nestpages.selectors.hiddenItemCountParent).hide();
			return;
		}
		$(nestpages.selectors.hiddenItemCount).text(hiddenCount);
		$(nestpages.selectors.hiddenItemCountParent).show();
	}

	return plugin.init();
}