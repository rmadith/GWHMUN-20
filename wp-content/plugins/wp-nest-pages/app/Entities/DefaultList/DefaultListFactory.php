<?php
namespace nestpages\Entities\DefaultList;

use nestpages\Entities\PostType\PostTypeRepository;
use nestpages\Entities\DefaultList\NestedViewLink;

/**
* Add the Nest Pages link to default table subsubsub
*/
class DefaultListFactory 
{
	/**
	* Post Type Repository
	*/
	private $post_type_repo;

	/**
	* Post Type
	*/
	private $post_type;

	public function __construct()
	{
		$this->post_type_repo = new PostTypeRepository;
		$this->addNestedViewLinks();
	}

	/**
	* Loop through Post Types & add link to activated types
	*/
	private function addNestedViewLinks()
	{
		foreach($this->post_type_repo->getPostTypesObject() as $type){
			if ( !$type->np_enabled ) continue;
			new NestedViewLink($type);
		}
	}
}