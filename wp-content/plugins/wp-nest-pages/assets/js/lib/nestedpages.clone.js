var nestpages = nestpages || {};

/**
* Post clone functionality
* @package Nest Pages
* @author Kyle Phillips - https://github.com/kylephillips/wp-nested-pages
*/
nestpages.Clone = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.parent_id = ''; // The parent/source post ID
	plugin.parent_title = ''; // The parent title
	plugin.parentLi = null;

	plugin.formatter = new nestpages.Formatter;

	plugin.bindEvents = function()
	{
		$(document).on('click', nestpages.selectors.cloneButton, function(e){
			e.preventDefault();
			plugin.parent_id = $(this).attr('data-id');
			plugin.parent_title = $(this).attr('data-parentname');
			plugin.parentLi = $(this).parent('.row').parent('.page-row').parent('.npList');
			plugin.openModal();
		});
		$(document).on('click', nestpages.selectors.confirmClone, function(e){
			e.preventDefault();
			plugin.clone();
		});
	}

	// Open the modal with clone options
	plugin.openModal = function()
	{
		$('#' + nestpages.selectors.cloneModal).find('[data-clone-parent]').text(plugin.parent_title);
		$(document).trigger('open-modal-manual', nestpages.selectors.cloneModal);
	}

	// Clone the post
	plugin.clone = function()
	{
		plugin.toggleLoading(true);
		$.ajax({
			url : nestpages.jsData.ajaxurl,
			type : 'post',
			data : {
				action : nestpages.formActions.clonePost,
				parent_id : plugin.parent_id,
				quantity : $(nestpages.selectors.cloneQuantity).val(),
				status : $(nestpages.selectors.cloneStatus).val(),
				author : $(nestpages.selectors.cloneAuthor).find('select').val(),
				nonce : nestpages.jsData.nonce,
				posttype : nestpages.jsData.posttype
			},
			success : function(data){
				plugin.toggleLoading(false);
				$(document).trigger('close-modal-manual');
				location.reload();
			}
		});
	}

	// Toggle Loading
	plugin.toggleLoading = function(loading)
	{
		if ( loading ){
			$('#' + nestpages.selectors.cloneModal).find('[data-clone-loading]').show();
			$(nestpages.selectors.confirmClone).attr('disabled', 'disabled');
			return;
		}
		$('#' + nestpages.selectors.cloneModal).find('[data-clone-loading]').hide();
		$(nestpages.selectors.confirmClone).attr('disabled', false);
	}

	return plugin.bindEvents();
}