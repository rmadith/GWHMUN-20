<?php
namespace nestpages;

class FrontEndBootstrap
{
	public function __construct()
	{
		$this->init();
	}

	public function init()
	{
		// new RedirectsFrontEnd;
		new Entities\NavMenu\NavMenuFrontEnd;
	}
}