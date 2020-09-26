var nestpages = nestpages || {};

/**
* Enables and Saves Nesting
* @package Nest Pages
* @author Kyle Phillips - https://github.com/kylephillips/wp-nested-pages
*/
nestpages.Nesting = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.formatter = new nestpages.Formatter;

	// Make the Menu sortable
	plugin.initializeSortable = function()
	{
		if ( !nestpages.jsData.nestable ) return plugin.initializeSortableFlat();

		$(nestpages.selectors.sortable).not(nestpages.selectors.notSortable).nestedSortable({
			items : nestpages.selectors.rows,
			toleranceElement: '> .row',
			handle: nestpages.selectors.handle,
			placeholder: "ui-sortable-placeholder",
			tabSize : 56,
			isAllowed: function(placeholder, placeholderParent, currentItem){
				return ( $(placeholderParent).hasClass('post-type-np-redirect') && !$(currentItem).hasClass('post-type-np-redirect') ) ? false : true;
			},
			start: function(e, ui){
				ui.placeholder.height(ui.item.height());
			},
			sort: function(e, ui){
				plugin.formatter.updatePlaceholderWidth(ui);
			},
			stop: function(e, ui){
				setTimeout(
					function(){
						plugin.formatter.updateSubMenuToggle();
						plugin.formatter.setBorders();
						plugin.formatter.setNestedMargins();
					}, 100
				);
				plugin.syncNesting();
			},
		});
	}

	// Initialize Flat Sortable (Non-Hierarchical Post Types)
	plugin.initializeSortableFlat = function()
	{
		var lists = $(nestpages.selectors.lists).not(nestpages.selectors.notSortable);
		$.each(lists, function(){
			$(this).sortable({
				items : '>' + nestpages.selectors.rows,
				handle: nestpages.selectors.handle,
				placeholder: "ui-sortable-placeholder",
				forcePlaceholderSize: true,
				start: function(e, ui){
					ui.placeholder.height(ui.item.height());
				},
				sort: function(e, ui){
					plugin.formatter.updatePlaceholderWidth(ui);
				},
				stop: function(e, ui){
					setTimeout(
						function(){
							plugin.formatter.updateSubMenuToggle();
							plugin.formatter.setBorders();
							plugin.formatter.setNestedMargins();
						}, 100
					);
					plugin.syncNesting();
				},
			});
		});
	}

	// Disable Nesting
	plugin.disableNesting = function()
	{
		$(nestpages.selectors.sortable).sortable('destroy');
	}


	// Sync Nesting
	plugin.syncNesting = function(manual, callback)
	{
		var list;

		if ( nestpages.manual_order_sync === '1' && !manual) return;
		$(nestpages.selectors.errorDiv).hide();
		$(nestpages.selectors.loadingIndicator).show();
		if ( nestpages.jsData.nestable ){
			list = $(nestpages.selectors.sortable).nestedSortable('toHierarchy', {startDepthCount: 0});
		} else {
			list = plugin.setNestingArray();
		}
		
		plugin.disableNesting();

		var syncmenu = nestpages.jsData.syncmenu;
		if ( nestpages.manual_menu_sync === '1' ) syncmenu = 'nosync';

		$.ajax({
			url: ajaxurl,
			type: 'post',
			datatype: 'json',
			data: {
				action : nestpages.formActions.syncNesting,
				nonce : nestpages.jsData.nonce,
				list : list,
				post_type : nestpages.jsData.posttype,
				syncmenu : syncmenu
			},
			success: function(data, callback){
				plugin.initializeSortable();
				if (data.status === 'error'){
					$(nestpages.selectors.errorDiv).text(data.message).show();
					$(nestpages.selectors.loadingIndicator).hide();
				} else {
					if ( callback && typeof callback === 'function') {
						callback();
						return;
					}
					$(nestpages.selectors.loadingIndicator).hide();
				}
			}
		});
	}

	plugin.setNestingArray = function(list)
	{
		ret = [];
		$(nestpages.selectors.lists).first().children('li.page-row').each(function() {
			var level = plugin.recursiveNesting(this);
			ret.push(level);
		});
		return ret;
	}

	plugin.recursiveNesting = function(item) {
		var id = $(item).attr('id');
		var currentItem;
		if (id) {
			id = id.replace('menuItem_', '');
			currentItem = {
				"id": id
			};
			if ($(item).children(nestpages.selectors.lists).children(nestpages.selectors.rows).length > 0) {
				currentItem.children = [];
				$(item).children(nestpages.selectors.lists).children(nestpages.selectors.rows).each(function() {
					var level = plugin.recursiveNesting(this);
					currentItem.children.push(level);
				});
			}
			return currentItem;
		}
	}
}