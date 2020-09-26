var nestpages = nestpages || {};

/**
* Bulk Actions for Nested View
* @package Nest Pages
* @author Kyle Phillips - https://github.com/kylephillips/wp-nested-pages
*/
nestpages.BulkActions = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.selectedNumber = 0;
	plugin.selectedLinks = [];
	plugin.selectedPosts = []; // array

	plugin.init = function()
	{
		plugin.bindEvents();
	}

	plugin.bindEvents = function()
	{
		$(document).on('change', nestpages.selectors.bulkActionsCheckbox, function(){
			plugin.toggleBulkForm();
		});
		$(document).on('submit', nestpages.selectors.bulkActionsForm, function(e){
			if ( $('select[name=np_bulk_action]').val() === 'edit' ){
				e.preventDefault();
				plugin.toggleBulkEdit(true);
			}
		});
		$(document).on('click', nestpages.selectors.bulkEditRemoveItem, function(e){
			e.preventDefault();
			var id = $(this).siblings('input[type=hidden]').val();
			plugin.uncheckBulkItem(id);
		});
		$(document).on('click', nestpages.selectors.bulkEditCancel, function(e){
			e.preventDefault();
			plugin.uncheckAllBulkItems();
		});
	}

	/**
	* Toggle the Bulk Actions Form & Populate the Hidden ID Fields for posts and redirects
	*/
	plugin.toggleBulkForm = function()
	{
		var checked = false;
		var checked_ids = '';
		var checked_redirect_ids = '';
		plugin.selectedPosts = [];
		plugin.selectedLinks = [];
		$.each($(nestpages.selectors.bulkActionsCheckbox), function(){
			if ( $(this).is(':checked') ) {
				var row = $(this).parents(nestpages.selectors.rows);
				checked = true;
				if ( !$(this).parent('div').hasClass('np-check-all') && !$(row).hasClass('post-type-np-redirect') ) checked_ids += $(this).val() + ',';
				if ( $(row).hasClass('post-type-np-redirect') ) {
					checked_redirect_ids += $(this).val() + ',';
					plugin.selectedLinks.push($(this).val());
				}
				if ( $(this).attr('data-np-post-type') !== 'np-redirect' && !$(this).parent('div').hasClass('np-check-all') ){
					var post = [];
					post['title'] = $(this).attr('data-np-bulk-checkbox');
					post['id'] = $(this).val();
					plugin.selectedPosts.push(post);
				}
			}
		});
		plugin.setBulkEditPosts();
		plugin.toggleEditOption();
		plugin.toggleLinkCountAlert();
		if ( checked ){
			$(nestpages.selectors.bulkActionsForm).show();
			$(nestpages.selectors.bulkActionsIds).val(checked_ids);
			$(nestpages.selectors.bulkActionRedirectIds).val(checked_redirect_ids);
			plugin.setSelectedNumber();
			return;
		}
		$(nestpages.selectors.bulkActionsIds).val('');
		$(nestpages.selectors.bulkActionsForm).hide();
	}

	/**
	* Set the Posts for Bulk Edit
	*/
	plugin.setBulkEditPosts = function()
	{
		var html = '';
		for ( var i = 0; i < plugin.selectedPosts.length; i++ ){
			html += '<li><a href="#" class="np-remove" data-np-remove-bulk-item>&times;</a>';
			html += plugin.selectedPosts[i].title;
			html += '<input type="hidden" name="post_ids[]" value="' + plugin.selectedPosts[i].id + '"></li>';
		}
		$(nestpages.selectors.bulkEditTitles).html(html);
	}

	/**
	* Uncheck a bulk item
	*/
	plugin.uncheckBulkItem = function(id)
	{
		$.each($(nestpages.selectors.bulkActionsCheckbox), function(){
			if ( $(this).val() == id ) {
				$(this).prop('checked', false).change();
			}
		});
		// Hide the form if all posts are removed
		if ( $(nestpages.selectors.bulkEditRemoveItem).length === 0 ){
			plugin.toggleBulkEdit(false);
		}
	}

	/**
	* Uncheck all bulk items
	*/
	plugin.uncheckAllBulkItems = function()
	{
		$.each($(nestpages.selectors.bulkActionsCheckbox), function(){
			$(this).prop('checked', false).change();
		});
		plugin.toggleBulkEdit(false);
	}

	/**
	* Set the number of total selected
	*/
	plugin.setSelectedNumber = function()
	{
		var checkedLength = $(nestpages.selectors.bulkActionsCheckbox + ':checked').not('.np-check-all input').length;
		var option = $(nestpages.selectors.bulkActionsForm).find('select option').first();
		$(option).text(nestpages.bulk_actions + ' (' + checkedLength + ')');
	}

	/**
	* Toggle the edit option to disabled if no post checkboxes are checked
	* Prevents opening the bulk edit form with only np-redirects checked
	*/
	plugin.toggleEditOption = function()
	{
		var checkedLength = $(nestpages.selectors.bulkActionsCheckbox + ':checked').not('.np-check-all input').not('.np-redirect-bulk').length;
		var option = $(nestpages.selectors.bulkActionsForm).find('select option[value=edit]');
		if ( checkedLength === 0 ){
			$(option).prop('disabled', true);
			$(nestpages.selectors.bulkActionsForm).find('select option').first().prop('selected', true);
			plugin.toggleBulkEdit(false);
			return;
		}
		$(option).prop('disabled', false);
	}

	/**
	* Toggle the bulk edit form
	*/
	plugin.toggleBulkEdit = function(visible)
	{
		plugin.toggleLinkCountAlert();
		if ( visible ){
			plugin.disableParentOptions();
			$(nestpages.selectors.bulkEditForm).show();
			$(nestpages.selectors.bulkActionsForm).hide();
			plugin.setWPSuggest();
			return;
		}
		$(nestpages.selectors.bulkEditForm).hide();
		$(nestpages.selectors.bulkActionsForm).show();
		$(nestpages.selectors.bulkEditLinkCount).parent('div').hide();
		$(nestpages.selectors.bulkActionsForm).find('select option').first().text(nestpages.bulk_actions);
		plugin.resetBulkEditFields();
	}

	/**
	* Toggle the bulk edit link count alert
	*/
	plugin.toggleLinkCountAlert = function()
	{
		var selectedLinkCount = plugin.selectedLinks.length;
		if ( selectedLinkCount === 0 ) {
			$(nestpages.selectors.bulkEditLinkCount).parent('div').hide();
			return;
		}
		$(nestpages.selectors.bulkEditLinkCount).parent('div').show();
	}

	/**
	* Set parent options to disabled for selected posts
	*/
	plugin.disableParentOptions = function()
	{
		var selectElement = $(nestpages.selectors.bulkEditForm).find('select[name=post_parent]');
		for ( var i = 0; i < plugin.selectedPosts.length; i++ )
		{
			$(selectElement).find('option[value=' + plugin.selectedPosts[i].id + ']').attr('disabled', true);
		}
	}

	/**
	* Initialize WP Auto Suggest on Flat Taxonomy fields
	*/
	plugin.setWPSuggest = function()
	{
		var tagfields = $(nestpages.selectors.bulkEditForm).find('[data-autotag]');
		$.each(tagfields, function(i, v){
			var taxonomy = $(this).attr('data-taxonomy');
			$(this).suggest(ajaxurl + '?action=ajax-tag-search&tax=' + taxonomy , {multiple:true, multipleSep: ","});
		});
	}

	/**
	* Clear out the bulk edit fields
	*/
	plugin.resetBulkEditFields = function()
	{
		var selectFields = $(nestpages.selectors.bulkEditForm).find('select');
		$.each(selectFields, function(){
			$(this).find('option').first().prop('selected', true);
			$(this).find('option').removeAttr('disabled');
		});
		var categoryChecklists = $(nestpages.selectors.bulkEditForm).find('.cat-checklist');
		$.each(categoryChecklists, function(){
			$(this).find('input[type=checkbox]').prop('checked', false);
		});
	}

	return plugin.init();
}