<?php 
namespace nestpages\Entities\AdminCustomization;

use nestpages\Entities\AdminCustomization\AdminMenuItems;

/**
* Initialize Admin Customizations
*/
class AdminCustomizationFactory 
{	
	public function __construct()
	{
		new AdminMenuItems;
	}
}