<?php
namespace nestpages\Config;

use nestpages\Helpers;
use nestpages\Entities\User\UserRepository;
use nestpages\Entities\PostType\PostTypeRepository;
use nestpages\Config\SettingsRepository;
use nestpages\Entities\PluginIntegration\IntegrationFactory;
use nestpages\Entities\Listing\ListingRepository;
use nestpages\Entities\Post\PostRepository;

/**
* Plugin Settings
*/
class Settings 
{
	/**
	* Nest Pages Menu
	* @var object
	*/
	private $menu;

	/**
	* User Repository
	*/
	private $user_repo;

	/**
	* Post Type Repository
	*/
	private $post_type_repo;

	/**
	* Post Types
	*/
	private $post_types;

	/**
	* Settings Repository
	*/
	private $settings;

	/**
	* Plugin Integration
	*/
	private $integrations;

	/**
	* Listing Repository
	*/
	private $listing_repo;

	/**
	* Post Repository
	*/
	private $post_repo;

	/**
	* Admin Menu Settings
	*/
	private $admin_menu_settings;

	public function __construct()
	{
		add_action( 'admin_menu', [$this, 'registerSettingsPage' ]);
		add_action( 'admin_init', [$this, 'registerSettings']);
		add_action( 'updated_option', [$this, 'updateMenuName'], 10, 3);
		$this->user_repo = new UserRepository;
		$this->settings = new SettingsRepository;
		$this->post_type_repo = new PostTypeRepository;
		$this->integrations = new IntegrationFactory;
		$this->listing_repo = new ListingRepository;
		$this->post_repo = new PostRepository;
	}

	/**
	* Register the settings page
	* @see admin_menu
	*/
	public function registerSettingsPage()
	{
		add_options_page( 
			__('Nest Pages Settings', 'wp-nested-pages'),
			__('Nest Pages', 'wp-nested-pages'),
			'manage_options',
			'nested-pages-settings', 
			[$this, 'settingsPage']
		);
	}

	/**
	* Register the settings
	* @see admin_init
	*/
	public function registerSettings()
	{
		register_setting( 'nestpages-general', 'nestpages_menu' );
		register_setting( 'nestpages-general', 'nestpages_menusync' );
		register_setting( 'nestpages-general', 'nestpages_disable_menu' );
		register_setting( 'nestpages-general', 'nestpages_ui' );
		register_setting( 'nestpages-general', 'nestpages_allowsorting' );
		register_setting( 'nestpages-general', 'nestpages_allowsortview' );
		register_setting( 'nestpages-posttypes', 'nestpages_posttypes' );
		register_setting( 'nestpages-admincustomization', 'nestpages_admin' );
	}

	/**
	* Update the menu name if option is updated
	* @see updated_option in wp-includes/option.php
	* @since 1.1.5
	*/
	public function updateMenuName($option, $old_value, $value)
	{
		if ( $option == 'nestpages_menu' ){

			$menu = get_term_by('id', $old_value, 'nav_menu');
			if ( $menu ) {
				delete_option('nestpages_menu'); // Delete the option to prevent infinite loop
				update_option('nestpages_menu', $old_value);
				wp_update_term($menu->term_id, 'nav_menu', [
					'name' => $value,
					'slug' => sanitize_title($value)
				]);
			}
		}
	}

	/**
	* Set the Menu Object
	* @since 1.1.5
	*/
	private function setMenu()
	{
		$menu_id = get_option('nestpages_menu');
		$this->menu = get_term_by('id', $menu_id, 'nav_menu');
	}

	/**
	* Get Post Types
	* @since 1.2.0
	*/
	private function getPostTypes()
	{
		return $this->post_type_repo->getPostTypesObject();
	}

	/**
	* Display the Settings Page
	* Callback for registerSettingsPage method
	*/
	public function settingsPage()
	{
		$this->setMenu();
		$tab = ( isset($_GET['tab']) ) ? sanitize_text_field($_GET['tab']) : 'general';
		include( Helpers::view('settings/settings') );
	}
}