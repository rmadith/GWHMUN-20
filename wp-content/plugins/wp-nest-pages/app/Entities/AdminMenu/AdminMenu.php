<?php
namespace nestpages\Entities\AdminMenu;

use nestpages\Entities\AdminMenu\EnabledMenus;
use nestpages\Entities\AdminMenu\AdminSubmenuExpander;
use nestpages\Entities\AdminMenu\BlockEditorLink;

/**
* Admin Menus
* @since 1.2.1
*/
class AdminMenu 
{
	public function __construct()
	{
		add_action('admin_menu', [$this, 'setMenus']);
		add_action('admin_head', [$this, 'expandSubMenus']);
	}

	/**
	* Other Post Types
	*/
	public function setMenus()
	{
		new EnabledMenus;
	}

	/**
	* Expand Submenus
	*/
	public function expandSubMenus()
	{
		new AdminSubmenuExpander;
		new BlockEditorLink;
	}
}