<?php 
namespace nestpages\Entities\NavMenu;

use nestpages\Entities\NavMenu\NavMenuRepository;
use nestpages\Entities\PluginIntegration\IntegrationFactory;
use nestpages\Config\SettingsRepository;

/**
* Base Nav Menu Sync class
*/
abstract class NavMenuSync 
{
	/**
	* Nav Menu Repository
	* @var object NavMenuRepository
	*/
	protected $nav_menu_repo;

	/**
	* The Menu ID
	* @var int
	*/
	protected $id;

	/**
	* Settings Repository
	* @var object
	*/
	protected $settings;

	/**
	* Plugin Integrations
	* @var object
	*/
	protected $integrations;

	public function __construct()
	{
		$this->nav_menu_repo = new NavMenuRepository;
		$this->integrations = new IntegrationFactory;
		$this->settings = new SettingsRepository;
		$this->setMenuID();
	}

	/**
	* Menu ID Setter
	*/
	protected function setMenuID()
	{
		$this->id = $this->nav_menu_repo->getMenuID();
	}

	/**
	* Remove a Menu Item
	* @since 1.3.4
	* @param int $id - ID of nav menu item
	*/
	protected function removeItem($id)
	{
		wp_delete_post($id, true);
	}
}