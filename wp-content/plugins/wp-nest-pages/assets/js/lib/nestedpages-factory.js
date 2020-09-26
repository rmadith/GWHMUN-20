/**
* Primary Nest Pages Initialization
* @package Nest Pages
* @author Kyle Phillips - https://github.com/kylephillips/wp-nested-pages
*/

jQuery(document).ready(function(){
	new nestpages.Factory;
});

var nestpages = nestpages || {};


// DOM Selectors
nestpages.selectors = {
	childToggle : '.child-toggle', // Child Toggle Buttons
	childToggleLink : '.child-toggle a', // Actual link in button
	toggleAll : '.nestpages-toggleall', // Toggle All Button
	toggleHidden : '.np-toggle-hidden', // Toggle Hidden Pages
	toggleStatus : '.np-toggle-publish', // Toggle Published Pages
	lists : '.nplist', // OL elements
	rows : '.page-row', // Page Row,
	row : '.row', // Inner row div element
	sortable : '.sortable', // Sortable List
	notSortable : '.no-sort', // Unsortable List
	handle : '.handle', // Sortable Handle
	published : '.published', // Published Rows
	hiddenRows : '.np-hide', // Hidden Rows
	errorDiv : '#np-error', // Error Alert
	loadingIndicator : '#nested-loading', // Loading Indicator,
	syncCheckbox : '.np-sync-menu', // Sync menu checkbox
	syncForm: '.np-sync-menu-cont', // The form/container for the sync menu element
	ajaxError : '[data-nestpages-error]', // AJAX error notification
	trashWithChildrenButton : '[data-nestpages-trash-children]',

	// Responsive Toggle
	toggleEditButtons : '.np-toggle-edit', // Button that toggles responsive buttons

	// Bulk Actions
	bulkActionsHeader : '.nestpages-list-header',
	bulkActionsForm : '[data-np-bulk-form]',
	bulkActionsCheckbox : '[data-np-bulk-checkbox]',
	bulkActionsIds : '[data-np-bulk-ids]',
	bulkActionRedirectIds : '[data-np-bulk-redirect-ids]',
	hiddenItemCount : '[data-np-hidden-count]',
	hiddenItemCountParent : '[data-np-hidden-count-parent]',
	bulkEditForm : '[data-np-bulk-edit-form]', // The primary bulk edit form
	bulkEditTitles : '[data-np-bulk-titles]', // Titles to perform bulk edits on (includes hidden ids),
	bulkEditRemoveItem : '[data-np-remove-bulk-item]', // Remove an item from bulk edit
	bulkEditCancel : '[data-np-cancel-bulk-edit]', // Cancel button in bulk edit form
	bulkEditLinkCount : '[data-bulk-edit-link-count]', // Count of selected links in bulk edit

	// Quick Edit
	quickEditOverlay : '.np-inline-overlay', // The inline modal
	quickEditLoadingIndicator : '.np-qe-loading', // Loading indicator in Quick Edit
	quickEditErrorDiv : '.np-quickedit-error', // Error Div in Quick Edit
	quickEditCancel : '.np-cancel-quickedit', // Cancel button in quick edit

	// Quick Edit - Links
	quickEditButtonLink : '.np-quick-edit-redirect', // Button to open link quick edit
	quickEditLinkForm : '.quick-edit-form-redirect', // Form for link quick edits
	quickEditLinkSaveButton : '.np-save-quickedit-redirect', // Save button in link quick edit form

	// Quick Edit - Posts
	quickEditOpen : '.np-quick-edit', // Button to open post quick edit
	quickEditPostForm : '.quick-edit-form', // Form container
	quickEditSaveButton : '.np-save-quickedit', // Save button in quick edit (posts)

	// Link Items
	openLinkModal : '.open-redirect-modal', // Opens new link modal
	linkModal : 'np-link-modal', // The add a link modal
	saveLink : '.np-save-link', // Save Link Button
	linkLoadingIndicator : '.np-link-loading', // Loading Indicator in Link Modal
	linkErrorDiv : '.np-new-link-error', // Error Div in Link Modal
	linkForm : '.np-new-link-form', // The form element for a new link

	// Link Deletion
	linkDeleteButton : '[data-np-confirm-delete]',
	linkDeleteConfirmationButton : '[data-delete-confirmation]',
	linkDeleteConfirmationModal : 'np-delete-confirmation-modal',
	linkDeleteConfirmationModalText : '[data-np-link-delete-text]',

	// New Page Items
	openPageModal : '.open-bulk-modal', // Opens the new page(s) modal
	newPageModal : '#np-bulk-modal', // The modal with the new page form
	newPageFormContainer : '.new-child-form', // The new page form container
	newPageForm : '.np-new-child-form', // The form element
	newPageSubmitButton : '.np-save-newchild', // Submit button in new page form
	newPageTitle : '.add-new-child-row', // Button to add a new page title field to the form
	newPageRemoveTitle : '.np-remove-child', // Button to remove a title field in the form
	addChildButton : '.add-new-child', // Button to add child page(s)
	newChildError : '.np-newchild-error', // Error div in new child quick edit
	cancelNewChildButton : '.np-cancel-newchild', // Cancel button in new child quick edit
	newBeforeButton : 'data-insert-before', // Add new post(s) before a post
	newAfterButton : 'data-insert-after', // Add new post(s) after a post

	// Clone
	cloneButton : '.clone-post', // Button to clone a post
	confirmClone : '[data-confirm-clone]', // Button in modal to confirm clone
	cloneModal : 'np-clone-modal', // Modal with clone options
	cloneQuantity : '[data-clone-quantity]', // Quantity to Clone
	cloneStatus : '[data-clone-status]', // Clone Status
	cloneAuthor : '[data-clone-author]', // Clone Author

	// Tabs
	tabButtonParent : '[data-np-tabs]', // Tab Parent
	tabButton : '[data-np-tab]', // Tab Link
	tabContent : '[data-np-tab-pane]', // Tab Pane

	// Thumbnails
	thumbnailContainer : '.np-thumbnail', // Container for Thumbnail
	thumbnailContainerLink : '.np-thumbnail.link', // Link Thumbnail Container

	// Manual Sync Buttons
	manualMenuSync : '[data-np-manual-menu-sync]', // Button for Triggering Manual Menu Sync
	manualOrderSync : '[data-np-manual-order-sync]', // Button for Triggering Manual Order Sync

}


