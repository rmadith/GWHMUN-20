var nestpages = nestpages || {};

/**
* Reset User Preferences
* @package Nest Pages
* @author Kyle Phillips - https://github.com/kylephillips/wp-nested-pages
*/
nestpages.UserPreferencesReset = function()
{
	var plugin = this;
	var $ = jQuery;

	plugin.selectors = {
		resetButton : 'data-nestpages-reset-user-prefs',
		resetForm : '.nestpages-reset-user-prefs',
		formComplete : '.nestpages-reset-user-prefs-complete'
	}

	plugin.bindEvents = function()
	{
		$(document).on('click', '[' + plugin.selectors.resetButton + ']', function(e){
			e.preventDefault();
			plugin.resetPreferences();
		});
	}

	plugin.resetPreferences = function()
	{
		plugin.loading(true);
		$.ajax({
			url: nestpages.jsData.ajaxurl,
			type: 'post',
			datatype: 'json',
			data: {
				action : nestpages.formActions.resetUserPrefs,
				nonce : nestpages.jsData.nonce
			},
			success: function(data){
				plugin.loading(false);
				$(plugin.selectors.resetForm).hide();
				$(plugin.selectors.formComplete).show();
				if ( data.status !== 'success' ){
					console.log('There was an error clearing user preferences.');
				}
			}
		});
	}

	plugin.loading = function(loading)
	{
		if ( loading ){
			$('[' + plugin.selectors.resetButton + ']').attr('disabled', true);
			return;
		}
		$('[' + plugin.selectors.resetButton + ']').removeAttr('disabled');
	}

	return plugin.bindEvents();
}

new nestpages.UserPreferencesReset;