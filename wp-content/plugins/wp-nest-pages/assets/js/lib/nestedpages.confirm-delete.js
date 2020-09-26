var nestpages = nestpages || {};

/**
* Confirm deletion of links
* @package Nest Pages
* @author Kyle Phillips - https://github.com/kylephillips/wp-nested-pages
*/
nestpages.ConfirmDelete = function()
{
	var plugin = this;
	var $ = jQuery;

	// JS Data
	plugin.deleteLink = ''; // Link for deleting the item

	plugin.bindEvents = function()
	{
		$(document).on('click', nestpages.selectors.linkDeleteButton, function(e){
			e.preventDefault();
			plugin.confirmSingle($(this));
		});
		$(document).on('click', nestpages.selectors.linkDeleteConfirmationButton, function(e){
			e.preventDefault();
			if ( !$(this).hasClass('bulk') ){
				plugin.deleteSingle();
				return;
			}
			plugin.deleteMultiple();
		});
		$(document).on('submit', nestpages.selectors.bulkActionsForm, function(e){
			plugin.confirmMultiple(e);
		});
	}

	// Confirm a single link deletion
	plugin.confirmSingle = function(button)
	{
		plugin.deleteLink = $(button).attr('href');
		$(nestpages.selectors.linkDeleteConfirmationModalText).text(nestpages.link_delete_confirmation_singular);
		$(nestpages.selectors.linkDeleteConfirmationButton).text(nestpages.delete).removeClass('bulk');
		$(document).trigger('open-modal-manual', nestpages.selectors.linkDeleteConfirmationModal);
	}

	// Confirm Multiple link deletion
	plugin.confirmMultiple = function(event)
	{
		if ( $('select[name="np_bulk_action"]').val() !== 'trash' ) return;
		var linkCount = $(nestpages.selectors.bulkActionRedirectIds).val();
		if ( linkCount === '' ) return;
		event.preventDefault();
		$(nestpages.selectors.linkDeleteConfirmationModalText).text(nestpages.link_delete_confirmation);
		$(nestpages.selectors.linkDeleteConfirmationButton).text(nestpages.trash_delete_links).addClass('bulk');
		$(document).trigger('open-modal-manual', [nestpages.selectors.linkDeleteConfirmationModal]);
	}

	// Submit the form to delete multiple
	plugin.deleteMultiple = function()
	{
		$(nestpages.selectors.bulkActionsForm)[0].submit();
	}

	// Delete the single
	plugin.deleteSingle = function()
	{
		window.location.replace(plugin.deleteLink);
	}

	return plugin.bindEvents();
}
