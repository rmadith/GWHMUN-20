<?php
namespace nestpages\Entities\User;

use nestpages\Config\SettingsRepository;

/**
* Register custom user roles
*/
class UserCapabilities
{
	/**
	* Settings Repository
	*/
	private $settings;

	public function __construct()
	{	
		$this->settings = new SettingsRepository;
		add_action('init', [$this, 'addSortingCapabilities']);
	}

	/**
	* Adds custom capability of nestpages_sort_$type 
	*/
	public function addSortingCapabilities()
	{
		$post_types = get_post_types(['public' => true]);
		$invalid = ['attachment'];
		$granted_roles = ['administrator'];
		$roles = wp_roles();
		foreach ( $post_types as $type ) :
			if ( in_array($type, $invalid) ) continue;
			foreach ( $roles->roles as $name => $role_obj ) :
				$role = get_role($name);
				$grant_capability = ( in_array($name, $granted_roles) ) ? true : false;
				if ( $role->has_cap("nestpages_sorting_$type") ) $grant_capability = true;

				/**
				 * Filters the sorting capability for a given role and post type.
				 *
				 * @since 3.1.9
				 *
				 * @param bool  $grant_role     Whether role may sort post type.
				 * @param string $type 			The post type name.
				 * @param string  $role_name	The Role Name.
				 */
				$grant_capability = apply_filters("nestpages_sorting_capability", $grant_capability, $type, $role);
				if ( $grant_capability ) $role->add_cap("nestpages_sorting_$type", true);
			endforeach;
		endforeach;
	}
}