// CSS Classes
nestpages.cssClasses = {
	noborder : 'no-border'
}


// JS Data
nestpages.jsData = {
	ajaxurl : ajaxurl,
	nonce : nestpages.np_nonce,
	allPostTypes : nestpages.post_types, // Localized data with all post types
	syncmenu : 'nosync', // Whether to sync the menu
	posttype : '', // current Screen's post type
	nestable : true, // boolean - whether post type is nestable
	sortable : true, // boolean - whether post type is sortable
	hierarchical : true, // boolean - whether post type is hierarchical
	expandText : nestpages.expand_text, // Expand all button text
	collapseText : nestpages.collapse_text, // Collapse all button text
	showHiddenText : nestpages.show_hidden, // Show Hidden Pages Link Text
	hideHiddenText : nestpages.hide_hidden, // Hide Hidden Pages Link Text
	quickEditText : nestpages.quick_edit, // Quick Edit Button Text
	hiddenText : nestpages.hidden, // Localized "Hidden"
	titleText : nestpages.title, // Localized "Title"
}


// Form Actions
nestpages.formActions = {
	syncToggles : 'npnestToggle',
	syncNesting : 'npsort',
	syncMenu : 'npsyncMenu',
	newPage : 'npnewChild',
	newBeforeAfter : 'npnewBeforeAfter',
	quickEditLink : 'npquickEditLink',
	getTaxonomies : 'npgetTaxonomies',
	quickEditPost : 'npquickEdit',
	clonePost : 'npclonePost',
	search : 'npmenuSearch',
	newMenuItem : 'npnewMenuItem',
	manualMenuSync : 'npmanualMenuSync',
	postSearch: 'nppostSearch',
	wpmlTranslations : 'npWpmlTranslations',
	resetSettings : 'npresetSettings',
	resetUserPrefs : 'npresetUserPreferences',
	resetAdminMenuSettings : 'npresetAdminMenuSettings',
	trashWithChildren : 'nptrashWithChildren'
}


