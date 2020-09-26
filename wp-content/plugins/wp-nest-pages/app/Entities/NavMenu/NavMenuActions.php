<?php 
namespace nestpages\Entities\NavMenu;

use nestpages\Entities\NavMenu\NavMenuSyncMenu;
use nestpages\Entities\NavMenu\NavMenuRepository;

/**
* Hook into WP actions for necessary tasks related to nav menus
*/
class NavMenuActions 
{
	/**
	* Nav Menu Repository
	*/
	private $nav_menu_repo;

	public function __construct()
	{
		if ( get_option('nestpages_menusync') !== 'sync' ) return;
		if ( get_option('nestpages_disable_menu') == 'true' ) return;
		$this->nav_menu_repo = new NavMenuRepository;
		$this->addUpdateHook();
	}

	private function addUpdateHook()
	{
		add_action( 'wp_update_nav_menu', [$this, 'syncMenu'], 10, 2 );
	}

	private function removeUpdateHook()
	{
		remove_action( 'wp_update_nav_menu', [$this, 'syncMenu'], 10);
	}

	/**
	* Sync Pages when updating nav menu
	*/
	public function syncMenu($menu_id, $menu_data = null)
	{
		if ( $menu_id !== $this->nav_menu_repo->getMenuID() ) return; // Don't try to sync menus not managed by NP
		$this->removeUpdateHook();
		if ( $menu_data == null ) $sync = new NavMenuSyncMenu($menu_id);
		$this->addUpdateHook();
	}
}