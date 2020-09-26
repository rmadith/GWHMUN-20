<?php 
namespace nestpages\Entities\PluginIntegration;

use nestpages\Entities\PluginIntegration\EditorialAccessManager;
use nestpages\Entities\PluginIntegration\AdvancedCustomFields;
use nestpages\Entities\PluginIntegration\YoastSeo;
use nestpages\Entities\PluginIntegration\WPML;
use nestpages\Entities\PluginIntegration\DarkMode;

class IntegrationFactory 
{
	/**
	* Integration Classes
	*/
	public $plugins;

	public function __construct()
	{
		$this->build();
		return $this->plugins;
	}

	public function build()
	{
		$this->plugins = new \StdClass();
		$this->plugins->editorial_access_manager = new EditorialAccessManager;
		$this->plugins->acf = new AdvancedCustomFields;
		$this->plugins->yoast = new YoastSeo;
		$this->plugins->wpml = new WPML;
		$this->plugins->dark_mode = new DarkMode;
	}
}