/**
* Primary Nest Pages Class
*/
nestpages.Factory = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.formatter = new nestpages.Formatter;
	plugin.dropdowns = new nestpages.Dropdowns;
	plugin.modals = new nestpages.Modals;
	plugin.checkAll = new nestpages.CheckAll;
	plugin.bulkActions = new nestpages.BulkActions;
	plugin.menuToggle = new nestpages.MenuToggle;
	plugin.pageToggle = new nestpages.PageToggle;
	plugin.nesting = new nestpages.Nesting;
	plugin.syncMenuSetting = new nestpages.SyncMenuSetting;
	plugin.newPage = new nestpages.NewPost;
	plugin.quickEditLink = new nestpages.QuickEditLink;
	plugin.quickEditPost = new nestpages.QuickEditPost;
	plugin.clone = new nestpages.Clone;
	plugin.tabs = new nestpages.Tabs;
	plugin.menuLinks = new nestpages.MenuLinks;
	plugin.hiddenItemCount = new nestpages.HiddenItemCount;
	plugin.confirmDelete = new nestpages.ConfirmDelete;
	plugin.manualSync = new nestpages.ManualSync;
	plugin.postSearch = new nestpages.PostSearch;
	plugin.postMove = new nestpages.MovePost;
	plugin.wpml = new nestpages.Wpml;
	plugin.trashWithChildren = new nestpages.TrashWithChildren;

	plugin.init = function()
	{
		if ( nestpages.settings_page ) return;
		plugin.bindEvents();
		plugin.setPostType();
		plugin.setMenuSync();
		plugin.setNestable();
		plugin.setSortable();
		plugin.formatter.updateSubMenuToggle();
		plugin.formatter.setBorders();
		plugin.formatter.setNestedMargins();
		plugin.nesting.initializeSortable();
	}


	plugin.bindEvents = function()
	{
		$(document).on('click', nestpages.selectors.quickEditOverlay, function(e){
			plugin.formatter.removeQuickEdit();
			plugin.newPage.cancelNewPage();
		});
		$(document).ready(function(){
			plugin.formatter.hideAjaxError();
			plugin.formatter.sizeLinkThumbnails();
		});
	}


	// Set whether or not post type is nestable
	plugin.setNestable = function()
	{
		var nestable = false;
		$.each(nestpages.jsData.allPostTypes, function(i, v){
			if ( v.name !== nestpages.jsData.posttype ) return;
			if ( v.hierarchical === true ) nestable = true;
			if ( v.disable_nesting === true ) nestable = false;
		});
		nestpages.jsData.nestable = nestable;
	}


	// Set whether or not post type is sortable
	plugin.setSortable = function()
	{
		var sortable = true;
		$.each(nestpages.jsData.allPostTypes, function(i, v){
			if ( v.name !== nestpages.jsData.posttype ) return;
			if ( typeof v.disable_sorting === 'undefined' || v.disable_sorting === '' ) return;
			if ( v.disable_sorting === "true" ) sortable = false;
		});
		nestpages.jsData.sortable = sortable;
	}


	// Set the Screen's Post Type
	plugin.setPostType = function()
	{
		nestpages.jsData.posttype = nestpages.current_post_type;
		if ( typeof nestpages.jsData.posttype === 'undefined' || nestpages.jsData.posttype === '' ){
			nestpages.jsData.posttype = $(nestpages.selectors.sortable).attr('id').substring(3);
		}
		nestpages.jsData.hierarchical = nestpages.jsData.allPostTypes[nestpages.jsData.posttype].hierarchical;
	}


	// Set menu sync
	plugin.setMenuSync = function()
	{
		nestpages.jsData.syncmenu = ( nestpages.syncmenu === '1' ) ? 'sync' : 'nosync';
	}


	return plugin.init();
}